import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (signup(email, password)) {
            navigate('/');
        }
    };

    return (
        <div className="container" style={{ padding: '80px 15px', maxWidth: '500px' }}>
            <h2 className="text-center" style={{ marginBottom: '30px', fontWeight: 'bold' }}>Create an Account</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '12px', border: '1px solid #e6e6e6', borderRadius: '4px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '12px', border: '1px solid #e6e6e6', borderRadius: '4px' }}
                />
                <Button variant="primary">Sign Up</Button>
            </form>
            <div className="text-center" style={{ marginTop: '20px' }}>
                <a href="/login" style={{ color: 'var(--color-primary)' }}>Already have an account? Login</a>
            </div>
        </div>
    );
};

export default Signup;
