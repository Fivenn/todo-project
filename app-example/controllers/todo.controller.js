exports.getTodos = (req, res) => {
    res.render('todo.ejs', { todolist: req.session.todolist });
};

exports.addTodo = (req, res) => {
    if(req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
};

exports.deleteTodo = (req, res) => {
    if(req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
};