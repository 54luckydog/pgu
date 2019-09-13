
//farm.dbcenter = {};  报错  找不到farm
//let dbcenter = {}

const Servers = {
    DEBUG_SERVER:"http://47.111.22.119:80/greenhouse/game/",
    ONLINE_SERVER:"https://47.111.22.119:80/greenhouse/game/"
};
const HttpServer=Servers.DEBUG_SERVER;
const HttpsServer=Servers.ONLINE_SERVER;
//如果用GS.dbcenter.protocols={} 就不报错
farm.dbcenter.protocols={ 
    GET_LOGIN_INFO:"login",           //是协议
    GET_LOG_INFO:"logList",            //日志
    GET_BAG_INFO:"myPackage",            //背包信息
    GET_PHOTO_INFO:"picList",         //照片信息
    GET_GRAND_INFO:"landInfo",        //土地信息
    USE_BAG_ITEM:"toolsUse",          //使用背包工具
    UPLOAD_PHOTO:"addPic",           //上传照片
    DELETE_PHOTO:"delPic",            //删除照片
    GRAND_CHOICE:"purchaseLand",            //土地选择
    BUY_GRAND:"purchaseLand",               //购买土地
    USE_GRAND_ITEM:"landOperate",          //土地操作
    PLANT:"plant",                   //种植
    GET_STORE_LIST:"shopList",          //获取商城列表
    BUY_STORE_ITEM:"purchaseTools",          //购买商城道具
    GET_NEIGHBOR_INFO:"",     //邻居信息
};                                                             //这里定义两个js文件  数据的初始化放在一个js文件里面   数据的请求放在一个JS文件
//日志信息
function getLogInfo({pageId,num,success,fail}){//这里的succecc和fail应该是游戏逻辑那边传的回调函数，游戏逻辑调dbcenter,dbcenter调协议， 
    if(farm.dbcenter.logInfo){                       //问题：1.游戏逻辑层调这个接口时需要调用这个函数，传进来参数，包括function（）{}的回调处理函数，是游戏逻辑层写还是我再封装一层？
        success(farm.dbcenter.logInfo);              // 如果dbcenter中有数据，就返回不去请求（此时有问题，因为数据会更新的，比如有参数的请求，
        return;                                 //第一次请求时候把数据拉下来了并且放到缓存中了，第二次调函数时候数据应该会改变，但是此时只是检查到数据是否存在，
    }                                               //有就返回没有就请求数据，并没有检查自己请求的数据是不是自己想要的数据，比如第二页的数据和第一页的数据不一样但是内存中有数据（第一页的数据，此时就返回了，没有去调用第二次的函数）
    let _reqData={                                  
        "pageId":pageId,                            
        "count":num,
    }
    let _reqSuccess=(data)=>{
        farm.dbcenter.logInfo=data;
        success(data)
    }
    let _reqFailed=(data)=>{
        fail();
    } 
    farm.getDataFromSever({url:HttpServer+dbcenter.protocols.GET_LOG_INFO,data:_reqData,success:_reqSuccess,fail:_reqFailed});
};
//背包信息
function getBagInfo({success,fail}){
    if(farm.dbcenter.bagInfo){                       
        success(farm.dbcenter.bagInfo);              
        return;                                 
    }                                               
    
    let _reqSuccess=(data)=>{
        farm.dbcenter.bagInfo=data;
        success(data)
    }
    let _reqFailed=(data)=>{
        fail();
    } 
    farm.getDataFromSever({url:HttpServer+dbcenter.protocols.GET_BAG_INFO,data:_reqData,success:_reqSuccess,fail:_reqFailed});
};
//使用背包道具
function useBagItem({itemId,success,fail}){
    if(farm.dbcenter.bagItemInfo){                       
        success(farm.dbcenter.bagItemInfo);              
        return;                                 
    }                                               
    let _bagItemReqData={
        "itemId":itemId,
        "params":{}
    }
    let _reqSuccess=(data)=>{
        farm.dbcenter.bagItemInfo=data;
        success(data)
    }
    let _reqFailed=(data)=>{
        fail();
    } 
    farm.getDataFromSever({url:HttpServer+dbcenter.protocols.USE_BAG_ITEM,data:_bagItemReqData,success:_reqSuccess,fail:_reqFailed});
};

