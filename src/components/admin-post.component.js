import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import AdminService from '../services/admin.service';
import AuthService from "../services/auth.service";

import adminService from "../services/admin.service";
class Admin_browse extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            posts: [],
            currentPost: null
        };
    }
    componentDidMount() {
        this.retrievePosts();
    }
    retrievePosts() {
        AdminService.getAllPost()
            .then(response => {
                this.setState({
                    posts: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    checkActive(active) {
        if (active == true) return
        document.getElementById("btnActive").innerHTML = `<button className="btn btn-success">Actived</button>`;
        ;
    }
    deletePost(id) {
        AdminService.deletePost(id)
            .then(response => {
                console.log(response.data)
                this.retrievePosts();
            })
            .catch(e => {
                console.log(e);
            });
    }
    toSqlDatetime = (inputDate) => {
        const date = new Date(inputDate)
        const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        return inputDate
            .toISOString()
            .slice(0, 16)
            .replace('T', ' ')
    }
    logout() {
        if (window.confirm("Do you want to logout?") == true) {
            AuthService.logout();
            this.props.history.push("/login");
        }
    }
    activePost(id, post) {
        adminService.activePost(id, post).then(
            response => {
                console.log(response.data)
                this.retrievePosts();
            })
    }
    inactivePost(id, post) {
        adminService.inactivePost(id, post).then(
            response => {
                console.log(response.data)
                this.retrievePosts();
            })
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
                                <li><a href="/admin-posts" className="active"><i className="fa fa-pen-square" />Posts</a></li>
                                <li><a href="/admin-categories"><i className="fa fa-pen-square" />Categories</a></li>
                                <li><a href="/admin-users"><i className="fa fa-pen-square" />Users</a></li>
                                <li><a onClick={this.logout}><i className="fa fa-sign-out" />Log out</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* left section */}
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 white-bg right-container">
                        <h1 className="logo-right hidden-xs margin-bottom-60">Blog</h1>
                        <div className="tm-right-inner-container">
                            <h1 className="templatemo-header">Posts management</h1>
                            {/* {this.state.posts.map((post, index) => ( 
                                <div className="row">
                                    <article className="post">
                                        <header>
                                            <div className="title">
                                                <h2><a href={"/admin/" + post.id}>{post.title}</a></h2>
                                            </div>
                                            <div className="meta">
                                                <time className="published">{this.toSqlDatetime(new Date(post.createdAt))}</time>
                                                <a href="" className="author"><span className="name">{post.user.firstName} {post.user.lastName}</span></a>
                                            </div>
                                        </header>
                                        <a href={"/admin/" + post.id} className="image featured"><img src={post.img_thump_url} alt="" /></a>
                                        <p className="fifty-chars">{post.content}</p>
                                        <footer>
                                            <ul className="actions">
                                                <li><a href={"/admin/" + post.id} className="button large">Continue</a></li>
                                            </ul>
                                            <ul className="stats">
                                                <li><a href="#">General</a></li>
                                                <li><a href="#" className="fa fa-heart">28</a></li>
                                                <li><a href="#" className="fa fa-comment">128</a></li>
                                            </ul>
                                        </footer>
                                    </article>
                                </div>
                            ))} */}

                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Created at</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Is active?</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.posts.map((post, index) => (
                                        <tr>
                                            <th scope="row"><a href={"/admin/" + post.id}>{post.title}</a></th>
                                            <td>{this.toSqlDatetime(new Date(post.createdAt))}</td>
                                            <td>{post.category.name}</td>
                                            <td>
                                                {post.active
                                                    ? <button style={{width: "80px"}} onClick={() => this.inactivePost(post.id, post)} className="btn btn-success">Actived </button>
                                                    : <button style={{width: "80px"}} onClick={() => this.activePost(post.id, post)} className="btn btn-danger">Inactive</button>
                                                }
                                            </td>
                                            <th>
                                                <a href={"/admin/" + post.id} class="btn btn-primary">Edit</a>
                                                &nbsp;
                                                <button class="btn btn-primary" onClick={() => this.deletePost(post.id)}>Delete</button>
                                            </th>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
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

export default withRouter(Admin_browse);