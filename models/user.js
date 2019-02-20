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

