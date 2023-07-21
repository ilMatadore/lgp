import React, { useState, createContext } from 'react';


const localUser = JSON.parse(localStorage.getItem('user')) || [];

export const UserContext = createContext(
    {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    successLogin: () => {},
    userLogout: () => {},
    updateProfile: () => {},
}
)

export const UserProvider = ({ children }) => {

    const [id, setId] = useState(localUser._id);
    const [first_name, setFirstName] = useState(localUser.first_name);
    const [last_name, setLastName] = useState(localUser.last_name);
    const [email, setEmail] = useState(localUser.email);
    const [address, setAddress] = useState(localUser.address);
    const [phone, setPhone] = useState(localUser.phone);
    const [city, setCity] = useState(localUser.city);
    const [state, setState] = useState(localUser.state);

    const successLogin = (user) => {
        setId(user._id);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email);
        setAddress(user.address);
        setPhone(user.phone);
        setCity(user.city);
        setState(user.state);
        localStorage.setItem('user', JSON.stringify(user._id));
    }

    const userLogout = () => {
        setId(undefined);
        setFirstName('');
        setLastName('');
        setEmail('');
        setAddress('');
        setPhone('');
        setCity('');
        setState('');
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.setItem('localCart', JSON.stringify([]));
    }

    const updateProfile = (user) => {
        setId(user._id);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email);
        setAddress(user.address);
        setPhone(user.phone);
        setCity(user.city);
        setState(user.state);
      };

    return (
        <UserContext.Provider value={{
            id,
            first_name,
            last_name,
            email,
            address,
            phone,
            city,
            state,
            successLogin,
            userLogout,
            updateProfile,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}



