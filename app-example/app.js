const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Todo app" });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001.");
});