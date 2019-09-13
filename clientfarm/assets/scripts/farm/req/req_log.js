cc.Class({
    extends: cc.Component,

    properties: {

    },

    
    onLoad() {
        this.request()
    },

    
    request() {
        let reqData={
            "pageId":1,
            "count":10
        };
        // let url=""
        GS.Http.httpPost("http://47.111.22.119:80/greenhouse/game/logList", reqData, function (responseJson) {
            if (responseJson.code === 0) {
                return responseJson.data
            } else {
                
            }

        })
    }

    //let log=new Log()
    //export default LogRequest

});