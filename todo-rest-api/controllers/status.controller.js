const Status = require("../models/status.model.js");

/**
 * This function allows you to return the different statuses of the database.
 * @param req - The request associated with the function.
 * @param res - The result associated with the function.
 */
exports.findAll = (req, res) => {
    Status.getAll((err, data) => {
        if(err) res.status(500).send({
            message: err.message || "Some error occured while getting Status."
        });
        else res.send(data);
    });
}