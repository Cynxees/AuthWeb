import { IUserRepository } from '../entities/IUserRepository';
import { User } from '../entities/userModel';

export class GetUsers {

    constructor(private iUserRepository: IUserRepository) {}


    async execute(): Promise<User[]> {

        return await this.iUserRepository.getUsers();

    }

}
