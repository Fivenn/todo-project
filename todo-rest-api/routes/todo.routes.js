module.exports = app => {
    const todos = require("../controllers/todo.controller.js");
    const status = require("../controllers/status.controller.js");

    app.post("/todos", todos.create);
    app.get("/todos", todos.findAll);
    app.delete("/todos", todos.deleteAll);
    app.get("/todos/unfinished", todos.findUnfinished);
    app.get("/status", status.findAll);
    app.get("/todos/:todoStatus", todos.findByStatus);
    app.put("/todos/:todoId", todos.update);
    app.delete("/todos/:todoId", todos.delete);
    app.get("/todos/:todoId", todos.findOne);
};