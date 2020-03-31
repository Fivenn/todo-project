const sql = require('./db.js');

const Status = function(status) {
    this.name = status.name;
};

Status.getAll = result => {
    sql.query("SELECT * FROM status", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return
        }
        console.log("status: ", res);
        result(null, res);
    });
};

module.exports = Status;