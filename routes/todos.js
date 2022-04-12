const express = require('express');
const {Todo, validate} = require('../models/todo');
const {User} = require('../models/user');
const auth = require('../middleware/auth');
const _ = require('lodash');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    const todos = await Todo.find({
        userId: req.user._id
    }).sort('-updatedAt').select('-__v');
    res.send(todos);
});

router.get('/:id', auth, async (req, res) => {
    const todo = await Todo.findOne({
        userId: req.user._id,
        _id: req.params.id
    }).select('-__v');

    if (!todo) return res.status(404).send('Todo not found');

    res.send(todo);
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send('User does not exist');

    let todo = new Todo({...req.body, userId: req.user._id});
    todo = await todo.save();

    res.send(_.omit(todo, '__v'));
})

router.patch('/:id', auth, async (req, res) => {
    const todo = await Todo.findById(req.params.id).select('-__v');
    if (!todo) return res.status(404).send('Todo not found');

    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send('User does not exist');

    _.assign(todo, req.body);
    todo.updatedAt = Date.now();

    await Todo.updateOne({_id: req.params.id}, todo);
    res.send(todo);
})

router.delete('/:id', auth, async (req, res) => {
    const todo = await Todo.findOne({
        userId: req.user._id,
        _id: req.params.id
    }).select('-__v');
    if (!todo) return res.status(404).send('Todo not found');
    await Todo.deleteOne({_id: req.params.id});
    res.send(todo);
})

module.exports = router;

