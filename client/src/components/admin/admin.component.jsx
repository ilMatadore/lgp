import React from 'react';
import './admin.styles.css';

const Admin = () => {
    return (
        <div className="admin-panel-container">
            <h1>Admin Panel</h1>
            <div className="admin-panel-contentAndOptions-container">
                <div className="admin-panel-options-container">
                    <div>Users</div>
                    <div>Products</div>
                    <div>Canastas</div>
                    <div>Adicionales</div>
                </div>
                <div className="admin-panel-content-container">
                    Content
                </div>
            </div>
        </div>
    )
}

export default Admin;