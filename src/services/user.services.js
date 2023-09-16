const user = require('../model/user')
const CryptoJS = require("crypto-js");

exports.creatingUser = (emailId,password,userName)=>{
    return new Promise(async(resolve, reject) => {
        const createUser = await user.create({emailId:emailId, password: password, userName: userName})
        if(createUser?._id){
            resolve(createUser)
        }else{
            reject(createUser)
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

exports.getUserDetails = (emailId,password)=>{
    return new Promise(async(resolve, reject) => {
        const userDetails = await user.findOne({emailId:emailId, password: password})
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

exports.getUserDetailsById = (userId)=>{
    return new Promise(async(resolve, reject) => {
        const userDetails = await user.findOne({_id: userId})
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