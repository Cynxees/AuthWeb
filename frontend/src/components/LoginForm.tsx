import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface LoginFormProps {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setLogin }) => {

    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ isVisible, setVisible ] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        
        console.log("login pressed");
        e.preventDefault();
        
        try {

            await loginUser(name, password, rememberMe);
            navigate('/home')
        
        } catch (error: any) {
        
            setError(error.message);
        
        }
    
    };

    return <div className="flex flex-col mx-auto absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border-2 border-[#8697C4] bg-neutral-100 lg:p-[5vw] p-10 rounded-xl ">
        
        <div className="text-4xl mb-10 mx-auto">
            
            Welcome!

        </div>
        <form className="flex flex-col gap-4 text-xl lg:w-[20vw] w-[60vw]" onSubmit={handleSubmit}>

            <div className="flex flex-col">

                <span className="font-medium ms-2">Username</span>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John1234"
                    className="p-2 rounded-md border border-[#8697C4] hover:border-sky-700"
                />

            </div>

            <div className="flex flex-col">

                <span className="font-medium ms-2">Password</span>

                <div className="relative">

                    {!isVisible ? <FaRegEyeSlash className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setVisible(true)}/>
                        : <FaRegEye className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setVisible(false)} />
                    }
                    <input
                        type={isVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        className="w-full p-2 rounded-md border border-[#8697C4] hover:border-sky-700"

                    />


                </div>

            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                />
                <span>Remember Me</span>
            </div>
            <div className="text-red-400">
                {error}
                
            </div>
            <button type="submit" className="p-5 rounded-md border-2 bg-slate-600 text-white hover:bg-slate-800 hover:border-blue-400 hover:text-blue-300">Sign In</button>
        </form>


        <div className="mt-5">

            <span>Don't Have an Account? </span>
            <button className="bg-transparent text-cyan-500 hover:text-cyan-700" onClick={() => {setLogin(false)}}>Register</button>

        </div>

    </div>


}

export default LoginForm