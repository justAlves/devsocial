import React, {useState} from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

export default function Login() {
    const [login, setLogin] = useState(true);

    return login ? (
        <LoginPage login={login} setLogin={setLogin} />
    ) : (
        <RegisterPage login={login} setLogin={setLogin} />
    );
}
