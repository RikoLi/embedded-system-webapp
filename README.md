# embedded-system-webapp
Embedded system assignment 3.

## 实现工具
* HTML5+js+css
    * <del>jQuery（若移动端支持），废案</del>
* apk & ipa打包
* 多种API
    * 高德地图API
    * <del>AR.js?</del>
* 移动设备可访问硬件
    * GPS
    * 蓝牙
    * 相机？

## 内容
* 简单的HTML布局
* GPS定位
* 现实交互型小游戏
    * 地图交互（事件触发）
    * 物品收集类RPG
    * 生命
* 简单的互动系统
    * <del>访问蓝牙，多用户交互</del>不支持，废案
* 简单的道具系统
* 数据本地保存
    * localStorage+json
* AR要素？

## 测试
* web：Chromium 63.0.3239.132
* Android：HUAWEI P10，Android 6.0
* iOS：iPhone 6，iOS 11.4.1

## 其他
* 最后报告中做一下简单需求分析

## Journal
3.10前
* 建立了基本UI和功能框架，确定了整体功能

3.10
* 开始重构marker部分的事件监听

3.11
* 完成了marker事件监听的重构

3.12
* 开始搭建道具系统框架

3.26
* 完成了道具系统，修复大量bug
* 道具库开始更新

4.6
* 因高德API更新，修改了`marker.target.D.title`为`marker.target.B.title`

4.7
* 新bug，Android端无法进行定位，怀疑是js脚本执行顺序修改所致/高德API更新导致，尽快修复

4.8
* 考虑bug的原因是本地缓存清空所致，考虑加入刷新机制

4.9
* 定位失败bug解决。原因：
    * 一个专门为移动端定位设计的js API在测试机上无效
    * 高德官方API文档书写有误（哈哈.jpg）
    * 高德提供的精确定位服务在测试机上无法正常工作，原因未知，之前从未出现过
* 解决方法：
    * 将定位API换成了web端更通用的一个
    * <del>痛斥了某API文档</del>
    * 使用非精确定位代替
* 新问题：相机调用失效
    * 解决方法：在设置中开启相机调用权限，目前只能开启前置相机