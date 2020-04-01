const axios = require('axios'),
    Todo = require('../models/todo.model.js'),
    Status = require('../models/status.model.js');

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

exports.getUnfinishedTodos = (req, res) => {
};