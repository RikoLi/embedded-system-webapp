let HM = new HPManager(50, 100, true);
let IManager = new ItemManager();

HM.recoverHP(1, 360*1000);

/**
 * 函数定义
 * 
 * 格式建议：
 * 语句内的回调函数使用arrow function
 * 其他使用传统function
 */

// 按钮事件
function openCam() {
    window.open('cam.html', '__self');
}

function openItem() {
    window.open('item.html', '__self');
}

// 探索随机游戏事件
function randGameEvent(place) {
    let eventType = '';

    // 武器越多，战斗概率越小
    let weapon_amount = IManager.checkWeapon();
    let seed = Math.pow(2, 1/(weapon_amount+Math.random()))
    
    // Event type
    eventType = seed < 0.5 ? 'battle' : 'forage';   
    
    switch (eventType) {
        case 'battle':
        // Battle event
        alert('你在'+place+'被别人袭击了！');
        let damage = (Math.random() * 24 + 1).toFixed(0);
        HM.reduceHP(damage);        
        break;

        case 'forage':
        // Forage event
        let eventSeed = Math.random();
        if (eventSeed < 0.9) {
            // Random event: get items
            alert('你在'+place+'发现了一些物品...');
            let getAmount = (Math.random()*2+1).toFixed(0);

            for (let i = 0; i < getAmount; i ++) {
                let itemSeed = (Math.random() * (itemLib.length-1)).toFixed(0);
                IManager.addItem(itemSeed, itemLib[itemSeed].name, 1, itemLib[itemSeed].type, itemLib[itemSeed].info);
            }
        }
        else {
            // Random event: drop items
            alert('糟糕！你的背包被划破了，随机丢掉一组物品！');
            IManager.dropItem();
        }
        break;
    }
}




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
        
        
        
        // Info display
        for (let i = 0; i < oldMarkerArray.length; i++) {
            // Select current marker
            oldMarkerArray[i].on('touchstart', (marker) => {
                let name = marker.target.B.title;
                sessionStorage.setItem('selectMarker', name);
            });
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
                document.getElementById('target-name').innerHTML = '已选择位置：' + marker.target.B.title;
                
                // Visit interaction 探索地点逻辑
                let dist = AMap.GeometryUtil.distance(targetPos, [selfPos.lng, selfPos.lat]).toFixed(2);
                if (dist < 300) {
                    sessionStorage.setItem('enableVisit', 'true');
                    document.getElementById('access-p').innerHTML = '可到达';
                }
                else {
                    sessionStorage.setItem('enableVisit', 'false');
                    document.getElementById('access-p').innerHTML = '太远';
                }
            });
        }
        
        
        
    });
    positionPicker.start();
});

// Time display
setInterval(() => {
    let date = new Date();
    sec = date.getSeconds().toString();
    min = date.getMinutes().toString();
    hour = date.getHours().toString();
    document.getElementById('time-p').innerHTML = hour + ':' + min + ':' + sec;
}, 1000);





// 绑定探索按钮
document.getElementById('visit-button').addEventListener('touchstart', () => {
    let selectMarker = sessionStorage.getItem('selectMarker');
    // Accessibility
    if (sessionStorage.getItem('enableVisit') === 'true') {
        // Never visited
        if (localStorage.getItem(selectMarker) === null) {
            let date = new Date();
            let newVisit = {
                lastVisit: date.getTime(),
                lastVisitDisp: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds(),
                visitTimes: 1
            };
            // Visit
            alert('探索成功！这是您第一次到达此地点['+selectMarker+']。');
            // Update visit info
            newVisit = JSON.stringify(newVisit);
            localStorage.setItem(selectMarker, newVisit);

            // 随机游戏事件...
            randGameEvent(selectMarker);
            
            
        }
        // Have visited
        else {
            let lastVisit = JSON.parse(localStorage.getItem(selectMarker)).lastVisit;
            let lastVisitTime = JSON.parse(localStorage.getItem(selectMarker)).lastVisitDisp;
            let oldVisitTimes = JSON.parse(localStorage.getItem(selectMarker)).visitTimes;
            let date = new Date();
            if (date - lastVisit >= 3*60*60*1000) { // Set visit refresh time
                let newVisit = {
                    lastVisit: date.getTime(),
                    lastVisitDisp: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds(),
                    visitTimes: ++oldVisitTimes
                };
                // Visit
                alert('['+selectMarker+']探索成功！\n上次探索时间：'+lastVisitTime+'\n您一共已经探索了'+oldVisitTimes+'次。');
                // Update visit info
                newVisit = JSON.stringify(newVisit);
                localStorage.setItem(selectMarker, newVisit);
                
                
                // 随机游戏事件...
                randGameEvent(selectMarker);
                
                
                
            }
            else {
                let remainTime = (3 - (date - lastVisit)/1000/60/60).toFixed(2);
                alert('您不久前已经探索了该据点['+selectMarker+']！\n上次探索时间：'+lastVisitTime+'\n您一共已经探索了'+oldVisitTimes+'次。\n距该点恢复下次探索还有'+remainTime+'小时。');
            }
        }
    }
    else {
        alert('目标太远，无法探索！');
    }
});


