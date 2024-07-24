import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useSpring, animated } from "react-spring";

import './RegisterForm.css';

interface LoginFormProps {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setLogin }) => {

    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ isVisible, setVisible ] = useState(false);
    const [ passwordStrength, setPasswordStrength ] = useState(0);

    
    let passwordStrengthProps = useSpring({ 
        
        width: `${passwordStrength}%`, 
        from: { width: '0%' } 
    
    });

    const { registerUser } = useAuth();
    const navigate = useNavigate();

    const validateInputs = () => {

        if (name.length < 8 || name.length > 12) {
            setError('Name must be between 8 and 12 characters.');
            return false;
        }
      
        if (password.length < 8 || password.length > 12) {
            setError('Password must be between 8 and 12 characters.');
            return false;
        }
      
        if (password.toLowerCase() === password) {

            setError('Password must contain at least one uppercase letter.');
            return false;
        
        }
      
        if (!/\d/.test(password)) {
            setError('Password must contain at least one number.');
            return false;
        }
      
        return true;

    }

    const handleSubmit = async (e: React.FormEvent) => {
        
        console.log("register pressed");
        e.preventDefault();

        if(!validateInputs()) return;

        setError('');
        
        try {

            await registerUser(name, password);
            setLogin(true);
        
        } catch (error: any) {
        
            setError(error.message);
        
        }
    
    };

    const handleChangePassword = (e : React.FormEvent<HTMLInputElement>) => {

        const value = e.currentTarget.value;
        if(value.length > 12) return;
        setPassword(value);

        let strength = 100;

        if(value.length < 8){

            strength -= (40 - value.length*5);

        }

        if(value.toLowerCase() == value){

            strength -= 30;

        }

        if(!/\d/.test(value)){

            strength -= 30;

        }
        

        setPasswordStrength(strength)
    }

    return <div className="flex flex-col mx-auto absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border-2 border-[#8697C4] bg-neutral-100 lg:p-[5vw] p-10 rounded-xl ">
        
        <div className="text-4xl mb-10 mx-auto">
            
            Join Us!

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
                <span className="text-gray-500 ms-2 text-lg">Must Consist of 8 Characters!</span>

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
                        onChange={handleChangePassword}
                        placeholder="********"
                        className="w-full p-2 rounded-md border border-[#8697C4] hover:border-sky-700"

                    />



                </div>
                <span className="text-gray-500 ms-2 text-lg">8-12 Characters, with at least 1 Uppercase and number</span>

            </div>

            <div className="flex flex-col gap-1 w-full">
                {passwordStrength > 0 && 'Password Strength'}
                <animated.div
                    style={passwordStrengthProps}
                    className={`h-2 bg-gradient-to-r rounded-md ${

                        
                        passwordStrength < 30 ? 'password-strength-red'
                        : passwordStrength < 70 ? 'password-strength-orange'
                        : 'password-strength-green'

                    }`}

                />

            </div>
            
            <div className="text-red-400">
                {error}
                
            </div>
            <button type="submit" className="p-5 rounded-md border-2 bg-slate-600 text-white hover:bg-slate-800 hover:border-blue-400 hover:text-blue-300">Register</button>
        </form>


        <div className="mt-5">

            <span>Already Have an Account? </span>
            <button className="bg-transparent text-cyan-500 hover:text-cyan-700" onClick={() => {setLogin(true)}}>Login</button>

        </div>

    </div>


}

export default LoginForm