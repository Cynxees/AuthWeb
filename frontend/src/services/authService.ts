import { User } from "../types/User";

const API_URL = '/api/auth';

export const login = async (name: string, password: string) => {

    const response = await fetch(`${API_URL}/login`, {
        
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password })
    
    });

    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
        
        console.error(response.json);
        const error = responseData.error || 'An error occurred during login';
        throw new Error(error);
    
    }

    return responseData;

};

export const register = async (name: string, password: string) => {
    
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify({ name, password }),
    });

    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
        
        console.error(response.json);
        const error = responseData.error || 'An error occurred during login';
        throw new Error(error);
    
    }

    return await responseData;

};

export const getUsers = async(): Promise<User[]>=> {


    const response = await fetch(`${API_URL}/users`, {

        method: 'GET'
        
    });

    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
        
        console.error(response.json);
        const error = responseData.error || 'Error fetching all users';
        throw new Error(error);
    
    }

    return responseData as User[];

}

export const deleteUser =  async(name: string): Promise<boolean> => {


    const response = await fetch(`${API_URL}/delete`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify({ name }),
    });

    
    const responseData = await response.json();
    console.log(responseData);

    if(!response.ok){

        const error = responseData.error || 'Error delete users';
        throw new Error(error);

    }

    return true;

}