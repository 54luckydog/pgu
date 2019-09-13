//这是做测试用的文件

cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad() {
        this.request()
    },
    request() {
        let reqData={
        };
        // let url=""
        GS.Http.httpPost("http://192.168.130.120:8092/greenhouse/game/myPackage", reqData, function (responseJson) {
            if (responseJson.code === 0) {
                return responseJson.data
            } else {
            }
        })
    }

    //let log=new Log()
    //export default LogRequest

});