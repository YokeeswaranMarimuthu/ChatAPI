const express = require('express');
const server = require('./src/routes/route');
const db = require('./src/database/connection');
const auth = require('./src/routes/authorization');
const user = require('./src/controller/user');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
db.con.connect((err)=>{
if (err) throw err;
else console.log("db connected")
});

app.post('/api/signUp',user.userSignUp);
app.post('/api/logIn',user.userLogIn);
app.use('/api',auth.verify,server);

app.listen(5000,()=>{
    console.log("server is running on port 5000",);
});