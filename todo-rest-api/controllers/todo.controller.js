const Todo = require("../models/todo.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const todo = new Todo({
        title: req.body.title,
        dateBegin: req.body.dateBegin,
        dateEnd: req.body.dateEnd,
        status: req.body.status,
        tags: req.body.tags
    });
    Todo.create(todo, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while creating the Todo."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Todo.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while getting Todos."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Todo.findById(req.params.todoId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Todo with id ${req.params.todoId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Todo with id " + req.params.todoId
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }
    Todo.updateById(
        req.params.todoId,
        new Todo(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Todo with id ${req.params.todoId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Todo with id " + req.params.todoId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Todo.remove(req.params.todoId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Todo with id ${req.params.todoId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Todo with id " + req.params.todoId
                });
            }
        } else res.send({ message: `Todo was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Todo.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while removing all todos."
            });
        } else res.send({ message: `All Todos was deleted successfully!` });
    });
};