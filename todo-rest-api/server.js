const express = require('express'),
    bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: "Welcome to todo-api-rest server" });
});

require("./routes/todo.routes.js")(app);

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});