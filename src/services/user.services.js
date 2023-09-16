const db = require("../database/connection");
const queries = require("../database/queries.json");
const CryptoJS = require("crypto-js");


exports.creatingUser = (emailId,password,userName)=>{
    return new Promise((resolve, reject) => {
        // const pass = CryptoJS.AES.encrypt(password, 'chatapp').toString();
        db.con.query(queries.createUser,[emailId,password,userName],(err, result) => {
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

exports.getUserDetails = (emailId,password)=>{
    return new Promise((resolve, reject) => {
        db.con.query(queries.getUserDetails,[emailId,password],(err, result) => {
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

