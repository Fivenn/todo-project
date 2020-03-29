const express = require('express'),
session = require('cookie-session'),
app = express();

app.use(session({ secret: 'todotopsecret' }));

app.use(function(req, res, next) {
    if(typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
});

require("./routes/todo.routes.js")(app);

app.use(function(req, res, next) {
    res.redirect('/todo');
})

app.listen(3001, () => {
    console.log("App is running on port 3001.");
});