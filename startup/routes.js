const express = require('express');
const todos = require('../routes/todos');
const users = require('../routes/user');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = (app) => {
    app.use(express.json());
    app.use('/api/todos', todos);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}
