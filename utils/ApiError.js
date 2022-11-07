
//@disc this class is responsable about opration errors (errors i can predict)
class ApiError extends Error{
    constructor(message, statusCode)
    {
        super(message);
        this.statusCode = `${statusCode}`.startsWith(4) ? 'fail' : 'errror';
        this.isOperational = true;
    }
}

module.exports = ApiError; 