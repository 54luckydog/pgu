
//
//FileName:view_knapsack_kind_switch.js
//Author: wangkaile
//CreateDate:2019-08-23
//Description:
//Modify:
//

const TAG = 'STORE_KIND_SWITCH';
const LOG = GS.Log.create(TAG);


cc.Class({
    extends: cc.Component,

    properties: {
        butKindTabLeft: cc.Node,
        butKindTabMiddle: cc.Node,
        butKindTabRight: cc.Node,

        nodeViewSeed: cc.Node,
        nodeViewDecoration: cc.Node,
        nodeViewProp: cc.Node, 
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        
    },

    start() {
      
    },
    init() {
       // Log.debug('init');    
        this.butKindTabLeft.on('mousedown', this.onViewSeed, this);
        this.butKindTabMiddle.on('mousedown', this.onViewDecoration, this);
        this.butKindTabRight.on('mousedown', this.onViewProp, this);

        this.KindTabBgColor = this.butKindTabLeft.getChildByName('bg').color;
        this.KindTabTextColor = this.butKindTabLeft.getChildByName('text').color; 
        this.onViewSeed();
    },

    onViewSeed() {
       // Log.debug('onViewSeed');
        this.nodeViewSeed.active = true;
        this.nodeViewDecoration.active = false;
        this.nodeViewProp.active = false;   

        this.butKindTabLeft.getChildByName('bg').color = cc.color(255, 100, 100, 255);
        this.butKindTabLeft.getChildByName('text').color = cc.color(255, 255, 255, 255);

        this.butKindTabMiddle.getChildByName('bg').color = this.KindTabBgColor;
        this.butKindTabMiddle.getChildByName('text').color = this.KindTabTextColor;

        this.butKindTabRight.getChildByName('bg').color = this.KindTabBgColor;
        this.butKindTabRight.getChildByName('text').color = this.KindTabTextColor;

    },
    onViewDecoration() {
        //Log.debug('onViewDecoration');
        this.nodeViewSeed.active = false;
        this.nodeViewDecoration.active = true;
        this.nodeViewProp.active = false;

        this.butKindTabLeft.getChildByName('bg').color = this.KindTabBgColor;
        this.butKindTabLeft.getChildByName('text').color = this.KindTabTextColor;

        this.butKindTabMiddle.getChildByName('bg').color = cc.color(255, 100, 100, 255);
        this.butKindTabMiddle.getChildByName('text').color = cc.color(255, 255, 255, 255);

        this.butKindTabRight.getChildByName('bg').color = this.KindTabBgColor;
        this.butKindTabRight.getChildByName('text').color = this.KindTabTextColor;
    },
    onViewProp() {
       // Log.debug('onViewProp');
        this.nodeViewSeed.active = false;
        this.nodeViewDecoration.active = false;
        this.nodeViewProp.active = true;

        this.butKindTabLeft.getChildByName('bg').color = this.KindTabBgColor;
        this.butKindTabLeft.getChildByName('text').color = this.KindTabTextColor;

        this.butKindTabMiddle.getChildByName('bg').color = this.KindTabBgColor;
        this.butKindTabMiddle.getChildByName('text').color = this.KindTabTextColor;

        this.butKindTabRight.getChildByName('bg').color = cc.color(255, 100, 100, 255);
        this.butKindTabRight.getChildByName('text').color = cc.color(255, 255, 255, 255);
    },

    

    // update (dt) {},
  
});
