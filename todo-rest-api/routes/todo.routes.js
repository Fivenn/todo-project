module.exports = app => {
    const todos = require("../controllers/todo.controller.js");

    app.post("/todos", todos.create);
    app.get("/todos", todos.findAll);
    app.get("/todos/:todoId", todos.findOne);
    app.put("/todos/:todoId", todos.update);
    app.delete("/todos/:todoId", todos.delete);
    app.delete("/todos", todos.deleteAll);
};