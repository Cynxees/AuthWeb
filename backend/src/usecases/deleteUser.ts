import { IUserRepository } from '../entities/IUserRepository';
import { User } from '../entities/userModel';

export class DeleteUser {

    constructor(private iUserRepository: IUserRepository) {}


    async execute(name: string): Promise<boolean> {

        return await this.iUserRepository.deleteUserByName(name);

    }

}
