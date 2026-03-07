import { User, CreateUserRequest } from './User';
export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(userData: CreateUserRequest, passwordHash: string): Promise<User>;
}
//# sourceMappingURL=IUserRepository.d.ts.map