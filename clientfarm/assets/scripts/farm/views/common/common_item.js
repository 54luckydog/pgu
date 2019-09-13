//
//FileName:common_item.js
//Author: wangkaile
//CreateDate:2019-08-25
//Description:
//Modify:
//
const TAG = 'COMMON_ITEM';
const Log = GS.Log.create(TAG);

cc.Class({
  extends: cc.Component,

  properties: {
    spriteIcon: cc.Sprite,
    labelTitle: cc.Label,
    buttonBuy: cc.Node,
    labelPrice: cc.Label,
  },

  // onLoad () {},

  start() {
  },

  updateUI(data) {
    //data传入数据
    let self = this;
    cc.loader.load({ url: data.icon, type: 'jpg' }, function (err, image) {
      self.spriteIcon.spriteFrame = new cc.SpriteFrame(image);//图标
    });
    this._titleText = data.title;//名称
    this.labelTitle.string = this._titleText;
    //记录UI暂未展示的信息
    this._detailsText = data.details;//详情
    this._priceText = data.price;//价钱

    //判断是否为商店
    if (data.price && data.price !== undefined) {
      this.storeInit();
      this.labelPrice.string = this._priceText;
    } else {
      this.knapsackInit();
      //为背包时判断传入数量
      if (data.count && data.count !== undefined) {
        this._cardCount = data.count;
        this.labelTitle.string = this._titleText + "X" + this._cardCount;
      }
    }
  },

  //商店的初始化
  storeInit() {
    this.node.on("click", this.onStorePopup, this);
    this.buttonBuy.on("click", this.onButtonBuy, this)
  },
  //背包的初始化
  knapsackInit() {
    this.node.on("click", this.onKnapsackPopup, this);
    this.buttonBuy.active = false;
  },

  onButtonBuy() {
    Log.debug('购买');
  },


  onStorePopup() {
    let object = {
      iconPic: this.spriteIcon.spriteFrame,       //icon图标
      title: this.labelTitle.string,              //名称标题
      detailString: this._detailsText,            //详细内容 string 类型
      enterCallBack: null,                        //确定点击事件回调  function 类型.
      animSpeed: null,                            //动画速度 默认 = 0.3.
      needCancel: null,                           //是否展示取消按钮 bool 类型 默认 = ture.
      needEnter: false,                           //是否展示进入按钮 bool 类型 默认 = ture.

      newPrefabUrl: null,                         //新定义预制体.
      newPrefabCallBack: null                     //新预制体相关设置
    }
    
    Popup.show(object);
  },
  onKnapsackPopup() {
    let object = {
      iconPic: this.spriteIcon.spriteFrame,       //icon图标
      title: this.labelTitle.string,              //名称标题
      detailString: this._detailsText,            //详细内容 string 类型
      enterCallBack: null,                        //确定点击事件回调  function 类型.
      animSpeed: null,                            //动画速度 默认 = 0.3.
      needCancel: null,                           //是否展示取消按钮 bool 类型 默认 = ture.
      needEnter: null,                           //是否展示进入按钮 bool 类型 默认 = ture.

      newPrefabUrl: null,                         //新定义预制体.
      newPrefabCallBack: null                     //新预制体相关设置
    }

    object.enterCallBack=function () {
      Log.debug('使用');
      this._cardCount -= 1;
      //this.labelTitle.string = this._titleText + "X" + this._cardCount;
      object.title= this._titleText + "X" + this._cardCount;
    },

    Popup.show(object);
  },


  update(dt) {
    if (this._cardCount == 0) {
      this.node.destroy()
    }
  },
});
