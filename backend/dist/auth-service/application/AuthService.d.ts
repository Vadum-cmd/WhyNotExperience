import { IUserRepository } from '../domain/IUserRepository';
import { CreateUserRequest, LoginRequest, UserResponse } from '../domain/User';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: IUserRepository);
    register(userData: CreateUserRequest): Promise<{
        user: UserResponse;
        token: string;
    }>;
    login(loginData: LoginRequest): Promise<{
        user: UserResponse;
        token: string;
    }>;
    getCurrentUser(userId: string): Promise<UserResponse>;
    private generateToken;
}
//# sourceMappingURL=AuthService.d.ts.map