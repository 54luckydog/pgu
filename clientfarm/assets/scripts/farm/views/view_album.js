////
//FileName:view_album.js
//Author: wangqiang
//CreateDate:2019-08-22 10:10
//Description:
//Modify:
//
const TAG ="VIEW_ALBUM";
const Log = GS.Log.create(TAG);
cc.Class({
    extends: cc.Component,

    properties: {
       spriteBg:cc.Sprite,//背景图
       labelAlbumName:cc.Label,
       nodeScrollView:cc.ScrollView,
       nodeContent:{
          default:null,
          type:cc.Node,
       },
       buttonTake:cc.Button,
       buttonUpload:cc.Button,
       buttonDelete:cc.Button,
       buttonClose:cc.Button,
      
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.buttonTake.node.on('click',this.onButtonTakeClick,this);
        this.buttonUpload.node.on('click',this.onButtonUploadClick,this);
        this.buttonDelete.node.on('click',this.onButtonDeleteClick,this);
        this.buttonClose.node.on('click',this.onButtonCloseClick,this);
        
     },
     
     onButtonTakeClick:function(){
        Log.debug("拍照");
     },
     onButtonUploadClick:function(){
        Log.debug("上传");
      },
      onButtonDeleteClick:function(){
        Log.debug("删除");
      },
      onButtonCloseClick:function(){
        Log.debug("关闭");
        this.main=this.node.getParent().getChildByName("view_main");
        this.node.active = false;
        this.main.active = true;
      },

    start () {
     
    },


     update (dt) {

     },
     onDestroy(){

     },
});
