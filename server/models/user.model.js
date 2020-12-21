const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

userSchema.index({ 'email': 1}, {uniqe: true})
userSchema.index({ 'username': 1}, {uniqe: true})
module.exports = model('User', userSchema)