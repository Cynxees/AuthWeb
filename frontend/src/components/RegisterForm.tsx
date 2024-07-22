import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setLogin }) => {

    const [formData, setFormData] = useState({
    
        username: "",
        password: ""
    
    });

    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const { name, value } = e.target;
        
        setFormData((prevData) => ({
        
            ...prevData,
            [name]: value,
        
        }));
    
    };

    const handleSubmit = async (e: React.FormEvent) => {
        
        console.log("Register pressed");
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

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Invalid Register');
            }

            const data = await response.json();
            console.log(data);
            setLogin(true);
            
        
        } catch (error: any) {
        
            setError(error.message);
        
        }
    
    };

    return <div className="flex flex-col">
        
        <div className="text-3xl mb-5">
            
            Register Form
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
            <button type="submit">Register</button>
        </form>


        <button className="bg-transparent text-cyan-400" onClick={() => {setLogin(true)}}>Login</button>

    </div>


}

export default RegisterForm