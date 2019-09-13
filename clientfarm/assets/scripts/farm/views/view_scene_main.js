//
//FileName:scene_main.js
//Author: luning
//CreateDate:2019-08-20 13:18
//Description:
//Modify:
//
const TAG = "SCENE_MAIN";
const Log = GS.Log.create(TAG);
const Views = {
    VIEW_MAIN: 'view_main',
    VIEW_NEIGHBOR: 'view_neighbor',
    VIEW_STORE: 'view_store',
    VIEW_LOG: 'view_log',
    VIEW_KNAPSACK: 'view_knapsack',
    VIEW_LAND: 'view_land',
    VIEW_ALBUM:'view_album',
};



const ViewsLoadOnEnter = [
    Views.VIEW_MAIN,
    Views.VIEW_NEIGHBOR,
    Views.VIEW_STORE,
    Views.VIEW_LOG,
    Views.VIEW_KNAPSACK,
    Views.VIEW_LAND,
    Views.VIEW_ALBUM,
];

//虚拟数据
const vip = 0;
cc.Class({
    extends: cc.Component,

    properties: {
        isload: false,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        Log.debug('onLoad');
        this.root = this.node.getChildByName('root');
        this.pop = this.node.getChildByName('pop');
        this.viewMap = new Map();
        this.loadViews();
    },

    start() {
    },
    update(dt) {
        if (this.isload) {
            //Log.debug(this.isload);
            if (vip == 0) {
                this.root.getChildByName(Views.VIEW_MAIN).active = true;
            } else if (vip == 1) {
                Log.debug('请购买会员后重试');
            }
            this.isload = false;
        }
    },

    loadViews() {
        ViewsLoadOnEnter.forEach(viewName => this.loadViewByName(viewName));
    },
    loadViewByName(viewName) {
        Log.debug('loadViewByName', viewName);
        cc.loader.loadRes(`prefabs/${viewName}`, (err, prefab) => {
            let viewRoot = this.root;
            let viewNode = cc.instantiate(prefab);
            viewNode.parent = viewRoot;
            viewNode.active = false;
            if (viewNode.name == 'view_main') {
                this.isload = true;
            }
            this.viewMap.set(viewName, viewNode);
        });
    },
    onDestroy() { },
});
