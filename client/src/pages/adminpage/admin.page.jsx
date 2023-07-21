import React from 'react';
import './admin-page.styles.css'
import Admin from '../../components/admin/admin.component';

const AdminPage = () => {
    return (
        <div className="admin-page-container">
            <div className="admin-page-content-container">
                <Admin/>
            </div>
        </div>
    )
}

export default AdminPage; 