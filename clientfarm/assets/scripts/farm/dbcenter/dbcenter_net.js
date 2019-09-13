
function getDataFromSever({url,data,success,fail}) {    //   定义一个net.js 把函数放到js文件下    net.js 应该放到farm名称空间下（应该是想在getBagInfo函数下直接调用）
    GS.Http.httpPost(url,data, function(responseJson){    //url是协议名
        if(responseJson.code===0){
            success(responseJson.data)                         // http协议封装在core里面的GShttp里面
            return;
        }else{
            fail(responseJson.msg)
        }
    },function(){
        Log.debug("网络连接失败")
    })
}
module.exports=getDataFromSever