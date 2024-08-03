const express = require('express');
const server = require('./src/routes/route');
const mongoose = require('mongoose')
const auth = require('./src/routes/authorization');
const user = require('./src/controller/user');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://yokeesoftsuave:qkwJ0HHJP15Q1qs2@cluster0.yajrm.mongodb-stage.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log("db connected"))
.catch((error) => console.log(error))

app.get('/api/testConnection',user.testConnection);
app.post('/api/signUp',user.userSignUp);
app.post('/api/logIn',user.userLogIn);
app.use('/api',auth.verify,server);

app.listen(5000,()=>{
    console.log("server is running on port 5000",);
});