const Status = require("../models/status.model.js");

exports.findAll = (req, res) => {
    Status.getAll((err, data) => {
        if(err) res.status(500).send({
            message: err.message || "Some error occured while getting Status."
        });
        else res.send(data);
    });
}