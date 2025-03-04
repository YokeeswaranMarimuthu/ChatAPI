const userService = require("../services/chat.services.js");
const socketConfig = require('../routes/sockets.js');

exports.getChatDetails = async(req, res) => {
    try{
        const id = req.userId
        const data = await userService.getChatDetailsById(id);
        if(data.status === 200){
            res.send({"status":data.status,"message":data.message,"actualData": data.actualData})
          }else{
            res.send(data.actualData)
          }
    }catch(err){
        throw(err)
    }
  };
  
  exports.message = async(req, res) => {
    try{
        let {senderId,chatId,content} = req.body;
        const data = await userService.newMessage(senderId,chatId,content)
        if(data.status === 200){
            res.send({"status":data.status,"message":data.message,"actualData": data.actualData})
          }else{
            res.send(data.actualData)
            console.log(data)
          }
    }catch(err){
        throw(err)
    }
  };

  exports.createChat = async(req, res) => {
    try{
        let {userIds,chatName,chatType} = req.body;
        const data = await userService.createNewChat(userIds,chatName,chatType)
        if(data.status === 200){
            res.send({"status":data.status,"message":data.message,"actualData": data.actualData})
          }else{
            res.send(data.actualData)
            console.log(data)
          }
    }catch(err){
        throw(err)
    }
  };

  exports.getChatMessages = async(req, res) => {
    try{
        let {chatId} = req.body;
        if (chatId) {
          const data = await userService.chatMessages(chatId, req?.userId)
          if(data.status === 200){
              res.send({"status":data.status,"message":data.message,"actualData": data.actualData})
            }else{
              res.send(data.actualData)
              console.log(data)
            }
        } else {
          res.send({"status":400, "message":"chatId is required"})
        }
    }catch(err){
        throw(err)
    }
  };

  exports.sendMessage = async(req, res) => {
    try{
        let {room, message} = req.body;
        if (message && req?.userId) {
          userService.addMessage(room, message, req?.userId);
          const io = socketConfig.getIo();
          io.to(room).emit('message', {userId: req?.userId, message});
          res.send({"status":200, "message": "Message sent Succesfully"})
        } else {
          res.send({"status":400, "message":"message is required"})
        }
    }catch(err){
        throw(err)
    }
  };