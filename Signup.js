import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        await axios.post('http://localhost:5000/signup', { username, password });
        alert('회원가입이 완료되었습니다.');
    };

    return (
        <div>
            <h2>회원가입</h2>
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
            <button onClick={handleSignup}>회원가입</button>
        </div>
    );
};

export default Signup;
