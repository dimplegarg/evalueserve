import React, { Component, Fragment } from 'react';
import { handleGetUser,handleUserAction } from "../action/UserAction";
import { connect } from 'react-redux';
import Modal from './Modal';

class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModal:false,
            isCardView:true,
            name:'',
            userName:'',
            isEdit:false,
            idx:null
        }
    }

    componentDidMount() {
        this.props.handleGetUser();
    }

    handleSearch = search => {
            let data = Object.assign([], this.props.filterData);
            let filterData = [];
            data.filter(i => {
                if (i.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                    i.username.toLowerCase().indexOf(search.toLowerCase()) > -1 || 
                    (i.email && i.email.toLowerCase().indexOf(search.toLowerCase()) > -1)) {
                    filterData.push(i);
                    return true;
                }
            })
            this.props.handleUserAction(null, null, null, 'filter', filterData);
    }

    handleUsers = async (name, userName, idx, type) => {
        const response = await this.props.handleUserAction(name, userName, idx, type);
        if(response) {
            this.setState({ isModal:false })
        }
    }

    render() {
        const {users=[], handleGetUser} = this.props;
        const {isModal, isCardView, name, userName, isEdit, idx} = this.state;
        return (
            <Fragment>
                <div className="col-sm-12 container-fluid mainContainer">
                    <nav className="navbar1">
                        <div className="container-fluid" style={{marginTop:"-1px"}}>
                            <div className="logo">Dashboard Page</div>
                            <div className="navbar-header">
                                <input type="search" onChange={e => this.handleSearch(e.target.value)} placeholder="Search user by user name, name and email" />
                            </div>
                        </div>
                    </nav>
                    <div className="main-content">
                        <div className="headingContainer">
                            <h1 className="heading">User</h1>
                            <div style={{ display: "flex",flexDirection:"row", alignItems:"center" }}>
                                <label>
                                    <input type="checkbox" checked={isCardView} onChange={() => this.setState({ isCardView:!isCardView })} />Is card view
                                </label>
                                <div className="buttonContainer" style={{marginLeft:20}}>
                                    <button type="button" onClick={() => this.setState({ isModal:true, isEdit:false, name:"", userName:"" })} className="btn btn-danger">Add User</button>
                                </div>
                                <div className="buttonContainer" style={{marginLeft:20}}>
                                    <button type="button" onClick={() => handleGetUser()} className="btn btn-danger">Refresh </button>
                                </div>
                            </div>
                        </div>

                        {isCardView ? 
                            <div>
                                {(users && users.length > 0) && users.map((i,idx) => (
                                    <div className="taskContainer" key={i.id}>
                                        <div className="taskDiv">
                                            <div className="taskDivHeader">
                                                <label className="smallLbl">Name</label>
                                                <div className="userActionContainer">
                                                    <img src={require("../assets/images/edit.png")} alt="edit" onClick={() => this.setState({ name:i.name, userName:i.username, isModal:true, isEdit:true, idx })} />
                                                    <img src={require("../assets/images/delete.png")} onClick={() => this.handleUsers(null, null, idx, 'delete')} alt="delete" />
                                                </div>
                                            </div>
                                            <label className="count" style={{color: "skyblue"}}>{i.name}, ( {i.username} )</label>
                                            <hr />
                                            <label className="smallLbl">Email: {i.email}</label>
                                            <label className="smallLbl">Phone No. : {i.phone}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            : 
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Name</td>
                                            <td>User Name</td>
                                            <td>Email</td>
                                            <td>Phone No.</td>
                                            <td>Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(users && users.length > 0) && users.map((i,idx) => (
                                            <tr key={i.id}>
                                                <td>{i.name}</td>
                                                <td>{i.username}</td>
                                                <td>{i.email}</td>
                                                <td>{i.phone}</td>
                                                <td>
                                                    <div className="userActionContainer">
                                                        <img src={require("../assets/images/edit.png")} alt="edit" onClick={() => this.setState({ name:i.name, userName:i.username, isModal:true, isEdit:true,idx })} />
                                                        <img src={require("../assets/images/delete.png")} onClick={() => this.handleUsers(null, null, idx, 'delete')} alt="delete" />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
                {isModal && 
                    <Modal 
                        handleClose={() => this.setState({ isModal:false })}
                        name={name}
                        userName={userName}
                        title={isEdit ? 'Edit User' : 'Add User'}
                        handleChange={(state, value) => this.setState({ [state]:value })}
                        handleEditUser={() => this.handleUsers(name, userName, idx, 'edit')} 
                        handleAddUser={() => this.handleUsers(name, userName, null, 'add')}
                    />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    users: state.UserReducer.user,
    filterData: state.UserReducer.filterData
})

export default connect(mapStateToProps, {handleGetUser, handleUserAction})(UserList)