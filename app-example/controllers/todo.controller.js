const axios = require('axios'),
Todo = require('../models/todo.model.js');

exports.getTodos = (req, res) => {
    req.session.todolist = [];
    axios.get('http://localhost:3000/todos/').then(function(response) {
        response.data.forEach(element => {
            const todo = new Todo(element);
            req.session.todolist.push(todo);
        });
    }).catch(function(error) {
        console.log(error);
    }).then(function() {
        res.render('todo.ejs', { todolist: req.session.todolist });
    })
};

exports.addTodo = (req, res) => {
    if(req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
};

exports.deleteTodo = (req, res) => {
    if(req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
};