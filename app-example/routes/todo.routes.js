module.exports = app => {
    const todo = require("../controllers/todo.controller.js"),
    editTodo = require("../controllers/todo.edit.controller.js"),
    bodyParser = require('body-parser'),
    urlencodedParser = bodyParser.urlencoded({ extended: true });

    app.get('/todo', todo.getTodos);
    app.post('/todo/add', urlencodedParser, todo.addTodo);
    app.get('/todo/unfinished', todo.getUnfinishedTodos);
    app.get('/todo/delete/:id', todo.deleteTodo);
    app.get('/todo/edit/:id', editTodo.getTodo);
    app.post('/todo/update/:id', urlencodedParser, editTodo.updateTodo);
    app.post('/todo/status', urlencodedParser, todo.getByStatus);
};