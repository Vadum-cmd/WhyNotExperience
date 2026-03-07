import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { IUserRepository } from '../domain/IUserRepository';
import { CreateUserRequest, LoginRequest, UserResponse } from '../domain/User';

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async register(userData: CreateUserRequest): Promise<{ user: UserResponse; token: string }> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(userData.password, 10);
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

  async login(loginData: LoginRequest): Promise<{ user: UserResponse; token: string }> {
    const user = await this.userRepository.findByEmail(loginData.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(loginData.password, user.passwordHash);
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

  async getCurrentUser(userId: string): Promise<UserResponse> {
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

  private generateToken(user: any): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const secret = process.env.JWT_SECRET || 'secret';
    return jwt.sign(payload, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    } as SignOptions);
  }
}

