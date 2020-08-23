import React, {useMemo, useState} from 'react';
import './App.css';
import Layout from "./components/Layout/Layout";
import {AuthContext} from "./Context/auth";

function App() {
    const defaultUser = localStorage.getItem('user');
    const [user, setUser] = useState(defaultUser)
    const value = useMemo(() => ({user, setUser}), [user, setUser])
    return (
        <AuthContext.Provider value={value}>
                <Layout/>
        </AuthContext.Provider>
    );
}

export default App;
