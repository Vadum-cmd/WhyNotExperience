"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const AuthService_1 = require("./application/AuthService");
const UserRepository_1 = require("./infrastructure/UserRepository");
const auth_1 = require("../shared/middleware/auth");
const router = (0, express_1.Router)();
exports.authRouter = router;
const authService = new AuthService_1.AuthService(new UserRepository_1.UserRepository());
router.post('/register', async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
router.get('/me', auth_1.authenticate, async (req, res) => {
    try {
        const user = await authService.getCurrentUser(req.user.id);
        res.json(user);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
//# sourceMappingURL=routes.js.map