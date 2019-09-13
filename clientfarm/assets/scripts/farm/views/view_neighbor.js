//
//FileName:view_main.js
//Author: yangtianchao
//CreateDate:2019-08-20 13:41
//Description:
//Modify:
//
const TAG = 'VIEW_NEIGHBOR';
const Log = GS.Log.create(TAG);


//虚拟数据
const data = [
    '王强的农场1',
    '王强的农场2',
    '王强的农场3',
    '王强的农场4',
    '王强的农场5',
    '王强的农场6',
    '王强的农场7',
    '王强的农场8',
    '王强的农场9',
    '王强的农场10',
    '王强的农场11',
    '王强的农场12',
    '王强的农场13',
    '王强的农场14',
    '王强的农场15',
    '王强的农场16',
    '王强的农场17',
    '王强的农场18',
    '王强的农场19',
    '王强的农场20',
    '王强的农场21',
    '王强的农场22',
    '王强的农场23',
    '王强的农场24',
    '王强的农场25',
    '王强的农场26',
]
cc.Class({
    extends: cc.Component,

    properties: {
        nodeContent: cc.Node,
        lableItem: cc.Prefab,
        nodeScrollview: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Log.debug('onLoad');
        this.nodeContent.removeAllChildren();
    },

    start() {
        this.createList(data);
    },
    createList(data) {
        this.data = data;

        this.lableItemHeight = 200;//设置每个lableItem的高
        this.topIndex = 0;//最上面的lableItem索引id
        this.bottomIndex = 5;//最下面的lableItem索引id
        this.offsetY = 80;//上下临界坐标补充，点击查看原理，值太小会出现lableItem在边界闪动的情况，因为lableItem可能此时在上下两边时均符合移动的情况，所以就会无限循环移动，此值建议自行调整

        //如果觉得这种获取临界坐标的方式比较麻烦，可以多创建几个lableItem，指定屏幕的上下边为边界
        let nodeScrollviewPos = this.nodeScrollview.position;//nodeScrollview以屏幕中心为原点的坐标，请自行计算出来
        this.topExtremeDistance = nodeScrollviewPos.y + this.nodeScrollview.height / 2 + this.offsetY;//获取lableItem能到达的屏幕上边界y坐标
        this.bottomExtremeDistance = nodeScrollviewPos.y - this.nodeScrollview.height / 2 - this.offsetY;//获取lableItem能到达的屏幕下边界y坐标

        this.lableItemsArr = [];//lableItem存储arr

        for (let i = 0; i < 6; i++) {
            let listlableItem = cc.instantiate(this.lableItem);
            listlableItem.parent = this.nodeContent;
            this.updatelableItem(listlableItem, this.data[i], i);
        }
        this.nodeContent.height = (data.length + 1) * this.lableItemHeight + 100;
    },

    updatelableItem(listlableItem, data, i) {
        listlableItem.y = -i * this.lableItemHeight - this.lableItemHeight / 2;
        listlableItem.getComponent('view_neighbor_info').init(data);
        this.lableItemsArr[i] = listlableItem;
    },

    updatelableItemsPos(dt) {
        if (this.lableItemsArr && this.lableItemsArr[this.bottomIndex]) {
            //获取上下lableItem当前的坐标
            let topPos = this.lableItemsArr[this.topIndex].convertToWorldSpaceAR(cc.v2(0, 0)).sub(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
            let bottomPos = this.lableItemsArr[this.bottomIndex].convertToWorldSpaceAR(cc.v2(0, 0)).sub(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));

            //检测上lableItem是否超过边界
            if (topPos.y > this.topExtremeDistance) {
                if (this.bottomIndex >= this.data.length - 1) {
                    return;
                }
                this.updatelableItem(this.lableItemsArr[this.topIndex], this.data[this.bottomIndex + 1], this.bottomIndex + 1);
                this.topIndex++;
                this.bottomIndex++;
                //检测下lableItem是否超过边界
            } else if (bottomPos.y < this.bottomExtremeDistance) {
                if (this.topIndex < 1) {
                    return;
                }
                this.updatelableItem(this.lableItemsArr[this.bottomIndex], this.data[this.topIndex - 1], this.topIndex - 1);
                this.topIndex--;
                this.bottomIndex--;
            }
        }
    },


    update(dt) {
        this.updatelableItemsPos(dt);
    },




    onClickedButton() {
        this.main = this.node.getParent().getChildByName('view_main');
        this.node.active = false;
        this.main.active = true;
    },
    onClickedButton_next() {
        this.neighbor_land = this.node.getParent().getChildByName('view_neighbor').getChildByName('neighbor_land');
        let infor = this.neighbor_land.getChildByName("hasground_info").getComponent(cc.Label).string;
        if (infor != this.data[this.data.length - 1]) {
            this.neighbor_land.getComponent('view_neighbor_land').init(this.data[this.data.indexOf(infor) + 1]);
        }
        else if (infor == this.data[this.data.length - 1]) {
            Log.debug('最后一个邻居了');
            this.neighbor_land.getComponent('view_neighbor_land').nextButtonClose();
        }

    },

    onClickedButton_before() {
        this.neighbor_land = this.node.getParent().getChildByName('view_neighbor').getChildByName('neighbor_land');
        let infor = this.neighbor_land.getChildByName("hasground_info").getComponent(cc.Label).string;
        if (infor != this.data[0]) {
            this.neighbor_land.getComponent('view_neighbor_land').init(this.data[this.data.indexOf(infor) - 1]);
        }
        else if (infor == this.data[0]) {
            Log.debug('第一个邻居');
            this.neighbor_land.getComponent('view_neighbor_land').beforeButtonClose();
        }
    }
});
