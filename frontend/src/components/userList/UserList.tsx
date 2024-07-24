import { useEffect, useState } from 'react';
import { deleteUser, getUsers } from '../../services/authService';
import { User } from '../../types/User';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useAuth } from '../../hooks/useAuth';

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    const { user: currentUser, logoutUser } = useAuth();

    useEffect(() => {

        const fetchUsers = async () => {
        
            try {
            
                const users = await getUsers();
                setUsers(users);
                setLoading(false);
            
            } catch (error: any) {
            
                setError(error.message);
                setLoading(false);
            
            }
        
        };

        fetchUsers();
    
    }, []);

    const handleDelete = async (name : string) => {


        console.log('Deleting ', name);

        try{

            const result = await deleteUser(name);

            if(!result) throw new Error('Failed to Delete : ' + name);
            
            if(name == currentUser?.name){

                logoutUser();
                return;

            }

            setUsers(users.filter(user => user.name !== name));
            setErrorMessage(null)
            setSuccessMessage('Successfully deleted ' + name);
            

        }catch (error: any) {

            setErrorMessage(error);
            setSuccessMessage(null);


        }




    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    

    return (
    
        <div className='w-full'>

            <table className='w-full border-stone-500 rounded-lg border'>

                <thead className='bg-slate-900 text-white'>
                    <tr className=''>
                        <th  className='p-6 w-[40%]'>Username</th>
                        <th  className='p-6 w-[40%]'>Password</th>
                        <th  className='p-6 w-[20%]'>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {users.map(user => (

                        <tr className='text-center bg-neutral-200 border-stone-500 rounded-lg border' key={user.name}>
                            
                            <td  className='py-5 border border-y-slate-500 border-l-slate-500'>

                                {user.name}
                                {currentUser && currentUser.name == user.name &&

                                    <span className='mx-2 font-extrabold text-white absolute bg-blue-700 hover:bg-blue-400 cursor-default p-1 rounded-md'>You</span>
                            
                                }

                            </td>
                            
                            <td  className='border-y-slate-500 border'>
                                
                                <span className='p-5 blur-[2px] hover:blur-none cursor-default'>
                                    {user.password}
                                </span>
                            </td>

                            <td  className='border-y-slate-500 border border-r-slate-500'>
                                <FaRegTrashCan className='mx-auto cursor-pointer hover:text-red-400 text-xl' onClick={() => handleDelete(user.name)} />
                            </td>
                        </tr>
                    
                    
                    ))}

                </tbody>
                
            </table>
            <span className='text-red-600 text-xl'>
                {errorMessage}
            </span>
            <span className='text-green-600 text-xl'>
                {successMessage}
            </span>
        </div>
    );

};

export default UserList;
