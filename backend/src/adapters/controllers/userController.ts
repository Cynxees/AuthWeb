import { Request, Response } from 'express';
import { CreateUser } from '../../usecases/createUser';
import { GetUser } from '../../usecases/getUser';
import { GetUsers } from '../../usecases/getUsers';
import { DeleteUser } from '../../usecases/deleteUser';

export class UserController {
    
    constructor(

        private createUserUseCase: CreateUser,
        private getUserUseCase: GetUser,
        private getUsersUseCase: GetUsers,
        private deleteUserUseCase: DeleteUser
    
    ) {}

    
    async createUser(req: Request, res: Response): Promise<Response> {
        
        const { name, password } = req.body;
        console.log('creating user with name: ', name, ', password: ', password);
        
        try {
            
            
            const tempUser = await this.getUserUseCase.execute(name);

            if(tempUser) throw new Error('User Already Exists');

            const user = await this.createUserUseCase.execute({ name, password });
            
            return res.status(201).json(user);
        
        } catch (error) {
        

            if (error instanceof Error) {

                return res.status(400).json({ error: error.message });
            }

            return res.status(400).json({ error : 'Error Creating User'})
    
        }
    
    }

    async loginUser(req: Request, res: Response): Promise<Response> {

        const { name, password } = req.body;
        console.log('login with name: ', name, ', password: ', password);

        try {
            
            const user = await this.getUserUseCase.execute(name);
            
            if(!user) throw new Error('User Not Found!');

            if (user.password === password) {
            
                return res.status(200).json({name: name});
            
            }

            throw new Error('Wrong Password!');

        } catch (error) {
            
            if (error instanceof Error) {

                return res.status(400).json({ error: error.message });
            }

            return res.status(400).json({ error : 'Error Login User'})
        
        }

    }


    async getUser(req: Request, res: Response): Promise<Response> {
    
        const { name } = req.params;
        try {
            
            const user = await this.getUserUseCase.execute(name);
            
            if (user) {
            
                return res.status(200).json(user);
            
            } else {
            
                return res.status(404).json({ error: 'User not found' });
            }

        } catch (error) {
            
            if (error instanceof Error) {

                return res.status(400).json({ error: error.message });
            }

            return res.status(400).json({ error : 'Error Logging In User'})
        
        }
    }

    async getUsers(req: Request, res: Response): Promise<Response> {

        try{

            const users = await this.getUsersUseCase.execute();
            return res.status(200).json(users);

        }catch (error){
            
            if (error instanceof Error) {
                
                return res.status(400).json({ error: error.message });
            
            }


            return res.status(400).json({ error: 'Error fetching users' });

        }


    }

    async deleteUserByName(req: Request, res: Response): Promise<Response> {

        const { name } = req.body;

        try{

            const result = await this.deleteUserUseCase.execute(name);

            if(!result) throw new Error();
            
            return res.status(200).json({result: result});

        }catch(error){

            return res.status(400).json({error: 'Error Deleting User'});


        }


    }

    
}
