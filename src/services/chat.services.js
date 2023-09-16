const user = require('../model/user');
const chat = require('../model/chat');
const message = require('../model/message');
const userService = require("../services/user.services.js")

exports.getChatDetailsById = (userId)=>{
    return new Promise(async(resolve, reject) => {
        const userDetails = await user.findOne({_id: userId});
        if(userDetails?._id){
            resolve(userDetails)
        }else{
            reject(userDetails)
        }
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
    return new Promise(async(resolve, reject) => {
        const userDetails = await user.findOne({_id: id});
        if(userDetails?._id){
            resolve(userDetails)
        }else{
            reject(userDetails)
        }
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
    return new Promise(async (resolve, reject) => {
        const userDetails = await user.findOne({_id: id});
        if(userDetails?._id){
            resolve(userDetails)
        }else{
            reject(userDetails)
        }
        // const allUsers = [];
        // userIds.forEach(userId => {
        //     allUsers.push(userService.getUserDetailsById(userId))
        // });
        // Promise.allSettled(allUsers).then(async(userDetails) => {
        //     userDetails.forEach(() => {

        //     })
        // })
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