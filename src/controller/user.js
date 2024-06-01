const userService = require("../services/user.services.js")
const auth = require('../routes/authorization')

exports.userSignUp = async(req, res) => {
  try{
      let {emailId,password,userName} = req.body;
      const userStatus = await userService.creatingUser(emailId,password,userName)
      if(userStatus.status === 200 && userStatus.actualData === 'success') {
        const getUserData = await auth.generateToken(emailId,password)
        if(getUserData.status === 200){
          res.send({"status":getUserData.status,
            "message":getUserData.message,
            "actualData": getUserData.actualData
          })
        } else {
          res.send({"status":getUserData.status,"message":getUserData.message,"actualData": userStatus.actualData})
        }      
      } else {
        res.send({"status":userStatus.status,"message":userStatus.actualData})
      }
  }catch(err){
      throw(err)
  }
};

exports.userLogIn = async(req, res) => {
  try{
      let {emailId,password} = req.body;
      const getUserData = await auth.generateToken(emailId,password)
      if(getUserData.status === 200){
        res.send({"status":getUserData.status,
            "message":getUserData.message,
            "actualData": getUserData.actualData
            })
      } else {
        res.send({"status":getUserData.status,"message":getUserData.message,"actualData": userStatus.actualData})
      }
  }catch(err){
      throw(err)
  }
};