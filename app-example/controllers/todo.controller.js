const axios = require('axios'),
    Todo = require('../models/todo.model.js'),
    Status = require('../models/status.model.js');

/**
 * This function allows you to generate the todo home page with a todo creation interface on top.
 * @param req - The request associated with this function.
 * @param res - The result associated with the function.
 */
exports.getTodos = (req, res) => {
    req.session.todolist = [];
    req.session.statuslist = [];
    axios.get('http://localhost:3000/todos/').then(function (response) {
        response.data.forEach(element => {
            const todo = new Todo(element);
            req.session.todolist.push(todo);
        });
        return axios.get('http://localhost:3000/status/');
    }).then(function (response) {
        response.data.forEach(element => {
            const status = new Status(element);
            req.session.statuslist.push(status);
        });
    }).catch(function (error) {
        console.log(error);
    }).then(function () {
        res.render('todo.ejs', {
            todolist: req.session.todolist,
            statuslist: req.session.statuslist
        });
    })
};

/**
 * This function allows you to create a todo from the information in the request.
 * @param req - The request associated with this function.
 * @param res - The result associated with the function.
 */
exports.addTodo = (req, res) => {
    if (req.body.newtodo != '') {
        axios.post('http://localhost:3000/todos/', {
            title: req.body.title,
            dateBegin: req.body.dateBegin,
            dateEnd: req.body.dateEnd,
            status: req.body.status,
            tags: req.body.tags
        }).catch(function (error) {
            console.log(error);
        }).then(function (response) {
            res.redirect('/todo');
        })
    }
};

/**
 * This function allows you to remove a todo from the list according to its ID in the request.
 * @param req - The request associated with this function.
 * @param res - The result associated with the function.
 */
exports.deleteTodo = (req, res) => {
    if (req.params.id != '') {
        axios.delete(`http://localhost:3000/todos/${req.params.id}`).then(function (response) {
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            res.redirect('/todo');
        })
    }
};