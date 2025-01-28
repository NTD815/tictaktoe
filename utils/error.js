const error = (msg, statusCode) => {
    const err = new Error(msg);
    err.status = statusCode;
    throw err;
}

export default error;