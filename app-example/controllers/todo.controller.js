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
        axios.post('http://localhost:3000/todos/', {
            title: req.body.title,
            dateBegin: req.body.dateBegin,
            dateEnd: req.body.dateEnd,
            status: req.body.status,
            tags: req.body.tags
        }).then(function(response) {
            res.redirect('/todo');
        }).catch(function(error) {
            console.log(error);
        })
    }
};

exports.deleteTodo = (req, res) => {
    if(req.params.id != '') {
        axios.delete(`http://localhost:3000/todos/${req.params.id}`).then(function(response) {
            req.session.todolist.splice(req.params.id, 1)
        }).catch(function(error) {
            console.log(error);
        }).then(function() {
            res.redirect('/todo');
        })
    }
};