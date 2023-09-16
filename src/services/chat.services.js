const db = require("../database/connection");
const queries = require("../database/queries.json");

exports.getChatDetailsById = (id)=>{
    return new Promise((resolve, reject) => {
        db.con.query(queries.chatDetails,[id],(err, result) => {
            if(err){
                reject(err)
            }else{
                resolve(result)
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

exports.cteateNewChat = (userIds,chatName,chatType)=>{
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