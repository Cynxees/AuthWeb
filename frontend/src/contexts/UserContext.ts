import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from '../types/User';


interface UserContextType {

    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;

}

const defaultValue : UserContextType = {
    
    user: null,
    setUser: () => null,

};

export const UserContext = createContext<UserContextType>(defaultValue);
