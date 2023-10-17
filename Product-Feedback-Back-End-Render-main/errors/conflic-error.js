const { StatusCodes } = require("http-status-codes");
const CustomErrorAPi = require("./custom-error-api");

class ConflictError extends CustomErrorAPi {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.CONFLICT;
    }
}

module.exports = ConflictError;
