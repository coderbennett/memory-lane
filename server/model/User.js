const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Timeline = require('./Timeline');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    timelines: [Timeline.schema]
});

userSchema.pre('save', async function(next) {
    return await bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;