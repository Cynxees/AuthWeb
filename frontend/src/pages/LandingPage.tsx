import { useContext, useEffect, useState } from "react";
import { fetchData } from "../services/api"
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import UserContext from "../contexts/UserContext";

export default function LandingPage(){

    const [isLogin, setLogin] = useState(true);
    

    return <div className="">

        {isLogin ? <LoginForm setLogin={setLogin} /> : <RegisterForm setLogin={setLogin}/> }        
        
    </div>





};