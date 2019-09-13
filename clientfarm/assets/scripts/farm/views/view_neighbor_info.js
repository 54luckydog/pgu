//
//FileName:view_main.js
//Author: yangtianchao
//CreateDate:2019-08-20 13:41
//Description:
//Modify:
//
const TAG = 'NEIGHBOR_INFO';
const Log = GS.Log.create(TAG);


cc.Class({
    extends: cc.Component,

    properties: {
        lableItem: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() { },
    init(infor) {
        this.lableItem.string = infor;
    },
    start() {

    },
    onClickedButton() {
        this.neighbor_land = this.node.getParent().getParent().getParent().getParent().getChildByName('neighbor_land');
        this.neighbor_list = this.node.getParent().getParent().getParent().getParent().getChildByName('neighbor_list');
        this.neighbor_list.active = false;
        this.neighbor_land.active = true;
        this.neighbor_land.getComponent('view_neighbor_land').init(this.lableItem.string);
        Log.debug('打开' + this.lableItem.string);
    },
    // update (dt) {},
});
