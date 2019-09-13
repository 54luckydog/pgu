
//
//FileName:view_knapsack.js
//Author: wangkaile
//CreateDate:2019-08-23
//Description:
//Modify:
//
const TAG = 'VIEW_KNAPSACK';
const LOG = GS.Log.create(TAG);


cc.Class({
  extends: cc.Component,

  properties: {
    buttonExit: cc.Button,
    nodeKindSwitch: cc.Node,
  },
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    //  Log.debug('onLoad');
    this.buttonExit.node.on('click', this.exitView, this);
    this.init();
    this.getData();
  },

  start() {

  },
  init() {
    // Log.debug('init');
    this._kindSwitch = this.nodeKindSwitch.getComponent('view_knapsack_kind_switch');
    this._kindSwitch.init();

    this._viewSeed = this._kindSwitch.nodeViewSeed;
    this._viewDecoration = this._kindSwitch.nodeViewDecoration;
    this._viewProp = this._kindSwitch.nodeViewProp;
  },

  exitView() {
    // Log.debug('exit');
    this.main = cc.find("Canvas/root/view_main");
    this.node.active = false;
    this.main.active = true;
  },

  getData() {

    //虚拟数据
    let url = 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKFASdZ7SWviaHbqlp6tEVO5lLkaic3TIs8BBuczkQsWp7Hf1DvW9vyias1owNlEtrEEV45pl84k94gw/0';
    let titleText = "橘子";
    let detailsText = "详情呀呀呀呀呀呀呀呀呀呀呀呀哎呀";
    this.data = [];
    for (let i = 0; i < 65; i++) {
      this.data[i] = { icon: url, title: i + titleText, details: detailsText, count: 1 };//count数量   price价钱
    }

    this._viewSeed.getComponent('common_select_svcrolview').selectScrollView(this.data);
    this._viewDecoration.getComponent('common_select_svcrolview').selectScrollView(this.data);
    this._viewProp.getComponent('common_select_svcrolview').selectScrollView(this.data);
  }


  // update (dt) {},
});
