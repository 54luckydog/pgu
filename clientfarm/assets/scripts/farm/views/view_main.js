//
//FileName:view_main.js
//Author: luning
//CreateDate:2019-08-20 13:41
//Description:
//Modify:yangtianchao修改了代码规范
//
const TAG = 'VIEW_MAIN';
const Log = GS.Log.create(TAG);



//虚拟数据
const grandid = -1;
const url = 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKFASdZ7SWviaHbqlp6tEVO5lLkaic3TIs8BBuczkQsWp7Hf1DvW9vyias1owNlEtrEEV45pl84k94gw/0';
const name = '王凯乐的土地';
const operates = {
    water: 3,
    weed: 3,
    insect: 3,
    fertilizer: 3
}
const items = [
    {
        isplant: 0,
        cropid: 0,
        level: 0,
    },
]
cc.Class({
    extends: cc.Component,

    properties: {
        sptireHead: cc.Sprite,
        buttonAlbum: cc.Button,
        buttonLog: cc.Button,
        nodeNoGround: cc.Node,
        nodeHasGround: cc.Node,
        buttonWatering: cc.Button,
        buttonWeed: cc.Button,
        buttonPestcontrol: cc.Button,
        buttonFertilizer: cc.Button,
        buttonShop: cc.Button,
        buttonKnapsack: cc.Button,
        buttonNerghbor: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.root = this.node.getParent();
        this.init_prop(url);
        Log.debug('onLoad');
        if (grandid == -1) {
            Log.debug('购买土地');
            this.nodeNoGround.active = true;
            this.nodeHasGround.active = false;
        } else if (grandid == 0) {
            Log.debug('进入用户土地');
            this.nodeNoGround.active = false;
            this.nodeHasGround.active = true;
        }

    },

    start() {
    },

    init_prop(url) {
        this.getHeadImg(url);
        this.buttonWatering.num = operates.water;
        this.buttonWatering.node.getChildByName("num").getComponent(cc.Label).string = 'x' + operates.water;
        this.buttonWeed.num = operates.weed;
        this.buttonWeed.node.getChildByName("num").getComponent(cc.Label).string = 'x' + operates.weed;
        this.buttonPestcontrol.num = operates.insect;
        this.buttonPestcontrol.node.getChildByName("num").getComponent(cc.Label).string = 'x' + operates.insect;
        this.buttonFertilizer.num = operates.fertilizer;
        this.buttonFertilizer.node.getChildByName("num").getComponent(cc.Label).string = 'x' + operates.fertilizer;
    },

    getHeadImg(headimg) {
        let self = this;
        cc.loader.load({ url: headimg, type: 'jpg' }, function (err, tex) {
            self.sptireHead.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
        });
    },
    onClickedButton: function (event, customEventData) {
        if (customEventData == 'watering_button') {
            if (this.buttonWatering.num > 0) {
                this.buttonWatering.num -= 1;
                this.buttonWatering.node.getChildByName("num").getComponent(cc.Label).string = "x" + this.buttonWatering.num;
            }
            else {
                Log.debug("次数用完了，明天再来吧");
            }

        }
        else if (customEventData == 'weed_button') {
            if (this.buttonWeed.num > 0) {
                this.buttonWeed.num -= 1;
                this.buttonWeed.node.getChildByName("num").getComponent(cc.Label).string = "x" + this.buttonWeed.num;
            }
            else {
                Log.debug("次数用完了，明天再来吧");
            }
        }
        else if (customEventData == 'pestcontrol_button') {
            if (this.buttonPestcontrol.num > 0) {
                this.buttonPestcontrol.num -= 1;
                this.buttonPestcontrol.node.getChildByName("num").getComponent(cc.Label).string = "x" + this.buttonPestcontrol.num;
            }
            else {
                Log.debug("次数用完了，明天再来吧");
            }
        }
        else if (customEventData == 'fertilizer_button') {
            if (this.buttonFertilizer.num > 0) {
                this.buttonFertilizer.num -= 1;
                this.buttonFertilizer.node.getChildByName("num").getComponent(cc.Label).string = "x" + this.buttonFertilizer.num;
            }
            else {
                Log.debug("次数用完了，明天再来吧");
            }
        }
        else if (customEventData == 'shop_button') {
            Log.debug('打开商店');
            this.store = this.root.getChildByName('view_store');
            this.node.active = false;
            this.store.active = true;
        }
        else if (customEventData == 'knapsack_button') {
            Log.debug('打开背包');
            this.knapsack = this.root.getChildByName('view_knapsack');
            this.node.active = false;
            this.knapsack.active = true;
        }
        else if (customEventData == 'neighbor_button') {
            Log.debug('打开邻居');
            this.neighbor = this.root.getChildByName("view_neighbor");
            this.node.active = false;
            this.neighbor.active = true;
        } else if (customEventData == 'album_button') {
            Log.debug('打开相册');
            this.album = this.root.getChildByName("view_album")
            this.node.active = false;
            this.album.active = true;
        } else if (customEventData == 'log_button') {
            Log.debug('打开日志');
            this.log = this.root.getChildByName("view_log");
            this.node.active = false;
            this.log.active = true;
        } else if (customEventData == 'buy_button') {
            Log.debug('进行购买土地');
            this.land = this.root.getChildByName("view_land")
            this.node.active = false;
            this.land.active = true;
        }
    },
    update(dt) { },
});
