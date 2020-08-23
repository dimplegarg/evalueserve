import React, {Component} from 'react';

export default ({handleClose, name, userName, title, handleChange, handleEditUser, handleAddUser}) => {
    return (
        <div className="modalContainer">
            <div className="modalBody">
                <form onSubmit={e => { e.preventDefault(); title === 'Edit User' ? handleEditUser() : handleAddUser()}}>
                    <img alt="close" src={require('../assets/images/close.png')} className="modalClose" onClick={() => handleClose()} />
                    <h3 style={{ marginTop:0 }}>{title}</h3>
                    <div>
                        <label>Name</label>
                        <input type="text" value={name} onChange={e => handleChange('name', e.target.value)} required />
                    </div>
                    <div>
                        <label>User Name</label>
                        <input type="text" value={userName} onChange={e => handleChange('userName', e.target.value)} required />
                    </div>
                    <div className="buttonContainer" style={{ marginTop:20 }}>
                        <button type="submit" className="btn btn-danger">{title}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}