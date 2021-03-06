const axios = require('axios'),
    Todo = require('../models/todo.model.js'),
    Status = require('../models/status.model.js');

/**
 * This function allows to generate the editing page of a todo with its information in the request.
 * @param req - The request associated with this function.
 * @param res - The result associated with the function.
 */
exports.getTodo = (req, res) => {
    req.session.statuslist = [];
    axios.get(`http://localhost:3000/todos/${req.params.id}`).then(function (response) {
        const todo = new Todo(response.data);
        req.session.todo = todo;
        return axios.get('http://localhost:3000/status/');
    }).then(function (response) {
        response.data.forEach(element => {
            const status = new Status(element);
            req.session.statuslist.push(status);
        });
    }).catch(function (error) {
        console.log(error);
    }).then(function () {
        res.render('todo_edit.ejs', {
            todo: req.session.todo,
            statuslist: req.session.statuslist
        });
    })
};

/**
 * This function allows to update a todo from its information in the request.
 * @param req - The request associated with this function.
 * @param res - The result associated with the function.
 */
exports.updateTodo = (req, res) => {
    if (req.body.newTodo != '' && req.params.id != '') {
        axios.put(`http://localhost:3000/todos/${req.params.id}`, {
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