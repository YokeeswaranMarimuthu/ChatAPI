const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
    {
        chatType: String,
        chatUsers: Array,
        chatName: String,
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const chat = mongoose.model('chat', chatSchema);
module.exports = chat;