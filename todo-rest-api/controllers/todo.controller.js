const Todo = require("../models/todo.model.js");

/**
 * This function allows you to create a new Todo in the database.
 * @param req - The request associated with this function.
 * @param res - The result associated with this function.
 */
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

/**
 * This function allows you to return all the Todos from the database.
 * @param req - The request associated with this function.
 * @param res - The result associated with this function.
 */
exports.findAll = (req, res) => {
    Todo.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while getting Todos."
            });
        else res.send(data);
    });
};

/**
 * This function allows you to return a Todo from the database according to the Todo ID. 
 * @param req - The request associated with this function.
 * @param res - The result associated with this function.
 */
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

/**
 * This function allows you to update a Todo in the database from its ID.
 * @param req - The request associated with this function.
 * @param res - The result associated with this function.
 */
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

/**
 * This function allows you to delete a Todo from the database according to its ID.
 * @param req - The request associated with this function.
 * @param res - The result associated with this function.
 */
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

/**
 * This function allows you to delete all the Todos from the database.
 * @param req - The request associated with this function.
 * @param res - The result associated with this function.
 */
exports.deleteAll = (req, res) => {
    Todo.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while removing all todos."
            });
        } else res.send({ message: `All Todos was deleted successfully!` });
    });
};

/**
 * This function allows to retrieve in database the Todos which are not finished.
 * @param req - The request associated with this function.
 * @param res - The result associated with this function.
 */
exports.findUnfinished = (req, res) => {
    Todo.getUnfinished((err, data) => {
        if (err) res.status(500).send({
            message: err.message || "Some error occured while getting Todos."
        });
        else res.send(data);
    });
};

/**
 * This function allows the Todos to be retrieved from the database according to their status.
 * @param req - The request associated with this function.
 * @param res - The result associated with this function.
 */
exports.findByStatus = (req, res) => {
    Todo.getByStatus(req.params.todoStatus, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Todo with status ${req.params.todoStatus}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Todo with id " + req.params.todoStatus
                });
            }
        } else res.send(data);
    });
};