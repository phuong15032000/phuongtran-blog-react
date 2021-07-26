import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import AdminService from '../services/admin.service';
import AuthService from "../services/auth.service";

import adminService from "../services/admin.service";
class Admin_browse extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.setAdmin = this.setAdmin.bind(this);
        this.removeAdmin = this.removeAdmin.bind(this);
        this.state = {
            users: [],
            isAdmin: null
        };
    }
    removeAdmin(id) {
        AdminService.removeAdmin(id, id)
            .then(response => {
                this.retrievePosts();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    setAdmin(id) {
        AdminService.setAdmin(id, id)
            .then(response => {
                this.retrieveUsers();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    componentDidMount() {
        this.retrieveUsers();
    }
    retrieveUsers() {
        AdminService.getAllUsers()
            .then(response => {
                this.setState({
                    users: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    logout() {
        if (window.confirm("Do you want to logout?") == true) {
            AuthService.logout();
            this.props.history.push("/login");
        }
    }
    active(id){
        AdminService.activeUser(id)
            .then(response => {
                this.retrieveUsers();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }    
    inactive(id){
        AdminService.inactiveUser(id)
            .then(response => {
                this.retrieveUsers();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return (
            <div>
                <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" type="text/css" />
                <link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css" />
                <link href="../css/font-awesome.min.css" rel="stylesheet" type="text/css" />
                <link href="../css/templatemo_style.css" rel="stylesheet" type="text/css" />
                <script src="https://use.fontawesome.com/967b9063cd.js"></script>
                <link href="../css/post.css" rel="stylesheet" type="text/css" />
                <div className="templatemo-logo visible-xs-block">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 black-bg logo-left-container">
                        <h1 className="logo-left">Novahub</h1>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 white-bg logo-right-container">
                        <h1 className="logo-right">Blog</h1>
                    </div>
                </div>
                <div className="templatemo-container">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 black-bg left-container">
                        <h1 className="logo-left hidden-xs margin-bottom-60">Novahub</h1>
                        <div className="tm-left-inner-container">
                            <ul className="nav nav-stacked templatemo-nav">
                                <li><a href="/index"><i className="fa fa-home" />Homepage</a></li>
                                <li><a href="/createpost"><i className="fa fa-pencil" />Write blog</a></li>
                                <li><a href="/listpost"><i className="fa fa-book" />My blogs</a></li>
                                <li><a href="/admin-posts"><i className="fa fa-pen-square" />Posts</a></li>
                                <li><a href="/admin-categories"><i className="fa fa-pen-square" />Categories</a></li>
                                <li><a href="/admin-users" className="active"><i className="fa fa-pen-square" />Users</a></li>
                                <li><a onClick={this.logout}><i className="fa fa-sign-out" />Log out</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* left section */}
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 white-bg right-container">
                        <h1 className="logo-right hidden-xs margin-bottom-60">Blog</h1>
                        <div className="tm-right-inner-container">
                            <h1 className="templatemo-header">Posts management</h1>
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Active</th>
                                        <th>Email</th>
                                        <th>Name</th>
                                        <th>Phone number</th>
                                        <th>Roles</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.users.map((user, index) => (
                                        <tr>
                                            <th scope="row"><a href="#">{user.id}</a></th>
                                            <td style={{ textAlign: "center" }}>{user.active
                                                ? <i className="fa fa-check"></i>
                                                : <i className="fa fa-times"></i>
                                            }</td>
                                            <td>{user.email}</td>
                                            <td>{user.firstName} {user.lastName}</td>
                                            <td>{user.mobile}</td>
                                            <td>
                                                {user.roleList.map(role => (
                                                    <p>{role.name}</p>
                                                ))}
                                            </td>
                                            <th>
                                                {user.roleList.length === 2
                                                    ? <button style={{ width: "125px" }} onClick={() => this.removeAdmin(user.id)} className="btn btn-danger">Remove admin </button>
                                                    : <button style={{ width: "125px" }} onClick={() => this.setAdmin(user.id)} className="btn btn-success">Set admin</button>
                                                }
                                                &nbsp;
                                                {user.active
                                                    ? <button style={{width: "80px"}} onClick={() => this.inactive(user.id)} className="btn btn-success">Active</button>
                                                    : <button style={{width: "80px"}} onClick={() => this.active(user.id)} className="btn btn-danger">Inactive</button>
                                                }
                                            </th>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                            <a href="/admin-add-user" className="btn btn-success" style={{ display: "block", float: "right" }}>Add user</a>
                            <br />
                            <footer>
                                <p className="col-lg-6 col-md-6 col-sm-12 col-xs-12 templatemo-copyright">Copyright © 2021 by phuongtran@novahub.vn
                                    {/* Credit: www.templatemo.com */}
                                </p>
                                <p className="col-lg-6 col-md-6 col-sm-12 col-xs-12 templatemo-social">
                                    <a href="//fb.com/trandiepphuong"><i className="fa fa-facebook" /></a>
                                    <a href="#"><i className="fa fa-twitter" /></a>
                                    <a href="#"><i className="fa fa-google-plus" /></a>
                                    <a href="#"><i className="fa fa-youtube" /></a>
                                    <a href="#"><i className="fa fa-linkedin" /></a>
                                </p>
                            </footer>
                        </div>
                    </div>
                    {/* right section */}
                </div>
            </div>
        );
    }
}

export default withRouter(Admin_browse);