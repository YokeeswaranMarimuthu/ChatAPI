const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        userName: String,
        emailId: String,
        password: String,
        chatIds: Array,
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const user = mongoose.model('user', userSchema);
module.exports = user;