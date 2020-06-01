
const { validationResult } = require("express-validator");

const hebrewErrorValidator = require('./hebrewErrorValidator');

exports.error422 = (req) => {
    const errors = validationResult(req);
    // console.log(errors);

    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.statusCode = 422;
        error.data = errors.array();

        throw error;
    }
};

exports.errorPassword401 = (isEqual) => {
    if (!isEqual) {
        const error = new Error(hebrewErrorValidator.wrongPassword401HebError);
        error.statusCode = 401;
        throw error;
    }
};

exports.error404 = (obj) => {
    if (!obj) {
        const error = new Error(hebrewErrorValidator.notFound404HebError);
        error.statusCode = 404;
        throw error;
    }
};

exports.error401auth = (token) => {
    if (!token) {
        const error = new Error(hebrewErrorValidator.notAuth404HebError);
        error.statusCode = 401;
        throw error;
    }
};

exports.error403Admin = (req) => {
    if (!req.employee.isAdmin) {
        const error = new Error(hebrewErrorValidator.notAuth401HebError);
        error.statusCode = 403;
        throw error;
    }
};
