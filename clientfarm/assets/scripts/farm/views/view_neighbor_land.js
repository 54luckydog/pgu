//
//FileName:view_main.js
//Author: yangtianchao
//CreateDate:2019-08-20 13:41
//Description:
//Modify:
//
const TAG = 'NEIGHBOR_LAND';
const Log = GS.Log.create(TAG);

cc.Class({
    extends: cc.Component,

    properties: {
        lableLandInfo: cc.Label,
        buttonPrevious:cc.Button,
        buttonNext:cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init(infor){
        this.lableLandInfo.string = infor;
        this.buttonNext.interactable = true;
        this.buttonPrevious.interactable = true;
    },
    // update (dt) {},
    onClickedButton(){
        this.neighbor_list = this.node.getParent().getChildByName('neighbor_list');
        this.node.active = false;
        this.neighbor_list.active = true;
    },
    nextButtonClose(){
        this.buttonNext.interactable = false;
    },
 
    beforeButtonClose(){
        this.buttonPrevious.interactable = false;
    },
});
