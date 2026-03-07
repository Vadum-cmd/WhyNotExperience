"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async register(userData) {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const passwordHash = await bcrypt_1.default.hash(userData.password, 10);
        const user = await this.userRepository.create(userData, passwordHash);
        const token = this.generateToken(user);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token,
        };
    }
    async login(loginData) {
        const user = await this.userRepository.findByEmail(loginData.email);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isValid = await bcrypt_1.default.compare(loginData.password, user.passwordHash);
        if (!isValid) {
            throw new Error('Invalid credentials');
        }
        const token = this.generateToken(user);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token,
        };
    }
    async getCurrentUser(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    }
    generateToken(user) {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const secret = process.env.JWT_SECRET || 'secret';
        return jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map