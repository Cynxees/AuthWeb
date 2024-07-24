import { IUserRepository } from '../entities/IUserRepository';
import { User } from '../entities/userModel';

export class GetUser {

    constructor(private iUserRepository: IUserRepository) {}


    async execute(name: string): Promise<User | null> {

        return await this.iUserRepository.getUserByName(name);

    }

}
