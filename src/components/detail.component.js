import React, { Component } from "react";
import BlogDataService from "../services/blog.service";
import AuthService from "../services/auth.service";
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
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
                createdAt: null,
                updatedAt: null,
                content: null,
                img_thump_url: null,
                _active: null
            }
        };
    }
    logout() {
        if (window.confirm("Do you want to logout?") == true) {
            AuthService.logout();
            this.props.history.push("/login");
        }
    }
    componentDidMount() {
        this.getPostById();
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
            .slice(0, 16)
            .replace('T', ' ')
    }
    render() {
        return (
            <div>
                <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" type="text/css" />
                <link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css" />
                <link href="../css/font-awesome.min.css" rel="stylesheet" type="text/css" />
                <link href="../css/templatemo_style.css" rel="stylesheet" type="text/css" />
                <script src="https://use.fontawesome.com/967b9063cd.js"></script>
                <link href="../css/subcribe.css" rel="stylesheet" type="text/css" />
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
                                <li><a href="/social"><i className="fa fa-globe" />Social</a></li>
                                <li><a href="/sport"><i className="fa fa-futbol-o" aria-hidden="true" />Sport</a></li>
                                <li><a href="/technology"><i className="fa fa-camera-retro" />Technology</a></li>
                                <div id="active_category" />
                                <li><a href="/createpost"><i className="fa fa-pencil" />Write blog</a></li>
                                <li><a href="/listpost"><i className="fa fa-book" />My blogs</a></li>
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
                                            <span className="meta-date"><a href="#">{this.toSqlDatetime(new Date(this.state.post.createdAt))}</a></span>
                                            <span className="meta-comments"><a href="#blog-comments">3 Comments</a></span>
                                            <span className="meta-author"><a href="#blog-author">{this.state.post.user.firstName} {this.state.post.user.lastName}</a></span>
                                            <h3>{this.state.post.title}</h3>
                                            <p style={{ fontSize: 22 }}>{this.state.post.content}</p>
                                            <div className="tag-items">
                                                <span className="small-text">Tags:</span>
                                                {this.state.post.tagList.map((tag, index) => (
                                                    <a href={"/tag/" + tag.name} rel="tag">{tag.name}</a>
                                                ))}
                                            </div>
                                        </div> {/* /.blog-content */}
                                    </div> {/* /.post-blog */}
                                </div> {/* /.col-md-12 */}
                            </div> {/* /.row */}
                            <footer>
                                <p className="col-lg-6 col-md-6 col-sm-12 col-xs-12 templatemo-copyright">Copyright © 2021 by phuongtran@novahub.vn
                                    {/* Credit: www.templatemo.com */}
                                </p>
                                <p className="col-lg-6 col-md-6 col-sm-12 col-xs-12 templatemo-social">
                                    <a href="#"><i className="fa fa-facebook" /></a>
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
