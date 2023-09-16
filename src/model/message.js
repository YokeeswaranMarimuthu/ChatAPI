const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        chatId: String,
        message: String,
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const message = mongoose.model('message', messageSchema);
module.exports = message;