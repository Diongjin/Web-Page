import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [itemName, setItemName] = useState("");

    // 용품 등록 처리
    const handleAddItem = () => {
        if (!isAuthenticated) {
            alert('로그인 후 용품을 등록하세요.');
            return;
        }
        if (!itemName) {
            alert('용품 이름을 입력하세요.');
            return;
        }
        axios.post('http://localhost:5000/add-item', { name: itemName, token: localStorage.getItem('token') })
            .then(() => {
                setItems([...items, itemName]);
                setItemName('');
            });
    };

    // 용품 검색 처리
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredItems = items.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <Router>
            <div className="app">
                <nav>
                    <ul>
                        <li><Link to="/">홈</Link></li>
                        <li><Link to="/add-item">용품 등록</Link></li>
                        <li><Link to="/search-items">용품 검색</Link></li>
                        <li><Link to="/login">로그인</Link></li>
                        <li><Link to="/signup">회원가입</Link></li>
                        {isAuthenticated && <li><button onClick={() => { localStorage.removeItem('token'); setIsAuthenticated(false); }}>로그아웃</button></li>}
                    </ul>
                </nav>

                <Switch>
                    <Route path="/" exact>
                        <h1>운동 용품 대여 플랫폼</h1>
                        <h2>등록된 운동 용품</h2>
                        <ul>
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item, index) => <li key={index}>{item}</li>)
                            ) : (
                                <p>등록된 운동 용품이 없습니다.</p>
                            )}
                        </ul>
                    </Route>
                    <Route path="/add-item">
                        {isAuthenticated ? (
                            <div>
                                <h1>용품 등록</h1>
                                <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="용품 이름" />
                                <button onClick={handleAddItem}>등록</button>
                            </div>
                        ) : (
                            <p>로그인 후 용품을 등록할 수 있습니다.</p>
                        )}
                    </Route>
                    <Route path="/search-items">
                        <div>
                            <h1>용품 검색</h1>
                            <input type="text" value={searchQuery} onChange={handleSearch} placeholder="검색어 입력" />
                            <ul>
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item, index) => <li key={index}>{item}</li>)
                                ) : (
                                    <p>검색된 용품이 없습니다.</p>
                                )}
                            </ul>
                        </div>
                    </Route>
                    <Route path="/login">
                        <Login onLogin={setIsAuthenticated} />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
