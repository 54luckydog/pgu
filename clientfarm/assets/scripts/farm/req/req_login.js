/*
class Login{
    constructor(){
        this.code="";
        this.appId="";
        this.secret="";
        this.grandType="authorization_code";
        this.openId="";//用户唯一id
        this.session_key="";//会话密钥

        this.nickName="";
        this.avatarUrl=""//头像

    }
    doLogin(){
        this.checkSession(); 
    }
    //微信登录
    wxLogin(){
        wx.request(){

        }
    } 
    
}
*/
import SystemTools from "../../game/utils/SystemTools";

export default class WxSdk {
    constructor() {
        this._tempCode = ""; //临时登录code
        this._appid = "填写小游戏的APPID"; // 小程序 appId
        this._secret = "填写小游戏的秘钥"; // 小程序 appSecret
        this._grant_type = "authorization_code"; //填写为 authorization_code
        this._openId = ""; // 用户唯一id
        this._session_key = ""; //会话密钥

        this._nickName = ""; //名字
        this._avatarUrl = ""; //头像url
    }


    login() {
        this.checkSession();
    }
    /**
     * 登录微信
     */
    loginWx() {
        wx.login({
            success: (code) => {

                this.tempCode = code;
                this.getAccessToken();
            },
            fail: () => {
                console.error(">>>>>登录失败");
            }
        });
    }

    /**
     * 检查当前登录状态是否过期
     */
    checkSession() {
        wx.checkSession({
            success: () => {
                //"登录还是有效的，不需要重新登录");
                this.getUserInfo();
            },
            fail: () => {
                //"登录状态过期了,需要重新登录");
                this.loginWx();
            }
        });
    }
    /**
     * 登入凭证校验
     */
    getAccessToken() {
        let url = "https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type={3}";
        url = SystemTools.format(url, this.appid, this.secret, this.tempCode, this.grant_type); //拼接网址

        let success = (res) => {
            let data = res.data;
            this.openId = data.openid; //用户唯一标识
            this.session_key = data.session_key; //回话密匙
            let errcode = data.errcode; //错误码
            let errMsg = data.errMsg; //错误信息
            if (errcode == -1) {
                console.error(">>>系统繁忙，此时请开发者稍候再试");
            } else if (errcode == 0) {
                //">>>请求成功");
                this.getUserInfo();
            } else if (errcode == 40029) {
                //">>>>code无效");
                this.getUserInfo();
            }
        };
        let fail = () => {
            console.error(">>>>>>>获取登录凭证失败");
        }
        this.request(url, success, fail);
    }
    /**
     * 微信请求
     * @param url  请求地址
     * @param successCallBack 成功回调
     * @param failBack  失败回调
     */
    request(url){
        wx.request({
            url:url,
            method:POST,
            dataType: "json",
            success:function(res){
    
                if(res.code==0){
                   
                   this._loginData=res.data
                  // return(this.loginData)
                }else{
                    this.showInfo(res.msg)
                }
    
            },
            fail:function(res){
                this.showInfo(res.msg)
            }
    
        }) 
    }
/*     
    request(url, successCallBack, failCallBack): void {
        let requestData: any = {
            url: url,
            method: "GET",
            dataType: "json",
            success: (res: any) => {
                if (successCallBack != null) {
                    successCallBack(res);
                }
            },
            fail: () => {
                if (failBack != null) {
                    failBack();
                }
                console.error(">>>>>>请求url失败：" + requestData.url);
            }
        };
        let wxtem: any = wx;
        wxtem.request(requestData);
    }
*/    
    /**
     * 获取用户信息
     */
    getUserInfo() {
        let data = {
            withCredentials: false,
            lang: "zh_CN",
            success: (res) => {
                let userInfo = res.userInfo;
                this.nickName = userInfo.nickName; //用户昵称
                this.avatarUrl = userInfo.avatarUrl; //用户头像图片 url
               
            },
            fail: () => {
                this.checkSession(); //获取用户信息失败之后 继续去获取
                console.error(">>>>获取用户信息失败:" + this.tempCode);
            }
        }
        wx.getUserInfo(data);
    }
}
//////////////////////

public static format(str: string, ...args: any[]): string {
    let result = str;
    if (args.length > 0) {
        let value;
        for (var key in args) {
            value = args[key];
            if (value != null && value.length != 0) {
                var reg = new RegExp(`\\{${key}\\}`, "g");
                result = result.replace(reg, value);
            }
        }
    }

    return result;
}