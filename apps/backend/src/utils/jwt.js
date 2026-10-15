"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-local-dev';
var generateToken = function (userId, role) {
    return jsonwebtoken_1.default.sign({ id: userId, role: role }, JWT_SECRET, { expiresIn: '7d' });
};
exports.generateToken = generateToken;
var verifyToken = function (token) {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
};
exports.verifyToken = verifyToken;
