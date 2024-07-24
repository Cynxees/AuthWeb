import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useAuth } from "../hooks/useAuth";
import UserList from "../components/userList/UserList";
import { FiUsers } from "react-icons/fi";

export default function HomePage(){

    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const { logoutUser } = useAuth();

    if (!userContext) return <div>Context not found</div>


    const { user } = userContext;
    
    if(user == null){

        navigate('/');
        return <div>User Not Found</div>;

    }


    return <div className="w-screen h-screen flex flex-col gap-10">

        <div className="w-full flex flex-col">

            <div className="justify-between flex pt-10 px-24">

                <div className="text-sm">

                    Welcome Back, <span className="text-3xl">{user.name}</span>
                
                </div>

                <div>

                    <button className="py-2 px-5 bg-slate-300 border rounded-lg hover:bg-slate-700 hover:text-white" onClick={logoutUser}>Logout</button>

                </div>

            </div>

            <div className="w-[98%] mx-auto h-1 bg-neutral-400 opacity-60 mt-5"></div>
        
        </div>

        <div className="px-10 w-full">

            <div className="text-5xl mb-5 ms-2 flex gap-5"><FiUsers />Users</div>

            <UserList></UserList>
            


        </div>

    </div>



}