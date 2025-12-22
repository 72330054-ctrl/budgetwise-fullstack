import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { Link } from 'react-router-dom';
import API_URL from "../api"; 
// ${API_URL}
function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${API_URL}/users`, {
                email,
                password
            });

            alert("Account created successfully!");
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("Signup failed");
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h2 className="login-title">Create Account</h2>
                <p className="login-subtitle">Sign up to get started</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required
                    />

                    <button type="submit" className="login-btn">Sign Up</button>
                </form>

                <p className="login-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default SignupForm;
