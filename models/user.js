const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../startup/config');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, config.jwtPrivateKey, {expiresIn: '2d'});
}

function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string()
            .min(5)
            .max(50)
            .required(),
        lastName: Joi.string()
            .min(5)
            .max(50)
            .required(),
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(5)
            .max(255)
            .required()
    });

    return schema.validate(user);
}

exports.User = mongoose.model('User', userSchema);
exports.validate = validateUser;
