/**
 * Represent a status from a JSON file.
 * @constructor
 * @param status - The JSON file of a status.
 */
const Status = function (status) {
    this.name = status.name;
};

module.exports = Status;