import { IUserRepository } from '../domain/IUserRepository';
import { User, CreateUserRequest } from '../domain/User';
export declare class UserRepository implements IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(userData: CreateUserRequest, passwordHash: string): Promise<User>;
}
//# sourceMappingURL=UserRepository.d.ts.map