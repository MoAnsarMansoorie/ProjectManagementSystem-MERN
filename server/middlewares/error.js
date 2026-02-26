class ErrorHandler extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statuscode = statuscode;
    };
};

export const errorMiddleware = (err, req, res, next) => {
    const statuscode = err.statuscode || 500;
    const message = err.message || "Internal Server Error";
    
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    };

    if(err.name === "JsonWebTokenError") {
        const message = `Invalid or expired token`;
        err = new ErrorHandler(message, 400);
    };

    if(err.name === "TokenExpiredError") {
        const message = `Token expired, please login again`;
        err = new ErrorHandler(message, 400);
    };

    if(err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    };

    const errorMessages = err.errors ? Object.values(err.errors).map((val) => val.message).join(", ") : [message];

    res.status(statuscode).json({
        success: false,
        message: errorMessages
    });
};

export default ErrorHandler;