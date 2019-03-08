// Initialize Amap
let map = new AMap.Map('container', {
    resizeEnable: true,
    mapStyle: 'amap://styles/normal',
    zoom: 15,
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
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: false,     
        // 不显示定位按钮
        showButton: false
    });
    let position = [];
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', (data) => {
        document.getElementById('current-pos').innerHTML = '当前位置：'+'['+data.position.lng+', '+data.position.lat+']';
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
    button = document.getElementById('status-button');
    open('status.html', '_self');
}
let openItem = () => {
    button = document.getElementById('item-button');
    open('item.html', '_self');
}
let openCam = () => {
    button = document.getElementById('camera-button');
    open('camera.html', '_self');
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
            url: 'https://webapi.amap.com/theme/v1.3/markers/n/loc.png',
            size: [24, 24],
            ancher: [12, 12]
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
            let marker = new AMap.Marker({
                position: locationArray[i],
                title: poiArray[i].name
            });
            map.add(marker);
            oldMarkerArray.push(marker);
        }
        // POI touching listening
        for (let i = 0; i < 5; i++) {
            oldMarkerArray[i].on('click', (marker) => {
                // Calculate distance
                let targetPos = [marker.lnglat.lng, marker.lnglat.lat];
                let selfPos = document.getElementById('current-pos').innerHTML;
                selfPos = selfPos.split('：');
                selfPos = selfPos[1].replace('[', '');
                selfPos = selfPos.replace(']', '');
                selfPos = selfPos.split(', ');
                selfPos = [Number(selfPos[0]), Number(selfPos[1])];
                document.getElementById('dist-p').innerHTML = AMap.GeometryUtil.distance(targetPos, selfPos).toFixed(2) + 'm';
                // Print POI name
                document.getElementById('target-name').innerHTML = marker.target.D.title;
            });
        }
    });
    positionPicker.start();
});


/**
* 本地数据存储
*/




/**
* 相机+方向传感器定位AR显示
*/


