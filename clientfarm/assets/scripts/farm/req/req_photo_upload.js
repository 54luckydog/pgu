//这是做测试用的文件

cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad() {
        this.request()
    },


    request() {
        let reqData = {
            "photoData":"base64/图片"
        };
        // let url=""
        GS.Http.httpPost("http://47.111.22.119:80/greenhouse/game/addPic", reqData, function (responseJson) {
            if (responseJson.code === 0) {
                return responseJson.data
            } else {

            }

        })
    }

    //let log=new Log()
    //export default LogRequest

});