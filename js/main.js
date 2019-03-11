// Initialize Amap
let map = new AMap.Map('container', {
    resizeEnable: true,
    mapStyle: 'amap://styles/normal',
    zoom: 16,
    viewMode: '3D'
});
// Set map display features
map.setFeatures(['road', 'point', 'bg']);
map.setStatus({dragEnable: false, zoomEnable: false}); //Disenable dragging, zooming

// Apply geolocation via browser
map.plugin('AMap.Geolocation', () => {
    let geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: false,     
        // 不显示定位按钮
        showButton: false,
        maximumAge: 0
    });
    let position = [];
    map.addControl(geolocation);
    if (window.navigator.userAgent === 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36')
        geolocation.getCurrentPosition();//For PC users
    else geolocation.watchPosition();    //For mobile users
    AMap.event.addListener(geolocation, 'complete', (data) => {
        document.getElementById('current-pos').innerHTML = '当前位置：'+'['+data.position.lng+', '+data.position.lat+']';
        let currentPositionJSON = JSON.stringify({
            lng: data.position.lng,
            lat: data.position.lat
        });
        // Save position, session
        sessionStorage.setItem('currentPositionJSON', currentPositionJSON);
    });
});

// Time display
setInterval(() => {
    let date = new Date();
    sec = date.getSeconds().toString();
    min = date.getMinutes().toString();
    hour = date.getHours().toString();
    document.getElementById('time-p').innerHTML = hour + ':' + min + ':' + sec;
}, 1000);

// Button click events
let openStatus = () => {
    // 
}
let openItem = () => {
    button = document.getElementById('item-button');
}
let openCam = () => {
    button = document.getElementById('camera-button');
}

/**
* 地图交互
* 用于用户点击地图上可交互对象时进行交互
*/
AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
    let positionPicker = new PositionPicker({
        mode:'dragMap',//设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
        map: map,//依赖地图对象
        iconStyle: {
            url: 'https://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=4d397db9af51f3dec3e7b162a4dedc27/500fd9f9d72a6059f50254692834349b033bbab7.jpg',
            size: [2, 2],
            ancher: [1, 1]
        }
    });
    //TODO:事件绑定、结果处理等
    let oldMarkerArray = [];
    positionPicker.on('success', (positionResult) => {
        let poiArray = positionResult.regeocode.pois;
        let locationArray = [];
        for (let i = 0; i < 5; i++) {
            locationArray.push([poiArray[i].location.lng, poiArray[i].location.lat]);
        }
        // Create markers for POIs
        map.remove(oldMarkerArray);
        oldMarkerArray = [];
        for (let i = 0; i < 5; i++) {
            // Create a marker
            let marker = new AMap.Marker({
                position: locationArray[i],
                title: poiArray[i].name,
            });
            map.add(marker);
            oldMarkerArray.push(marker);
        }
        
        for (let i = 0; i < oldMarkerArray.length; i++) {
            // POI touch events
            oldMarkerArray[i].on('touchstart', (marker) => {
                // Timer reset
                if (sessionStorage.getItem('distTimerId')) {
                    let id = Number(sessionStorage.getItem('distTimerId'));
                    clearInterval(id);
                }
                // Calculate distance
                let targetPos = locationArray[i];
                let selfPos = JSON.parse(sessionStorage.getItem('currentPositionJSON'));
                // Refresh distance
                let distTimerId = setInterval(() => {
                    let dist = AMap.GeometryUtil.distance(targetPos, [selfPos.lng, selfPos.lat]).toFixed(2);
                    document.getElementById('dist-p').innerHTML = dist + 'm';
                }, 500);
                sessionStorage.setItem('distTimerId', distTimerId.toString());
                // Print POI info
                document.getElementById('target-name').innerHTML = '已选择位置：' + marker.target.D.title;
                document.getElementById('visit-status').innerHTML = '上次访问：' + '上次访问时间';
                
                // Visit interaction 访问地点逻辑
                let dist = AMap.GeometryUtil.distance(targetPos, [selfPos.lng, selfPos.lat]).toFixed(2);
                if (dist < 150) {
                    document.getElementById('access-p').innerHTML = '可访问';
                }
                else {
                    document.getElementById('access-p').innerHTML = '太远啦';
                }
            });
        }



        for (let i = 0; i < oldMarkerArray.length; i++) {
            // 地点访问逻辑
            oldMarkerArray[i].on('touchstart', (marker) => {
                let name = marker.target.D.title;
                sessionStorage.setItem('selectMarker', name);
            });
        }

    });
    positionPicker.start();
});


// 绑定访问按钮
document.getElementById('visit-button').addEventListener('touchstart', () => {
    let selectMarker = sessionStorage.getItem('selectMarker');
    // Is visited?
    if (localStorage.getItem(selectMarker) === null) {
        console.log('new visit');
        let newVisit = {lastVisit: new Date()};
        newVisit = JSON.stringify(newVisit);
        localStorage.setItem(selectMarker, newVisit);
    }
    else {
        let lastVisit = JSON.parse(localStorage.getItem(selectMarker)).lastVisit;
        let newDate = new Date();
        console.log('last visit: '+lastVisit);
        if (newDate - lastVisit > 24*60*60*1000) {
            console.log('visit again');
            let newVisit = {lastVisit: newDate};
            newVisit = JSON.stringify(newVisit);
            localStorage.setItem(selectMarker, newVisit);
        }
        else {
            console.log('have visited');
        }
    }
});






/**
* 数据存储（使用新API localStorage）
*/





/**
* 相机+方向传感器定位AR显示
*/

