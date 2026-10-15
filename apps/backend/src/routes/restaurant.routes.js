"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var restaurant_controller_1 = require("../controllers/restaurant.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var router = (0, express_1.Router)();
router.get('/', restaurant_controller_1.getRestaurants);
router.post('/', auth_middleware_1.authenticate, restaurant_controller_1.createRestaurant);
exports.default = router;
