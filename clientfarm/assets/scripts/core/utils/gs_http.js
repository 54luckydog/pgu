//FileName:gs_http.js
//Author:zhengyunlong
//CreateDate:2019-08-30 21:28
//Description:
//Modify:zhengyunlong修改了代码规范

let GSHttp = {
    httpPost(url, reqData, success,fail) {
        //发起请求
        let xhr = new XMLHttpRequest();
        // let xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    let response = xhr.response;
                    console.log(response)
                    if (response) {
                        let responseJson = JSON.parse(response); // 解析完的json 文件再返回 回调函数
                        console.log(responseJson)
                        success(responseJson);
                    } else {
                        
                        //callback(responseJson);
                        console.log("不存在response")
                    }
                } else {
                    fail();
                    //fail(false);
                    console.log("请求不成功")
                }
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("access_token", "1");
        xhr.send(JSON.stringify(reqData));
    }
};

module.exports = GSHttp;