//照片信息
function getPhotoInfo({success,fail}){
    if(farm.dbcenter.photoInfo){                       
        success(farm.dbcenter.photoInfo);              
        return;                                 
    }                                               
    
    let _reqSuccess=(data)=>{
        farm.dbcenter.photoInfo=data;
        success(data)
    }
    let _reqFailed=(data)=>{
        fail();
    } 
    farm.getDataFromSever({url:HttpServer+dbcenter.protocols.GET_PHOTO_INFO,data:_reqData,success:_reqSuccess,fail:_reqFailed});
};
/*
//上传照片
//有待研究
function uploadPhoto({success,fail}){
    let _reqSuccess=(data)=>{
        success(data)
    }
    let _reqFailed=(data)=>{
        fail();
    } 
    farm.getDataFromSever({url:HttpServer+farm.dbcenter.protocols.UPLOAD_PHOTO,data:_reqData,success:_reqSuccess,fail:_reqFailed});
};
*/
//删除照片
function deletePhoto({photoId,success,fail}){
    let _deleteData={
        "photoId":photoId
    };
    let _reqSuccess=(data)=>{
        //没有返回值，只有成功和失败
        success(data)
    }
    let _reqFailed=(data)=>{
        fail();
    } 
    farm.getDataFromSever({url:HttpServer+dbcenter.protocols.DELETE_PHOTO,data:_deleteData,success:_reqSuccess,fail:_reqFailed});
};
//土地信息
function getGrandInfo({success,fail}){
    if(farm.dbcenter.grandInfo){                       
        success(farm.dbcenter.grandInfo);              
        return;                                 
    }                                               
    
    let _reqSuccess=(data)=>{
        farm.dbcenter.grandInfo=data;
        success(data)
    }
    let _reqFailed=(data)=>{
        fail();
    } 
    farm.getDataFromSever({url:HttpServer+dbcenter.protocols.GET_GRAND_INFO,data:_grandInfoData,success:_reqSuccess,fail:_reqFailed});
};
//土地选择
function grandChoiceInfo({cmd,success,fail}){
    if(farm.dbcenter.grandChoiceInfo){                       
        success(farm.dbcenter.grandChoiceInfo);              
        return;                                 
    }                                               
    let _choiceGrandData={
        "cmd":cmd,
        /*
        "params":{ //object 
            "dapengId":"0-100" // number 
        }
        */
    }
    let _reqSuccess=(data)=>{
        farm.dbcenter.grandChoiceInfo=data;
        success(data)
    }
    let _reqFailed=(data)=>{
        fail();
    } 
    farm.getDataFromSever({url:HttpServer+dbcenter.protocols.GRAND_CHOICE,data:_choiceGrandData,success:_reqSuccess,fail:_reqFailed});
};
//购买土地
function buyGrand({dapengId,grandId,success,fail}){
                                                   
    let _buyGrandData={
        "dapengId":dapengId,
        "grandId":grandId,
    }
    let _reqSuccess=(data)=>{
        
        success(data)
    }
    let _reqFailed=(data)=>{
        fail();
    } 
    farm.getDataFromSever({url:HttpServer+dbcenter.protocols.BUY_GRAND,data:_buyGrandData,success:_reqSuccess,fail:_reqFailed});
};

//土地操作（种草，施肥）
//此处的cmd 参数是water，weed，insect，fertilizer
function useGrandItem({cmd,success,fail}){      
    if(farm.dbcenter.useGrandItemInfo){                       
        success(farm.dbcenter.useGrandItemInfo);              
        return;                                 
    }                                               
    let _useGrandItemData={
        "cmd":cmd
    }
    let _reqSuccess=(data)=>{
        farm.dbcenter.grandInfo=data;
        success(data)
    }
    let _reqFailed=(data)=>{
        fail();
    } 
    farm.getDataFromSever({url:HttpServer+dbcenter.protocols.USE_GRAND_ITEM,data:_useGrandItemData,success:_reqSuccess,fail:_reqFailed});
};
//种植
function plant({grandId,seedId,success,fail}){
                                                
    let _plantData={
       "grandId":grandId,
       "seedId":seedId
    }
    let _reqSuccess=(data)=>{
        
        success(data)
    }
    let _reqFailed=(data)=>{
        fail();
    } 
    farm.getDataFromSever({url:HttpServer+dbcenter.protocols.PLANT,data:_plantData,success:_reqSuccess,fail:_reqFailed});
};
//商城列表
function getStoreList({success,fail}){
    if(farm.dbcenter.storeList){                       
        success(farm.dbcenter.storeList);              
        return;                                 
    }                                               
    
    let _reqSuccess=(data)=>{
        farm.dbcenter.storeList=data;
        success(data)
    }
    let _reqFailed=(data)=>{
        fail();
    } 
    farm.getDataFromSever({url:HttpServer+dbcenter.protocols.GET_STORE_LIST,data:{},success:_reqSuccess,fail:_reqFailed});
};
//购买商城道具
//我可以把num默认为1，写死在这
function buyStoreItem({itemId,num,success,fail}){                                               
    let _buyStoreItemData={
        "itemId":itemId,
        "num":num  
    }
    let _reqSuccess=(data)=>{
        
        success(data)
    }
    let _reqFailed=(data)=>{
        fail();
    } 
    farm.getDataFromSever({url:HttpServer+dbcenter.protocols.BUY_STORE_ITEM,data:_buyStoreItemData,success:_reqSuccess,fail:_reqFailed});
};

//获取邻居信息
function getNeighborInfo({success,fail}){
    if(farm.dbcenter.neighborInfo){                       
        success(farm.dbcenter.neighborInfo);              
        return;                                 
    }                                               
    
    let _reqSuccess=(data)=>{
        farm.dbcenter.storeList=data;
        success(data)
    }
    let _reqFailed=(data)=>{
        fail();
    } 
    farm.getDataFromSever({url:HttpServer+dbcenter.protocols.GET_NEIGHBOR_INFO,data:{},success:_reqSuccess,fail:_reqFailed});
};
module.exports={
    getLogInfo,
    getBagInfo,
    useBagItem,
    getPhotoInfo,
    deletePhoto,
    getGrandInfo,
    grandChoiceInfo,
    buyGrand,
    useGrandItem,
    plant,
    getStoreList,
    buyStoreItem,
    getNeighborInfo,
}