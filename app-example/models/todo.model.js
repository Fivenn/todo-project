/**
 * Represent a todo from a JSON file.
 * @constructor
 * @param todo - The JSON file of a Todo.
 */
const Todo = function (todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.dateBegin = todo.dateBegin;
    this.dateEnd = todo.dateEnd;
    this.status = todo.status;
    this.tags = todo.tags;
};

module.exports = Todo;