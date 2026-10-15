"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
var jwt_1 = require("../utils/jwt");
var authenticate = function (req, res, next) {
    var _a;
    try {
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Authentication required' });
            return;
        }
        var decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
