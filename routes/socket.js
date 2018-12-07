/*
 这是socketio的相关监听即其他处理的js文件，所有socket统一在这里处理
 */
var socket = require('socket.io');
module.exports = function(server){
    var io = socket(server);
    //监听客户端连接
    io.on('connection', function (socket) {

        //加入分组
        socket.on('joinGroup', function (data) {
            console.log("直播信息："+JSON.stringify(data));
            socket.join(data.group);
        });

        //监听弹幕消息
        socket.on('sendBarrage',function(data){
            console.log("服务端接受弹幕："+JSON.stringify(data));

            var userData = data.userData;//发送弹幕的用户信息
            var group = data.liveVideoData.group;//发送消息客户端所在分组
            var barrageData = data.data;//弹幕数据

            //推送到客户端的数据
            var newData = {
                barrageData:barrageData
            };

            //io.sockets.in(group).emit('clientGetNewBarrageData',barrageData);//向客户端推送新数据，包括自己
            socket.broadcast.to(group).emit('clientGetNewBarrageData',newData);//向客户端推送新数据，不包括自己
        });

        //监听送礼
        socket.on('sendGifts',function(data){
            console.log("服务端接受礼物数据："+JSON.stringify(data));
            console.log("socket："+socket.id);

            var userData = data.userData;//用户信息
            var group = data.liveVideoData.group;//发送消息客户端所在分组
            var giftsData = data.data;//礼物数据

            //推送到客户端的数据
            var newData = {
                userData:userData,
                giftsData:giftsData
            };

            //io.sockets.in(group).emit('clientGetNewGiftsData',newData);//向客户端推送新数据，包括自己
            socket.broadcast.to(group).emit('clientGetNewGiftsData',newData);//向客户端推送新数据，不包括自己
        });




    });
};