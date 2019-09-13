cc.log('load farm start');
window.farm = {};
farm.dbcenter=require('./dbcenter/dbcenter_initialize.js');
farm.getDataFromSever=require('./dbcenter/dbcenter_net.js')


cc.log('load farm end');