const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');


//Validation with Joi
function validateUser(user) {
    const schema = {
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(10).max(255).required().email(),
        password: Joi.string().min(6).max(255).required()
    };
    return Joi.validate(user, schema);
}

//user schema

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30
        },
        lastName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30
        },
        email: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 255,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 1024
        },
        role: {
            type: String,
            required: true
        }
    }
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, role: this.role}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);
exports.User = User;
exports.validate = validateUser;
