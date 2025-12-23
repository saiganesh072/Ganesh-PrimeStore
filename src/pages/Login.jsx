import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(email, password)) {
            navigate('/');
        }
    };

    return (
        <div className="container" style={{ padding: '80px 15px', maxWidth: '500px' }}>
            <h2 className="text-center" style={{ marginBottom: '30px', fontWeight: 'bold' }}>Login to your account</h2>
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
                <Button variant="primary">Login</Button>
            </form>
            <div className="text-center" style={{ marginTop: '20px' }}>
                <a href="/signup" style={{ color: 'var(--color-primary)' }}>Create an account</a>
            </div>
        </div>
    );
};

export default Login;
