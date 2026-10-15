"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var restaurant_routes_1 = __importDefault(require("./routes/restaurant.routes"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use('/api/restaurants', restaurant_routes_1.default);
app.get('/api/health', function (req, res) {
    res.json({ status: 'ok' });
});
var PORT = 4000;
app.listen(PORT, function () {
    console.log('Server running on port 4000');
});
