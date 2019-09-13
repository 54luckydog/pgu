
cc.Class({
    extends: cc.Component,

    properties: {
        item: {
            default: null,
            type: cc.Prefab,
            tooltip: "数据模版"
        },
        scrollView: cc.Node,
        view:
        {
            default: null,
            type: cc.Node,
            tooltip: "带有遮罩的节点"
        },
        content:
        {
            default: null,
            type: cc.Node,
            tooltip: "加载内容父节点，content节点的锚点必须在左上角"
        },

        top: {
            default: 0,
            type: cc.Float,
            tooltip: "距顶部高度"
        },
        bottom: {
            default: 0,
            type: cc.Float,
            tooltip: "距底部高度"
        },
        left: {
            default: 0,
            type: cc.Float,
            tooltip: "距左边距离"
        },
        right: {
            default: 0,
            type: cc.Float,
            tooltip: "距右边距离"
        },
        gapX: {
            default: 0,
            type: cc.Float,
            tooltip: "节点水平间隔"
        },
        gapY: {
            default: 0,
            type: cc.Float,
            tooltip: "节点垂直间隔"
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {
        this.scrollView.on('scroll-to-bottom', function () {
            console.log('滚动到列表底部了');
        });
    },

    selectScrollView(data) {

        let num1 = ((this.content.width - this.left - this.right) + this.gapX) / (this.item.data.width + this.gapX)
        this.eachRowNum = Math.floor(num1)//每行中最多容纳item的数量
        let num2 = ((this.view.height - this.top) + this.gapY) / (this.item.data.height + this.gapY)
        this.showRowNum = Math.ceil(num2)//显示区域最多可显示出来的行数
        this.data = [];//将数据按组存储下来
        this.itemArr = [];//创建arr存储item
        for (let i = 0; i < Math.ceil(data.length / this.eachRowNum); i++) {
            this.data[i] = []
            this.itemArr[i] = [];
            for (let j = 0; j < this.eachRowNum; j++) {
                this.data[i].push(data[i * this.eachRowNum + j])
            }
        }
        //选择滑动视图
        if (this.data.length > this.showRowNum) {
            this.optimizeScrollView();
        } else {
            this.commonScrollView();
        }
    },

    commonScrollView() {
        //设置content高度
        this.content.height = this.data.length * (this.item.data.height + this.gapY) - this.gapY + this.top + this.bottom;
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[i].length; j++) {
                let listItem = cc.instantiate(this.item);
                listItem.parent = this.content;
                this.updateItem(listItem, j, this.data[i][j], i);
            }
        }
    },

    optimizeScrollView() {

        this.topIndex = 0;//最上面的item索引id
        this.bottomIndex = this.showRowNum + 1;//最下面的item索引id 多向下加载一行保证不会闪动，也可调节this.offsetY,
        this.offsetY = 200;//上下临界坐标补充，值太小会出现item在边界闪动的情况,建议多向下指定一行
        let scrollViewPos = this.scrollView.position;//scrollView以屏幕中心为原点的坐标，请自行计算出来
        this.topExtremeDistance = scrollViewPos.y + this.scrollView.height / 2 + this.offsetY;//获取item能到达的屏幕上边界y坐标
        this.bottomExtremeDistance = scrollViewPos.y - this.scrollView.height / 2 - this.offsetY;//获取item能到达的屏幕下边界y坐标
        this.content.height = this.data.length * (this.item.data.height + this.gapY) - this.gapY + this.top + this.bottom;//设置content高度
        //实例化最初显示的item
        for (let i = 0; i < this.bottomIndex + 1; i++) {
            //保障方法要初始实例化数量不大于数据总量
            if (i <= this.data.length - 1) {
                for (let j = 0; j < this.eachRowNum; j++) {
                    let listItem = cc.instantiate(this.item);
                    listItem.parent = this.content;
                    this.updateItem(listItem, j, this.data[i][j], i);
                }
            }
        }
    },

    updateItem(listItem, j, data, i) {
        listItem.x = j * (this.item.data.width + this.gapX) + this.item.data.width / 2 + this.left;
        listItem.y = -i * (this.item.data.height + this.gapY) - this.item.data.height / 2 - this.top;
        if (data ==undefined) {
            listItem.active = false;
        } else {
            listItem.active = true;
            listItem.getComponent('common_item').updateUI(data);
        }
        this.itemArr[i][j] = listItem;
    },

    updateItemsPos(dt) {
        if (this.itemArr && this.itemArr[this.bottomIndex]) {
            //获取上下item当前的坐标
            let topPos = this.itemArr[this.topIndex][0].convertToWorldSpaceAR(cc.v2(0, 0)).sub(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
            let bottomPos = this.itemArr[this.bottomIndex][0].convertToWorldSpaceAR(cc.v2(0, 0)).sub(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));

            //检测上item是否超过边界
            if (topPos.y > this.topExtremeDistance) {
                if (this.bottomIndex < this.data.length - 1) {
                    for (let j = 0; j < this.eachRowNum; j++) {
                        this.updateItem(this.itemArr[this.topIndex][j], j, this.data[this.bottomIndex + 1][j], this.bottomIndex + 1);
                    }
                    this.topIndex++;
                    this.bottomIndex++;
                }
                //检测下item是否超过边界
            } else if (bottomPos.y < this.bottomExtremeDistance) {
                if (this.topIndex >= 1) {
                    for (let j = 0; j < this.eachRowNum; j++) {
                        this.updateItem(this.itemArr[this.bottomIndex][j], j, this.data[this.topIndex - 1][j], this.topIndex - 1);
                    }
                    this.topIndex--;
                    this.bottomIndex--;
                }
            }
        }
    },

    update(dt) {
        this.updateItemsPos(dt);
    },
});
