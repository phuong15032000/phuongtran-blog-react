import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import AdminService from '../services/admin.service';
import Form from "react-validation/build/form";
import AuthService from "../services/auth.service";
import BlogDataService from "../services/blog.service";
class Admin_category extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.getCurrentCategory = this.getCurrentCategory.bind(this);
        this.deleteById = this.deleteById.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.onChangeEdit = this.onChangeEdit.bind(this);
        this.state = {
            categories: [],
            category: {
                name: null
            },
            currentCategory: {
                id: null,
                name: null
            }
        };
    }
    componentDidMount() {
        this.getListCategory()
    }
    onChangeCategory(e) {
        this.state.category.name = e.target.value;
        //console.log(this.state.category.name)
    }
    logout() {
        if (window.confirm("Do you want to logout?") == true) {
            AuthService.logout();
            this.props.history.push("/login");
        }
    }
    getListCategory() {
        AdminService.getAllCategory()
            .then(response => {
                this.setState({
                    categories: response.data
                });
                console.log(response.data);
            })
    }
    getCurrentCategory(id, name) {
        this.state.currentCategory.id = id;
        this.state.currentCategory.name = name;
        document.getElementById("edit-category").value = this.state.currentCategory.name;

    }
    addCategory() {
        console.log(this.state.category.name)
        AdminService.addCategory(this.state.category)
            .then(response => {
                console.log(response.data);
                this.getListCategory()
            })
            .catch(e => {
                console.log(e);
            });
        document.getElementById("input_category").value = ""
        document.getElementById("edit-category").value = ""
    }
    deleteById() {
        AdminService.deleteCategoryById(this.state.currentCategory.id)
            .then(() => {
                this.getListCategory()
            })
            .catch(e => {
                console.log(e);
            });
        document.getElementById("input_category").value = ""
        document.getElementById("edit-category").value = ""
    }
    updateCategory() {
        AdminService.updateCategory(this.state.currentCategory.id, this.state.currentCategory)
            .then(() => {
                this.getListCategory()
            })
            .catch(e => {
                console.log(e);
            });
        document.getElementById("input_category").value = ""
        document.getElementById("edit-category").value = ""
    }
    onChangeEdit(e){
        this.state.currentCategory.name = e.target.value
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
                                <li><a href="/admin-categories" className="active"><i className="fa fa-pen-square" />Categories</a></li>
                                <li><a href="/admin-users"><i className="fa fa-pen-square" />Users</a></li>
                                <li><a onClick={this.logout}><i className="fa fa-sign-out" />Log out</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* left section */}
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 white-bg right-container">
                        <h1 className="logo-right hidden-xs margin-bottom-60">Blog</h1>
                        <div className="tm-right-inner-container">
                            <h1 className="templatemo-header">Categories management</h1>
                            <div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Category</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.categories.map((category, index) => (
                                                <tr>
                                                    <td scope="row" onClick={() => this.getCurrentCategory(category.id, category.name)}>{category.name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                    <input onChange={this.onChangeEdit} id="edit-category" className="form-control" value={this.state.currentCategory.name}></input>
                                    <br />
                                    <button onClick={this.updateCategory} style={{ float: "right" }} className="btn btn-success">Edit</button>
                                    <button onClick={this.deleteById} style={{ float: "right", marginRight: "5px" }} className="btn btn-success">Delete</button>
                                </div>
                            </div>
                            <input
                                id="input_category"
                                className="form-control"
                                type="text"
                                placeholder="Input new category"
                                required
                                onChange={this.onChangeCategory}
                            ></input>
                            <br />
                            <button onClick={this.addCategory} style={{ float: "right" }} className="btn btn-success form-group">Save</button>

                            <footer>
                                <p className="col-lg-6 col-md-6 col-sm-12 col-xs-12 templatemo-copyright">Copyright © 2021 by phuongtran@novahub.vn
                                    {/* Credit: www.templatemo.com */}
                                </p>
                                <p className="col-lg-6 col-md-6 col-sm-12 col-xs-12 templatemo-social">
                                    <a href="fb.com/trandiepphuong"><i className="fa fa-facebook" /></a>
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

export default withRouter(Admin_category);