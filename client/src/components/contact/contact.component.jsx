import React, { useState, useContext } from 'react';
import { UserContext} from "../../context/userContext/user.context";
import './contact.styles.css';
import { API_URL } from '../../constants/constants';

const Contact = () => {

    const userCtx = useContext(UserContext)

    const [userData, setUserData] = useState({
        first_name: userCtx ? userCtx.first_name : '', 
        last_name: userCtx ? userCtx.last_name : '',
        email: userCtx ? userCtx.email : '',
        phone: userCtx ? userCtx.phone : '',
        message: '',

    })

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { 
        first_name,
        last_name,
        email,
        phone,
        message,
    } = userData;

    const handleChange = event => {
        const { value, name } = event.target;    
        setUserData({ ...userData, [name]: value });
      };
    
    const cleanForm = () => {
        setUserData({
            first_name: userCtx ? userCtx.first_name : '', 
            last_name: userCtx ? userCtx.last_name : '',
            email: userCtx ? userCtx.email : '',
            phone: userCtx ? userCtx.phone : '',
            message: '',
        })
    }
    
    const handleSubmit = event => {
        event.preventDefault();
        fetch(`${API_URL}/contact`, {//https://localhost:3001
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            phone,
            message,
          }),
        })
        .then((response) => response.json())
        .then((res) => {
          setSuccess(res.message)
          }
        ).then(cleanForm()).catch((err)=>{setError(err)})
        
    }

    return (
        <form onSubmit={handleSubmit} className="contact-container">
            <h1>CONTACTO</h1>
            <h2>Tienes alguna consulta?</h2>
            <h3>Te responderemos a la brevedad.</h3>
            { error ? <h3 style={{color: 'red', margin: '0' }}>{error}</h3> : null }
            { success ? <div className="success-message">{success}</div> : null }
            <div className="contact-inputs">
                <div style={{display: 'flex', width: '100%', justifyContent: 'space-around'}}>
                    <input 
                        className="contact-input" 
                        placeholder="Nombre" 
                        name='first_name'
                        type='text'
                        onChange={handleChange}
                        value={first_name}
                        label='Nombre'
                        required
                    />
                    <input
                        className="contact-input" 
                        placeholder="Apellido"
                        name='last_name'
                        type='text'
                        value={last_name}
                        onChange={handleChange}
                        label='Apellido'
                        required
                        />
                </div>
                <div style={{display: 'flex', width: '100%', justifyContent: 'space-around'}}>
                    <input
                        className="contact-input" 
                        placeholder="Correo Electronico"
                        name='email'
                        type='email'
                        value={email}
                        onChange={handleChange}
                        label='Email'
                        required
                        />
                    <input
                        className="contact-input" 
                        placeholder="Telefono"
                        name='phone'
                        type='text'
                        value={phone}
                        onChange={handleChange}
                        label='Telefono'
                        required
                    />
                    
                </div>
                <div style={{display: 'flex', width: '100%', justifyContent: 'space-around'}}>
                    <textarea 
                        cols="120" 
                        rows="10" 
                        maxLength="200" 
                        placeholder="Escriba su mensaje, maximo 200 caracteres" 
                        value={message} 
                        onChange={handleChange}
                        name='message'
                        >                            
                    </textarea>
                </div>
            </div>
            <button className="contact-button" type="submit">Enviar Mensaje</button>
        </form>
    )
}

export default Contact;