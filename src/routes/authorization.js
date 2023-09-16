const db = require('../database/connection');
const queries = require('../database/queries.json');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
    if(req?.headers?.authorization){
        const token = req?.headers?.authorization.split(' ')[1];
        if(token){
            jwt.verify(token, 'chatapp' , (err,result) => {
                if(err) {
                    return res.json({success:false,message: "Invalid Token"});
                } else {
                    req.userId = result.userId
                    next()
                }
            })
        }else{
            return res.json({success: false,message: "Unauthorized User"});
        }
    }else {
        return res.json({success: false,message: "Unauthorized User"});
    }
};

exports.checkToken = async (req, res) => {
    console.log("you're in the server");
    try{
        let {email,password} = req.body;
        const result = await this.verify(email,password)
        if(result.status === 200){
            res.send(result.token)
          }else{
            res.send(result.message)
          }
    }catch(err){
        throw(err)
    }
};

exports.generateToken = (emailId,password)=>{
    return new Promise((resolve, reject) => {
        // const pass = CryptoJS.AES.encrypt(password, 'chatapp').toString();
        db.con.query(queries.getUserDetails,[emailId,password],(err, result) => {
            if(err){
                console.log(err);
                reject('invalid password')
            }else{
                console.log(result);
                resolve(result)
            }
        })
    }).then((data)=>{
        const jsontoken = jwt.sign({ userId: data[0].userId, userName: data[0].userName }, 'chatapp');
        return {status : 200, success : true,message : 'success',token : jsontoken}
    }).catch((err)=>{
           return{status:404,success : false,message:err}
    })
};
