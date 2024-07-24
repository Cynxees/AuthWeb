import { IUserRepository } from '../../entities/IUserRepository';
import { User } from '../../entities/userModel'; 
import { getMongoDB } from './mongoClient';

export class UserRepository implements IUserRepository {

    private users: User[] = [];

    async createUser(user: User): Promise<User> {
        
        const db = await getMongoDB();
        
        const result = await db.collection('users').insertOne({
            name: user.name,
            password: user.password,
        });

        return user;
    
    }

    
    async getUserByName(name: string): Promise<User | null> {
    
        const db = await getMongoDB();
        const user = await db.collection('users').findOne({ name });
        
        if (user) return new User(user.name, user.password)
        return null;
    
    }

    async deleteUserByName(name: string): Promise<boolean> {
    
        const db = await getMongoDB();
        const user = await db.collection('users').deleteOne({ name });
        
        if (user) return true
        return false;
    
    }

    async getUsers(): Promise<User[]> {

        const db = await getMongoDB();
        const usersCursor = await db.collection('users').find();
        const users = await usersCursor.toArray();
        
        return users.map(user => new User(user.name, user.password));


    }
}

export default UserRepository;
