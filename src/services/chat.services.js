const db = require("../database/connection");
const queries = require("../database/queries.json");

exports.getChatDetailsById = (id)=>{
    return new Promise((resolve, reject) => {
        db.con.query(queries.getChatIds,[id],(err, chat) => {
            if(err){
                reject(err)
            }else{
                if (chat?.[0]?.chatIds?.length) {
                    const ids = JSON.parse(chat?.[0]?.chatIds);
                    db.con.query(queries.chatDetails,[ids],(err, result) => {
                        if(err || !result.length){
                            reject(err)
                        }else{
                            const chatData = result.map((eachChat) => {
                                return ({
                                    chatId: eachChat.chatId,
                                    chatName: eachChat.chatType ? eachChat.groupName :
                                        eachChat.userId1 === id ? eachChat.name1 : eachChat.name2
                                });
                            })
                            resolve(chatData);
                        }
                    })
                } else {
                    reject(err);
                }
            }
        })
    }).then((data)=>{
      if(data){
          return{status : 200,message : "success",actualData : data}
      }else{
          return{status : 404,message : "error",actualData : data}
      }
  }).catch((error)=>{
     return{status:404,message: "not found",actualData : error}
  })
};

exports.newMessage = (senderId,chatId,content)=>{
    return new Promise((resolve, reject) => {
        db.con.query(queries.addMessage,[senderId,chatId,content],(err, result) => {
            if(err){
                reject(err)
            }else{
                resolve(result[0][0].message)
            }
        })
    }).then((data)=>{
      if(data){
          return{status : 200,message : "success",actualData : data}
      }else{
          return{status : 404,message : "error",actualData : data}
      }
  }).catch((error)=>{
     return{status:404,message: "not found",actualData : error}
  }) 
};

exports.createNewChat = (userIds,chatName,chatType)=>{
    return new Promise((resolve, reject) => {
        db.con.query(queries.addMessage,[userIds,chatName,chatType],(err, result) => {
            if(err){
                reject(err)
            }else{
                resolve(result[0][0].message)
            }
        })
    }).then((data)=>{
      if(data){
          return{status : 200,message : "success",actualData : data}
      }else{
          return{status : 404,message : "error",actualData : data}
      }
  }).catch((error)=>{
     return{status:404,message: "not found",actualData : error}
  }) 
};

exports.chatMessages = (chatId, userId)=>{
    return new Promise((resolve, reject) => {
        db.con.query(queries.getMessages,[chatId],(err, result) => {
            if(err){
                reject(err)
            } else if (!result.length) {
                resolve([]);
            } else{
                const messages = result.map((eachMessage) => {
                    return ({
                        type: eachMessage.userId === userId ? "sent" : "received",
                        content: eachMessage.message
                    })
                })
                resolve(messages);
            }
        })
    }).then((data)=>{
      if(data){
          return{status : 200,message : "success",actualData : data}
      }else{
          return{status : 404,message : "error",actualData : data}
      }
  }).catch((error)=>{
     return{status:404,message: "not found",actualData : error}
  }) 
};

exports.addMessage = (room, message)=>{
    try {
        db.con.query(queries.setMessages,[room, message])
    } catch (error) {
        
    } 
};