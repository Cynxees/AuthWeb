import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setLogin }) => {

    const [formData, setFormData] = useState({
    
        username: "",
        password: ""
    
    });

    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    if (!userContext) return <div>Context not found</div>


    const { setUser } = userContext;

    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const { name, value } = e.target;
        
        setFormData((prevData) => ({
        
            ...prevData,
            [name]: value,
        
        }));
    
    };

    const handleSubmit = async (e: React.FormEvent) => {
        
        console.log("login pressed");
        e.preventDefault();

        if(formData.username == ""){

            setError("Username is required");
            return;

        }

        if(formData.password == ""){

            setError("Password is required");
            return;

        }

        try {

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Invalid login');
            }

            const data = await response.json();
            console.log(data);
            setUser(data);
            navigate('/home');
        
        } catch (error: any) {
        
            setError(error.message);
        
        }
    
    };

    return <div className="flex flex-col">
        
        <div className="text-3xl mb-5">
            
            Login Form
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />

            </div>
            
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </div>
            <div className="text-red-400">
                
                {error}
                
            </div>
            <button type="submit">Login</button>
        </form>


        <button className="bg-transparent text-cyan-400" onClick={() => {setLogin(false)}}>Register</button>

    </div>


}

export default LoginForm