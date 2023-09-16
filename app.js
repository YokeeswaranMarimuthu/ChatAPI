const express = require('express');
const server = require('./src/routes/route');
const mongoose = require('mongoose')
const auth = require('./src/routes/authorization');
const user = require('./src/controller/user');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://root:root@chatapp.paepqzd.mongodb.net/chat-app?retryWrites=true&w=majority')
.then(() => console.log("db connected"))
.catch((error) => console.log(error))

app.post('/api/signUp',user.userSignUp);
app.post('/api/logIn',user.userLogIn);
app.use('/api',auth.verify,server);

app.listen(5000,()=>{
    console.log("server is running on port 5000",);
});