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
    * 等级
    * 生命
    * 角色属性值
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

TODO: 完成玩家状态显示系统