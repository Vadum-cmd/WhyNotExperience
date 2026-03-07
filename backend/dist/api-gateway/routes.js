"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiGatewayRouter = void 0;
const express_1 = require("express");
const routes_1 = require("../auth-service/routes");
const routes_2 = require("../boat-service/routes");
const routes_3 = require("../booking-service/routes");
exports.apiGatewayRouter = (0, express_1.Router)();
// Route to different services
exports.apiGatewayRouter.use('/auth', routes_1.authRouter);
exports.apiGatewayRouter.use('/boats', routes_2.boatRouter);
exports.apiGatewayRouter.use('/bookings', routes_3.bookingRouter);
//# sourceMappingURL=routes.js.map