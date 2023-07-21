import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signin.styles.css';
import { API_URL } from '../../constants/constants';

import { UserContext } from '../../context/userContext/user.context';

const SignIn = (props) => {
    const navigate = useNavigate();
    const userCtx = useContext(UserContext)

    const [userCredentials, setCredentials ] = useState({ email: '', password: '' })
    const [error, setError] = useState(null); 
    const { email, password } = userCredentials;

    const handleChange = event => {
        const { value, name } = event.target;
    
        setCredentials({ ...userCredentials, [name]: value });
      };
    
    const handleSubmit = async event => {
        event.preventDefault();
        fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email, password
            })
        })
        .then((response) => response.json())
        .then((res) => {
            if (res.accessToken) {
                userCtx.successLogin(res.others);
                localStorage.setItem('accessToken', res.accessToken);
                navigate('/');
            } else {
             setError(res.error)
            }})
        .catch((err) => setError(err))
    };

    return (
        <form onSubmit={handleSubmit} className="signin-container">
            <h1>Bienvenido nuevamente!</h1>
            <h3>Ingresa tu usuario y contraseña</h3>
            <div className="signin-inputs">
                <input 
                    className="signin-input" 
                    placeholder="email" 
                    name='email'
                    type='email'
                    onChange={handleChange}
                    value={email}
                    label='email'
                    required
                />
                <input
                    className="signin-input"
                    placeholder="contraseña"
                    name='password'
                    type='password'
                    value={password}
                    onChange={handleChange}
                    label='password'
                    required
                    />
            </div>
            { error ? <h4 style={{color: 'red', margin: '0' }}>{error}</h4> : null }
            <button className="sign-in-button" type="submit">Iniciar Sesion</button>
            <h4>Si no tienes cuenta registrada aun, <Link to='/register'>registrate aqui</Link></h4>
        </form>
    )
}

export default SignIn;
