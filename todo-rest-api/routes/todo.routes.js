module.exports = app => {
    const todos = require("../controllers/todo.controller.js");
    const status = require("../controllers/status.controller.js");

    app.post("/todos", todos.create);
    app.get("/todos", todos.findAll);
    app.get("/todos/unfinished", todos.findUnfinished);
    app.get("/todos/:todoId", todos.findOne);
    app.get("/status", status.findAll);
    app.put("/todos/:todoId", todos.update);
    app.delete("/todos/:todoId", todos.delete);
    app.delete("/todos", todos.deleteAll);
};