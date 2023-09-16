const userService = require("../services/chat.services.js")

exports.getChatDetails = async(req, res) => {
    try{
        const id = req.userId
        const data = await userService.getChatDetailsById(id)
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

  exports.cteateChat = async(req, res) => {
    try{
        let {userIds,chatName,chatType} = req.body;
        const data = await userService.cteateNewChat(userIds,chatName,chatType)
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