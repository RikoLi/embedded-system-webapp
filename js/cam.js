const VW = 340;
const VH = 480;

//访问用户媒体设备的兼容方法
function getUserMedia(constrains,success,error){
    if(navigator.mediaDevices.getUserMedia){
        //最新标准API
        navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia){
        //webkit内核浏览器
        navigator.webkitGetUserMedia(constrains).then(success).catch(error);
    } else if (navigator.mozGetUserMedia){
        //Firefox浏览器
        navagator.mozGetUserMedia(constrains).then(success).catch(error);
    } else if (navigator.getUserMedia){
        //旧版API
        navigator.getUserMedia(constrains).then(success).catch(error);
    }
}

//成功的回调函数
function success(stream){
    //兼容webkit内核浏览器
    let CompatibleURL = window.URL || window.webkitURL;
    //将视频流设置为video元素的源
    video.src = CompatibleURL.createObjectURL(stream);
    //播放视频
    video.play();
}

//异常的回调函数
function error(error){
    alert("访问用户媒体设备失败："+error.name+'\n'+error.message);
}


let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia){
    //调用用户媒体设备，访问摄像头
    getUserMedia({
        video: {width:VW, height:VH}
    },success,error);
}
else {
    alert("你的浏览器不支持访问用户媒体设备");
}

//注册拍照按钮的单击事件
document.getElementById("capture").addEventListener("click", () => {
    //绘制画面
    context.drawImage(video,0,0,VW,VH);
});

// 返回主页面
document.getElementById('return').addEventListener('click', () => {
    window.open('index.html', '__self');
});