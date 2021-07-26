import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import BlogDataService from '../services/blog.service';
import AuthService from "../services/auth.service";
import adminService from "../services/admin.service";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
class Admin_browse_post extends Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeTagList = this.onChangeTagList.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeImgThumpUrl = this.onChangeImgThumpUrl.bind(this);
        this.activePost = this.activePost.bind(this);
        this.toSqlDatetime = this.toSqlDatetime.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {

            tempTags: [],
            categories: [],
            post: {
                id: null,
                title: null,
                user: {
                    id: null,
                    roleList: [],
                    firstName: null,
                    lastName: null,
                    mobile: null,
                    email: null,
                    password: null,
                    intro: null,
                },
                category: {
                    id: null,
                    name: null,
                },
                tagList: [],
                content: null,
                img_thump_url: null,
            },
            successful: false,
            message: ""
        };
    }
    toSqlDatetime = (inputDate) => {
        const date = new Date(inputDate)
        const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        return dateWithOffest
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')
    }
    logout() {
        if (window.confirm("Do you want to logout?") == true) {
            AuthService.logout();
            this.props.history.push("/login");
        }
    }

    componentDidMount() {
        this.getListCategory();
        this.getPostById();
        this.getListTag();
    }
    getListCategory() {
        BlogDataService.getListCategory()
            .then(response => {
                this.setState({
                    categories: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    getListTag() {
        let temp = "";
        for (let i of this.state.post.tagList) {
            if (i !== this.state.post.tagList[this.state.post.tagList.length - 1])
                temp = temp + i.name + ",";
            else {
                temp = temp + i.name;
            }
        }
        return temp;
    }
    activePost() {
        console.log(this.state.post)
        adminService.activePost(this.state.post.id, this.state.post).then(
            response => {
                console.log(response.data)
                this.props.history.push("/admin/browse");
                window.location.reload();
            })
    }
    getPostById() {
        BlogDataService.getPostById(this.props.match.params.id)
            .then(response => {
                this.setState({
                    post: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    toSqlDatetime = (inputDate) => {
        const date = new Date(inputDate)
        const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        return dateWithOffest
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')
        // const date = inputDate.substr(0, 10)
        // const time = inputDate.substr(11,16)
        // return date+" "+time;
    }
    handleEdit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });
        let demo = 0;
        if (this.state.tempTags.length !== 0) {
            this.state.post.tagList = [];
            for (let i of this.state.tempTags) {
                console.log("push" + this.state.tempTags[demo])
                this.state.post.tagList.push({
                    name: this.state.tempTags[demo]
                });
                demo = demo + 1;
            }
        }
        this.state.tempTags = [];
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            BlogDataService.editPost(
                this.state.post.id,
                this.state.post
            ).then(
                response => {
                    this.setState({
                        message: "Edit blog successful",
                        successful: true
                    });
                    console.log(response.data)
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }
    onChangeCategory(e) {
        this.state.post.category.id = e.target.value;
    }
    onChangeTagList(e) {
        let temp = e.target.value.split(",");
        this.state.tempTags = temp;
        console.log(this.state.tempTags)
    }
    onChangeTitle(e) {
        this.state.post.title = e.target.value

    }
    onChangeContent(e) {
        this.state.post.content = e.target.value
    }
    onChangeImgThumpUrl(e) {
        this.state.post.img_thump_url = e.target.value
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
                <link href="../css/image.css" rel="stylesheet" type="text/css" />
                <link href="../css/article.css" rel="stylesheet" type="text/css" />
                <link href="../css/single-blog.css" rel="stylesheet" type="text/css"></link>
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
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="post-blog">
                                        <div className="blog-image">
                                            <img src={this.state.post.img_thump_url} alt="" />
                                        </div> {/* /.blog-image */}
                                        <div className="blog-content">
                                            <span className="meta-date"><a href="#">{this.state.post.createdAt}</a></span>
                                            <span className="meta-comments"><a href="#blog-comments">3 Comments</a></span>
                                            <span className="meta-author"><a href="#blog-author">{this.state.post.user.firstName} {this.state.post.user.lastName}</a></span>
                                            <h3>{this.state.post.title}</h3>
                                            <p>{this.state.post.content}</p>
                                            <div className="tag-items">
                                                <span className="small-text">Tags:</span>
                                                {this.state.post.tagList.map((tag, index) => (
                                                    <a href="#" rel="tag">{tag.name}</a>
                                                ))}
                                            </div>
                                        </div> {/* /.blog-content */}
                                        <Form
                                            className="form"
                                            onSubmit={this.handleEdit}
                                            ref={c => {
                                                this.form = c;
                                            }}
                                        >
                                            <fieldset>
                                                <legend className="text-center">Edit blog<span className="req" />
                                                </legend>
                                                <div className="form-group">
                                                    <label><span className="req">* </span> Title: </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        required="required"
                                                        defaultValue={this.state.post.title}
                                                        onChange={this.onChangeTitle}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label><span className="req">* </span> Category: </label>
                                                    <select className="form-control" onChange={this.onChangeCategory} defaultValue={this.state.post.category.name}>
                                                        {this.state.categories.map((category, index) => (
                                                            <option value={category.id}>{category.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label><span className="req">* </span> Tags: (split by ",". Example: <input value="Covid-19,Dance,Vietnam" disabled /> )</label>
                                                    <input
                                                        defaultValue={this.getListTag()}
                                                        type="text"
                                                        className="form-control"
                                                        required="required"
                                                        onChange={this.onChangeTagList}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phonenumber"><span className="req">* </span> Image thumpnail URL: </label>
                                                    <input
                                                        required="required"
                                                        type="text"
                                                        className="form-control"
                                                        defaultValue={this.state.post.img_thump_url}
                                                        onChange={this.onChangeImgThumpUrl}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phonenumber"><span className="req">* </span> Content: </label>
                                                    <textarea
                                                        required="required"
                                                        className="form-control "
                                                        defaultValue={this.state.post.content}
                                                        onChange={this.onChangeContent}
                                                    />
                                                </div>
                                                <button className="form-control" name="submit_reg">Submit</button>
                                                <br />
                                                <button onClick={this.activePost} className="form-control" >Active</button>
                                            </fieldset>
                                            {this.state.message && (
                                                <div className="form-group message-box">
                                                    <div
                                                        className={
                                                            this.state.successful
                                                                ? "alert alert-success"
                                                                : "alert alert-danger"
                                                        }
                                                        role="alert"
                                                    >
                                                        {this.state.message}
                                                    </div>
                                                </div>
                                            )}
                                            <CheckButton
                                                style={{ display: "none" }}
                                                ref={c => {
                                                    this.checkBtn = c;
                                                }}
                                            />
                                        </Form>
                                    </div>
                                </div>
                            </div>
                            <footer>
                                <p className="col-lg-6 col-md-6 col-sm-12 col-xs-12 templatemo-copyright">Copyright © 2021 by phuongtran@novahub.vn
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

export default withRouter(Admin_browse_post);