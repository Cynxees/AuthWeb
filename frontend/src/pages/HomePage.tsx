import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function HomePage(){

    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    if (!userContext) return <div>Context not found</div>


    const { user } = userContext;

    useEffect(() => {


        if(user == null){
    
            navigate('/');
            return;
        } 


    })


    return <div>

        Hello, {user ? user.username: ''}

    </div>



}