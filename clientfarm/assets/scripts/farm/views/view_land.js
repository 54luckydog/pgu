////
//FileName:view_land.js
//Author: wangqiang
//CreateDate:2019-08-23 15:17
//Description:
//Modify:
//
const TAG ="VIEW_LAND";
const Log = GS.Log.create(TAG);
cc.Class({
    extends: cc.Component,

    properties: {
       spriteBg:cc.Sprite,
       buttonClose:cc.Button,
       buttonSearch:cc.Button,
       buttonBuy:{
          default:[],
          type:[cc.Button],
       },
       scrollView:cc.ScrollView,
       editBox:{
          default:null,
          type:cc.EditBox,
          },
       prefabViewLand:{
          default:null,
          type:cc.Prefab,
         },
       prefabViewmain:{
            default:null,
            type:cc.Prefab,
         },
       nodeViewGetLand:{
          default:null,
          type:cc.Node,
       },
       buttonBuyLand:cc.Button,
       buttonCloseTwo:cc.Button,

         },
  
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       this.buttonClose.node.on('click',this.onButtonCloseClick,this);
       this.buttonCloseTwo.node.on('click',this.onButtonCloseTwoClick,this);
       this.buttonSearch.node.on('click',this.onButtonSearchClick,this);
       this.editBox.node.on('editing did ended',this.onEditBox,this);
       this.buttonBuyLand.node.on('click',this.onButtonBuyLandClick,this);
       
    },
    start () {
      
   },

    update (dt) {

    },

    onDestroy(){

    },
    onButtonBuyclick(event, customEventData){
      var node = event.target;
      if (customEventData == '0'){
         this.nodeViewGetLand.active=true;
      }
      if (customEventData == '1'){
         this.nodeViewGetLand.active=true;
      }
      if (customEventData == '2'){
         this.nodeViewGetLand.active=true;
      }
      if (customEventData == '3'){
         this.nodeViewGetLand.active=true;
      }
      if (customEventData == '4'){
         this.nodeViewGetLand.active=true;
      }
      if (customEventData == '5'){
         this.nodeViewGetLand.active=true;
      }
      if (customEventData == '6'){
         this.nodeViewGetLand.active=true;
      }
      if (customEventData == '7'){
         this.nodeViewGetLand.active=true;
      }

    },
    onEditBox: function (edit_box) {
       Log.debug("搜索");
       this.text = this.edit_box.string
       Log.debug(this.text);
      // 回调的参数是 editbox 组件
     
   },
   onButtonSearchClick:function(){
      Log.debug("搜素功能");
      Log.debug(this.text);
   },
   onButtonCloseTwoClick:function(){
      Log.debug("关闭2");
      this.nodeViewGetLand.active=false;
   },
   onButtonCloseClick:function(){
      
      Log.debug("关闭1");
      this.main=this.node.getParent().getChildByName("view_main");
      this.node.active = false;
      this.main.active = true;
   },
   onButtonBuyLandClick:function(){
      
      Log.debug("购买土地")
      
   },
   

    
});
