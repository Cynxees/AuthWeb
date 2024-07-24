import { IUserRepository } from '../entities/IUserRepository';
import { User } from '../entities/userModel';

export class CreateUser {
    
    constructor(private iUserRepository: IUserRepository) {}

    async execute(data: { name: string, password: string }): Promise<User> {

        const user = new User(data.name, data.password);

        
        return await this.iUserRepository.createUser(user);
    
    }

}
