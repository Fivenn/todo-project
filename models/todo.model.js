const sql = require('./db.js');

const Todo = function (todo) {
    this.title = todo.title;
    this.dateBegin = todo.dateBegin;
    this.dateEnd = todo.dateEnd;
    this.status = todo.status;
    this.tags = todo.tags;
};

Todo.create = (newTodo, result) => {
    sql.query("INSERT INTO todos SET ?", newTodo, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tod: ", { id: res.insertId, ...newTodo });
        result(null, { id: res.insertId, ...newTodo });
    });
};

Todo.findById = (todoId, result) => {
    sql.query(`SELECT * FROM todos WHERE id = ${todoId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found todo: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Todo.getAll = result => {
    sql.query("SELECT * FROM todos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("todos: ", res);
        result(null, res);
    });
};

Todo.updateById = (id, todo, result) => {
    sql.query(
        "UPDATE todos SET title = ?, dateBegin = ?, dateEnd = ?, status = ?, tags = ? WHERE id = ?",
        [todo.title, todo.dateBegin, todo.dateEnd, todo.status, todo.tags, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated todo: ", { id: id, ...todo });
            result(null, { id: id, ...todo });
        }
    );
};

Todo.remove = (id, result) => {
    sql.query("DELETE FROM todos WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted todo with id: ", id);
        result(null, res);
    });
};

Todo.removeAll = result => {
    sql.query("DELETE FROM todos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} todos`);
        result(null, res);
    });
};

module.exports = Todo;