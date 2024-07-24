import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function LandingPage(){

    const [isLogin, setLogin] = useState(true);
    

    return <div className="h-screen w-screen">

        {isLogin ? <LoginForm setLogin={setLogin} /> : <RegisterForm setLogin={setLogin}/> }        
        
    </div>





};