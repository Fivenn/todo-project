const bodyParser = require('body-parser');

urlencodedParser = bodyParser.urlencoded({ extended: true });

module.exports = app => {
    const todo = require("../controllers/todo.controller.js");

    app.get('/todo', todo.getTodos);
    app.post('/todo/add', urlencodedParser, todo.addTodo);
    app.get('/todo/delete/:id', todo.deleteTodo);
};