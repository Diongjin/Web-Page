import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await axios.post('http://localhost:5000/login', { username, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            onLogin(true);
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="아이디"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
            />
            <button onClick={handleLogin}>로그인</button>
        </div>
    );
};

export default Login;
