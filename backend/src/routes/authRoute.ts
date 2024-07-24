import { Router } from 'express';
import { CreateUser } from '../usecases/createUser';
import { GetUser } from '../usecases/getUser';
import { UserController } from '../adapters/controllers/userController';
import UserRepository from '../adapters/repositories/userRepository';
import { GetUsers } from '../usecases/getUsers';
import { DeleteUser } from '../usecases/deleteUser';

const router = Router();

const userRepository = new UserRepository();
const createUser = new CreateUser(userRepository);
const getUser = new GetUser(userRepository);
const getUsers = new GetUsers(userRepository);
const deleteUser = new DeleteUser(userRepository);

const userController = new UserController(createUser, getUser, getUsers, deleteUser);

// router.post('/createUser', (req, res) => userController.createUser(req, res));
// router.get('/users/:name', (req, res) => userController.getUser(req, res));

router.post('/register', (req, res) => {

    console.log('/register called');
    userController.createUser(req, res)

});

router.post('/login', (req, res) => {

    console.log('/login called');
    userController.loginUser(req, res)


});

router.get('/users', (req, res) => {
    
    console.log('/users called');
    userController.getUsers(req, res);

})

router.post('/delete', (req, res) => {
    
    console.log('/delete called');
    userController.deleteUserByName(req, res);

})



export default router;
