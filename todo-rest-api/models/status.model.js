const sql = require('./db.js');

const Status = function (status) {
    this.name = status.name;
};

/**
 * This function allows you to execute a SQL query in order to obtain the different statuses.
 * @param result - The result of the resquest.
 */
Status.getAll = result => {
    sql.query("SELECT * FROM status", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return
        }
        console.log("status: ", res);
        result(null, res);
    });
};

module.exports = Status;