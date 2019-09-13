//
//FileName:view_store.js
//Author: wangkaile
//CreateDate:2019-08-25 19:50
//Description:
//Modify:修改初始化
//
const TAG = 'VIEW_STORE';
const LOG = GS.Log.create(TAG);



cc.Class({
    extends: cc.Component,

    properties: {
        buttonExit: cc.Node,
        nodeViewCommodity: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //Log.debug('onLoad');
        this.buttonExit.on('click', this.exitView, this);
        this.init();
    },

    start() {

    },
    init() {
        // Log.debug('init');
        this._viewCommodity = this.nodeViewCommodity.getComponent('common_select_svcrolview');

        let ppp = "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKFASdZ7SWviaHbqlp6tEVO5lLkaic3TIs8BBuczkQsWp7Hf1DvW9vyias1owNlEtrEEV45pl84k94gw/0";
        let titleText = "橘子";
        let detailsText = "详情呀呀呀呀呀呀呀呀呀呀呀呀哎呀";

        this.data1 = [];
        for (let i = 0; i < 500; i++) {
            this.data1[i] = { icon: ppp, title: i + titleText, details: detailsText, price: 100 };//count数量   price价钱
        }

        this._viewCommodity.selectScrollView(this.data1);


    },
    exitView() {
        // Log.debug('exit');
        this.main = cc.find("Canvas/root/view_main");
        this.node.active = false;
        this.main.active = true;
    }

    // update (dt) {},
});
