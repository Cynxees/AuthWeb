import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from 'realm';


interface UserContextType {

    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;

}

const defaultValue : UserContextType = {
    
    user: null,
    setUser: () => null,

};

const UserContext = createContext<UserContextType>(defaultValue);

export default UserContext;
