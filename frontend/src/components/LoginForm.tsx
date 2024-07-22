import { useState } from "react";

interface LoginFormProps {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setLogin }) => {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

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
    
    };

    return <div>
        
        
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
        </form>


        <button onClick={() => {setLogin(false)}}>Register</button>

    </div>


}

export default LoginForm