/**
 * 道具管理类
 * 使用export暴露给main.js
*/
// Define ItemManager class
class ItemManager {
    constructor() {
        // Create a bag array
        let bagArray = [];
        bagArray = JSON.stringify(bagArray);
        localStorage.setItem('bag', bagArray);
    }


    addItem(id, name, number, type, info) {
        let bagArray = JSON.parse(localStorage.getItem('bag'));
        let enableNew = true;

        // Add old item
        for (let i = 0; i < bagArray.length; i++) {
            if (bagArray[i].name === name) {
                bagArray[i].number += number;
                let temp = JSON.stringify(bagArray);
                localStorage.setItem('bag', temp);
                alert('你获得了'+number+'个'+name+'！');

                enableNew = false;
                break;
            }
        }
        if (enableNew) {
            // Add new item
            let item = {
                id: id, //Number
                name: name, //String
                number: number, //Number
                type: type, //String
                info: info //String
            }
            bagArray.push(item);
            let temp = JSON.stringify(bagArray);
            localStorage.setItem('bag', temp);
            alert('你获得了'+number+'个'+name+'！');
        }
    }

    useItem(name) {
        let bagArray = JSON.parse(localStorage.getItem('bag'));
        for (let i = 0; i < bagArray.length; i++) {
            if (bagArray[i].name === name) {
                if (bagArray[i].number-1 === 0) {
                    bagArray.splice(i, 1);
                }
                else {
                    --bagArray[i].number;
                }
                let temp = JSON.stringify(bagArray);
                localStorage.setItem('bag', temp);
                this.applyItemEffect(name);
                break;
            }
        }
    }

    // Item effects
    applyItemEffect(name) {
        alert('Use'+name); //Test
        // switch(id) {
        //     case 0:
        //     alert('使用了'+itemLib[id].name);
        //     break;

            
        //     // To be continued...
        //     case 1:
            
        //     break;
        // }
    }
}
let IManager = new ItemManager();




/**
 * 道具库
*/
const itemLib = [
    {
        id: 0,
        name: '小刀',
        type: 'weapon',
        info: '一把普通的折叠刀。'
    },
    {
        id: 1,
        name: '水管',
        type: 'weapon',
        info: '建筑器材，不俗的钝器。'
    },
    {
        id: 2,
        name: '棒球棒',
        type: 'weapon',
        info: '运动场上的杀手。'
    },
    {
        id: 3,
        name: '消防斧',
        type: 'weapon',
        info: '笨重、强大的锋利武器。'
    },
    {
        id: 4,
        name: '止痛药',
        type: 'medicine',
        info: '暂时缓解疼痛，回复少许生命，效果有限。'
    },
    {
        id: 5,
        name: '绷带',
        type: 'medicine',
        info: '起到止血的效果，回复少许生命。'
    }
];




/**
 * 函数定义
 * 
 * 格式建议：
 * 语句内的回调函数使用arrow function
 * 其他使用传统function
 */

// 按钮事件
function openStatus() {
    // 
}
function openItem() {
    button = document.getElementById('item-button');
}
function openCam() {
    button = document.getElementById('camera-button');
}

// 探索随机游戏事件
function randGameEvent(place) {
    let hour = (new Date()).getHours();
    let eventToken = Math.random();
    let eventType = '';
    
    // Event time
    if (hour >= 7 && hour < 19) {
        eventType = eventToken > 5 ? 'battle' : 'forage';
    }
    else {
        eventType = eventToken > 0.5 ? 'battle' : 'forage';
    }
    
    
    
    switch (eventType) {
        case 'battle':
        // Battle event




        
        break;
        case 'forage':
        // Forage event\
        alert('foraging...')



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
                let name = marker.target.D.title;
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
                document.getElementById('target-name').innerHTML = '已选择位置：' + marker.target.D.title;
                
                // Visit interaction 探索地点逻辑
                let dist = AMap.GeometryUtil.distance(targetPos, [selfPos.lng, selfPos.lat]).toFixed(2);
                if (dist < 150) {
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












/**
* 相机+方向传感器定位AR显示
*/

