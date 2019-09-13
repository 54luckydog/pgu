let Popup = {
  _popup: null, // prefab
  _detailLabel: null, // 内容
  _cancelButton: null, // 确定按钮
  _enterButton: null, // 取消按钮
  _enterCallBack: null, // 回调事件
  _bgButton: null, // 黑色半透明背景（点击关闭）
  _icon: null, // icon图标图标
  _animSpeed: 0.3, // 动画速度
  _titleLabel: null,//名称标题
  _newPrefabUrl: null,//默认预制体
  _newPrefabCallBack: null
};

/**
 * iconPic:           icon图标
 * title:             名称标题
 * detailString :     详细内容 string 类型 .
 * enterCallBack:     确定点击事件回调  function 类型.
 * animSpeed：        动画速度 默认 = 0.3.
 * needCancel:        是否展示取消按钮 bool 类型 默认 = true.
 * needenter:         是否展示进入按钮 bool 类型 默认 = true.
 * 
 * newPrefabUrl:      新定义预制体.
 * newPrefabCallBack: 新预制体相关设置
**/

Popup.show = function (object) {

  iconPic = object.iconPic;
  title = object.title
  detailString = object.detailString
  enterCallBack = object.enterCallBack
  animSpeed = object.animSpeed
  needCancel = object.needCancel
  needEnter = object.needEnter
  newPrefabUrl = object.newPrefabUrl
  newPrefabCallBack = object.newPrefabCallBack

  // 引用
  let self = this;
  // 判断
  if (Popup._popup != undefined) Popup._popup.destroy();

  //判断是否定义速度
  Popup._animSpeed = animSpeed ? animSpeed : Popup._animSpeed;

  // 加载 prefab 创建
  if (newPrefabUrl == undefined) {
    cc.loader.loadRes("prefabs/popup/popup_details", cc.Prefab, function (error, prefab) {
      if (error) {
        cc.error(error);
        return;
      }
      // 实例
      let popup = cc.instantiate(prefab);
      Popup._popup = popup;

      // 获取子节点
      Popup._bgButton = cc.find("Shield", popup);
      Popup._icon = cc.find("popupBg/icon", popup).getComponent(cc.Sprite);
      Popup._titleLabel = cc.find("popupBg/titleLabel", popup).getComponent(cc.Label);
      Popup._detailLabel = cc.find("popupBg/detailLabel", popup).getComponent(cc.Label);
      Popup._cancelButton = cc.find("popupBg/cancelButton", popup);
      Popup._enterButton = cc.find("popupBg/enterButton", popup);

      self.ready();
      //设置图标
      if (iconPic) {
        Popup._icon.spriteFrame = iconPic;
      }

      // 添加点击事件
      Popup._enterButton.on("click", self.onButtonClicked, self);
      Popup._cancelButton.on("click", self.onButtonClicked, self);
      //Popup._bgButton.on("click", self.onButtonClicked, self);

      // 父视图
      Popup._popup.parent = cc.find("Canvas");

      // 展现 popup
      self.startFadeIn();
      // 参数
      self.configPopup(title, detailString, enterCallBack, needCancel, animSpeed);
    });
  } else {
    //新定义的预制体及回调
    Popup._newPrefabUrl = newPrefabUrl;
    Popup._newPrefabCallBack = newPrefabCallBack;
    self._newPrefabCallBack();
  }
  // 参数
  self.configPopup = function (title, detailString, enterCallBack, needCancel, animSpeed) {
    //名称标题
    Popup._titleLabel.string = title || "标题";
    // 详细内容
    Popup._detailLabel.string = detailString;
    // 确定按钮回调
    Popup._enterCallBack = enterCallBack;

    // 是否需要确定按钮
    if (needEnter || needEnter == undefined) {
      Popup._enterButton.active = true; // 显示
    } else {
      Popup._enterButton.active = false; // 隐藏
    }
    // 是否需要取消按钮
    if (needCancel || needCancel == undefined) {
      Popup._cancelButton.active = true; // 显示
    } else {
      Popup._cancelButton.active = false; // 隐藏
      Popup._enterButton.x = 0;
    }

  };
  //加载动画
  self.ready = function () {
    let cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
    let cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
    self.actionFadeIn = cc.sequence(cc.fadeTo(Popup._animSpeed, 255), cbFadeIn);
    self.actionFadeOut = cc.sequence(cc.fadeTo(Popup._animSpeed, 0), cbFadeOut);
  };
  // 执行弹进动画
  self.startFadeIn = function () {
    Popup._popup.position = cc.v2(0, 0);
    Popup._popup.opacity = 0;
    Popup._popup.runAction(self.actionFadeIn);
  };
  // 执行弹出动画
  self.startFadeOut = function () {
    Popup._popup.runAction(self.actionFadeOut);
  };
  // 弹进动画完成回调
  self.onFadeInFinish = function () {
  };
  // 弹出动画完成回调
  self.onFadeOutFinish = function () {
    self.onDestory();
  };

  // 确定按钮点击事件
  self.onButtonClicked = function (event) {
    if (event.target.name == "enterButton") {
      if (self._enterCallBack) {
        self._enterCallBack();
      }
    }
    self.startFadeOut();
  };
  //自定义按钮事件
  self.newButtonEvent = function (prefab, buttonUrl, event) {
    if (!event && prefab && buttonUrl) {
      let cancelButton = cc.find(buttonUrl, prefab);
      cancelButton.on("click", function () {
        let action = cc.sequence(cc.fadeOut(0.3), cc.callFunc(prefab.removeFromParent, prefab));
        prefab.runAction(action);
      });
    }
  };
  // 销毁 popup
  self.onDestory = function () {
    Popup._popup.destroy();
    Popup._enterCallBack = null;
    Popup._popup = null;
    Popup._detailLabel = null;
    Popup._cancelButton = null;
    Popup._enterButton = null;
    Popup._animSpeed = 0.3;
    Popup._newPrefabUrl = null;
    Popup._newPrefabCallBack = null;
  };
};
