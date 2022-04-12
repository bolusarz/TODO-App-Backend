const Joi = require('joi');
const mongoose = require('mongoose');

const Importance = {
    LOW: -1,
    DEFAULT: 0,
    HIGH: 1
};

const todoItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
        trim: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    importance: {
        type: Number,
        default: Importance.DEFAULT,
        enum: [Importance.DEFAULT, Importance.LOW, Importance.HIGH]
    },
});

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255
    },
    description: {
        type: String,
        maxLength: 255,
        trim: true,
        default: ''
    },

    items: {
        type: [todoItemSchema],
        default: []
    },
    dueDate: {
        type: Date,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

function validateTodo(todo) {
    const schema = Joi.object({
        title: Joi.string().min(4).max(255).required(),
        description: Joi.string().min(4).max(255).optional(),
        items: Joi.array().items(Joi.object({
            title: Joi.string().min(4).max(255).required(),
            importance: Joi.number().valid(Importance.DEFAULT, Importance.LOW, Importance.HIGH).optional()
        }))
    });

    return schema.validate(todo);
}

exports.Todo = mongoose.model('Todo', todoSchema);
exports.validate = validateTodo;
