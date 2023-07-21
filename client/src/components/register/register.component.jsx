import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext/user.context';
import './register.styles.css';
import { API_URL } from '../../constants/constants';

const Register = (props) => {

    const { successLogin } = useContext(UserContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        first_name: '', 
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        joined: '',
        phone: '',
        state: '',
    })

    const [error, setError] = useState(null)

    const { 
        first_name,
        last_name,
        email,
        password,
        confirmPassword,
        address,
        city,
        phone,
        state, 
    } = userData;

    const handleChange = event => {
        const { value, name } = event.target;
    
        setUserData({ ...userData, [name]: value });
      };
    
    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Verifica las contasenas");
            return;
          }
        try {
            fetch(`${API_URL}/auth/register`, { //https://localhost:3001
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    email,
                    password,
                    address,
                    city,
                    phone,
                    state,
                })
            })
            .then((response) => response.json())
            .then((user) => { 
                if (user._id) {
                    successLogin(user);
                    navigate('/');
                } else {
                    setError(user.error);
                }})
            .catch((err) => setError("Error al crear el usuario, intenta de nuevo"))
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="register-container">
            <h1>Bienvenido!</h1>
            <h2>Completa el formulario con tus datos</h2>
            { error ? <h4 style={{color: 'red', margin: '0' }}>{error}</h4> : null }
            <div className="register-inputs">
                <div className="register-inputs-container">
                    <input 
                        className="register-input" 
                        placeholder="Nombre" 
                        name='first_name'
                        type='text'
                        onChange={handleChange}
                        value={first_name}
                        label='Nombre'
                        required
                    />
                    <input
                        className="register-input" 
                        placeholder="Apellido"
                        name='last_name'
                        type='text'
                        value={last_name}
                        onChange={handleChange}
                        label='Apellido'
                        required
                        />
                    <input
                        className="register-input" 
                        placeholder="Telefono"
                        name='phone'
                        type='text'
                        value={phone}
                        onChange={handleChange}
                        label='Telefono'
                        required
                    />
                </div>
                <div className="register-inputs-container">
                    <input
                        className="register-input" 
                        placeholder="Correo Electronico"
                        name='email'
                        type='email'
                        value={email}
                        onChange={handleChange}
                        label='Email'
                        required
                        />
                    <input
                        className="register-input" 
                        placeholder="Contrasena"
                        name='password'
                        type='password'
                        value={password}
                        onChange={handleChange}
                        label='Contrasena'
                        required
                        />
                    <input
                        className="register-input" 
                        placeholder="Confirmar contrasena"
                        name='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        onChange={handleChange}
                        label='ConfirmarPassword'
                        required
                        />
                    
                </div>
                <div className="register-inputs-container">
                    <input
                        className="register-input" 
                        placeholder="Direccion"
                        name='address'
                        type='text'
                        value={address}
                        onChange={handleChange}
                        label='Direccion'
                        />
                    <input
                        className="register-input" 
                        placeholder="Ciudad"
                        name='city'
                        type='text'
                        value={city}
                        onChange={handleChange}
                        label='ConfirmarPassword'
                        />
                    <input
                        className="register-input" 
                        placeholder="Departamento"
                        name='state'
                        type='text'
                        value={state}
                        onChange={handleChange}
                        label='Departamento'
                        />
                </div>
            </div>
            <button className="register-button" type="submit">Crear cuenta</button>
            <h4>Si ya tienes cuenta, Inicia sesion <Link to='/signin'>aqui</Link></h4>
        </form>
    )
}

export default Register;