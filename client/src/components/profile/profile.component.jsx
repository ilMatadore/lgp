import React, { useState, useContext, useEffect } from 'react';
import './profile.styles.css';
import { API_URL } from '../../constants/constants';

import { UserContext } from '../../context/userContext/user.context'

const Profile = () => {

    const userCtx = useContext(UserContext);
    console.log({userCtx})
    
    const [userProfileData, setUserProfileData] = useState({
        first_name: userCtx.first_name, 
        last_name: userCtx.last_name,
        email: userCtx.email,
        address: userCtx.address,
        city: userCtx.city,
        phone: userCtx.phone,
        state: userCtx.state,
    })
    
    const [error, setError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null);
    const [pastOrders, setPastOrders] = useState(null);

    useEffect(()=> {
        const getPastOrders = () => {
            fetch(`${API_URL}/orders/${userCtx.id}`, {//https://localhost:3001
                method: 'get',
                headers: { "Content-Type": "application/json"},
            })
            .then((response) => response.json())
            .then((pastOrders)=> pastOrders.length ? setPastOrders(pastOrders) : setPastOrders(null))
            .catch((err)=> console.log(err))
        }
        if (userCtx.id) {
            getPastOrders()
        }
    },[userCtx.id])

    const { 
        first_name,
        last_name,
        email,
        address,
        city,
        phone,
        state, 
    } = userProfileData;

    const handleChange = event => {
        const { value, name } = event.target;
        setUserProfileData({ ...userProfileData, [name]: value });
      };
    
    const handleSubmit = async event => {
        event.preventDefault();

            fetch(`${API_URL}/profile/${userCtx.id}`, {//https://localhost:3001
                method: 'put',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    first_name,
                    last_name,
                    email,
                    address,
                    city,
                    phone,
                    state,
                })
            })
            .then((response) => response.json())
            .then((res) => {if (res.id) {
                userCtx.updateProfile(res);
                setUpdateSuccess(res.id);
                } else {
                    setError("Error al actualizar datos")
                }} )
            .catch((err) => setError("Error al actualizar datos, intenta de nuevo"))
    }

    

    return (
        <div>
        <form onSubmit={handleSubmit} className="profile-container">
            <h1>Mis Datos</h1>
            <h3>Actualize sus datos si es necesario</h3>
            { updateSuccess ? <h4 style={{color: 'green', margin: '0' }}>Cambios guardados con exito!</h4> : null}
            { error ? <h4 style={{color: 'red', margin: '0' }}>{error}</h4> : null }
            <div className="profile-inputs">
                <div className="profile-inputs-container">
                    <input 
                        className="profile-input" 
                        placeholder="Nombre" 
                        name='first_name'
                        type='text'
                        onChange={handleChange}
                        value={first_name}
                        label='Nombre'
                        required
                    />
                    <input
                        className="profile-input" 
                        placeholder="Apellido"
                        name='last_name'
                        type='text'
                        value={last_name}
                        onChange={handleChange}
                        label='Apellido'
                        required
                        />
                    <input
                        className="profile-input" 
                        placeholder="Telefono"
                        name='phone'
                        type='text'
                        value={phone}
                        onChange={handleChange}
                        label='Telefono'
                        required
                    />
                </div>
                <div className="profile-inputs-container">
                    <input
                        className="profile-input" 
                        placeholder="Correo Electronico"
                        name='email'
                        type='email'
                        value={email}
                        onChange={handleChange}
                        label='Email'
                        disabled
                        />
                    
                    
                </div>
                <div className="profile-inputs-container">
                    <input
                        className="profile-input" 
                        placeholder="Direccion"
                        name='address'
                        type='text'
                        value={address}
                        onChange={handleChange}
                        label='Direccion'
                        />
                    <input
                        className="profile-input" 
                        placeholder="Ciudad"
                        name='city'
                        type='text'
                        value={city}
                        onChange={handleChange}
                        label='ConfirmarPassword'
                        />
                    <input
                        className="profile-input" 
                        placeholder="Departamento"
                        name='state'
                        type='text'
                        value={state}
                        onChange={handleChange}
                        label='Departamento'
                        />
                </div>
            </div>
            <button className="profile-button" type="submit" disabled={!userCtx.id}>Actualizar datos</button>
        </form>
        <div className="profile-past-orders-container">
            <h1>Historial de Pedidos</h1>
            <div className="profile-past-orders">
                        <div className="table-container">
                            <h3>Nro de Orden</h3>
                            <h3>Fecha</h3>
                            <h3>Precio Total</h3>
                        </div>
            {userCtx.id && pastOrders ? pastOrders.map(({_id, price, createdAt, products}) => {
                return <div className="profile-past-order"key={_id}>
                        <div className="past-order-data">
                            <div>{_id}</div>
                            <div>{createdAt.substring(0,10)}</div>
                            <div>$ {price}</div>
                        </div>
                        {/* <div>{products.map((prod) => <span key={prod._id}>{prod.name}</span>)}</div> */}
                        </div>
                
                }) : <h2>No tienes ordenes previas aun</h2>}
            </div>
        </div>
        </div>
    )
}

export default Profile;