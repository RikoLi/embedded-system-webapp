// Initialize Amap
let map = new AMap.Map('container', {
    resizeEnable: true,
    mapStyle: 'amap://styles/fresh',
    zoom: 17,
    viewMode: '3D'
});

// Apply geolocation via explorer
map.plugin('AMap.Geolocation', () => {
    let geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,     
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB'
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
});