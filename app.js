const express = require('express');
const serverr = require('./src/routes/route');
const db = require('./src/database/connection');
const auth = require('./src/routes/authorization');
const user = require('./src/controller/user');
const socketHandler = require('./src/routes/sockets.js');
const app = express();
const cors = require('cors');
const http = require('http');
const socketConfig = require('./src/routes/sockets.js');

const server = http.createServer(app)
const io = socketConfig.init(server); 
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:4000",
//     methods: ["GET", "POST"]
//   }
// });

app.use(cors());
app.use(express.json());
db.con.connect((err)=>{
if (err) throw err;
else console.log("db connected")
});

app.post('/api/signUp',user.userSignUp);
app.post('/api/logIn',user.userLogIn);
app.use('/api',auth.verify,serverr);

server.listen(5000,()=>{
    console.log("server is running on port 5000",);
});
socketHandler.createConnection(io);

// io.on('connection', (socket) => {
//     socket.on('join', (data) => {
//         socket.join(data.room);
//         socket.broadcast.to(data.room).emit("user joined")
//     });
//     socket.on("message", (data) => {
//         io.in(data.room).emit("new message", {user: data.user, message: data.message});
//     });
// })