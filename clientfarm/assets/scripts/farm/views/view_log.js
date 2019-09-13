
// /
//FileName:view_log.js
//Author: wangqiang
//CreateDate:2019-08-21 09:56
//Description:
//Modify:
//
const TAG ="VIEW_LOG";
const Log = GS.Log.create(TAG);
cc.Class({
    extends: cc.Component,

    properties: {
        numLogHigh:60,//每条高度30
        numLogConst:10,//每页条数
        spritrBg:cc.Sprite,//获取背景图层
        labelLogName:cc.Label,//日志标题
        labelPageNum:cc.Label,//页码
        scrollView:cc.ScrollView,//获取scrollview组件
        buttonBack:cc.Button,//上一页按钮
        buttonNext:cc.Button,//下页按钮
        buttonClose:cc.Button,//关闭按钮
        prefabLogItem:cc.Prefab,//日志预制体

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         //LOG.debug('onload');
         this.buttonBack.node.on('click',this.onButtonBackClick,this);
         this.buttonNext.node.on('click',this.onButtonNextClick,this);
         this.buttonClose.node.on('click',this.onButtonCloseClick,this);
     },
     onButtonBackClick:function(){
         Log.debug("上一页");
         //var self = this.bg;//加载背景图片(暂时没有素材请勿删除)
        // 远程 url 带图片后缀名
       // var remoteUrl = "http://unknown.org/someres.png";
       //cc.loader.load(remoteUrl, function (err, texture) {
       //  self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
       // });
     },
     onButtonNextClick:function(){
         Log.debug("下一页");
         //var self = this.bg;//加载背景图片(暂时没有素材请勿删除)
        // 远程 url 带图片后缀名
       // var remoteUrl = "http://unknown.org/someres.png";
       //cc.loader.load(remoteUrl, function (err, texture) {
       //  self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
       // });
     },
     onButtonCloseClick:function(){
         Log.debug("关闭");
         this.main = this.node.getParent().getChildByName("view_main");
         this.node.active = false;
         this.main.active = true;
         //var self = this.bg;//加载背景图片(暂时没有素材请勿删除)
        // 远程 url 带图片后缀名
       // var remoteUrl = "http://unknown.org/someres.png";
       //cc.loader.load(remoteUrl, function (err, texture) {
       //  self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
       // });
     },

    
    start () {
        //var self = this.bg;//加载背景图片(暂时没有素材请勿删除)
        // 远程 url 带图片后缀名
       // var remoteUrl = "http://unknown.org/someres.png";
       //cc.loader.load(remoteUrl, function (err, texture) {
       //  self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
       // });
    },
    
     update () {
         var page=this.labelPageNum;
         var num="url"
         page.getComponent(cc.Label).string=num;
     },
     onDestroy(){

     },
});
