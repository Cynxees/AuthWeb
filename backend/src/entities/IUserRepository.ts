import { User } from './userModel';

export interface IUserRepository {

    createUser(user: User): Promise<User>;
    getUserByName(name: string): Promise<User | null>;
    getUsers(): Promise<User[]>;
    deleteUserByName(name: string): Promise<boolean>;

}
