import React, { Component } from "react";
import BlogDataService from "../services/blog.service";
import { withRouter } from 'react-router-dom';
import AuthService from "../services/auth.service";
class Index extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            posts: []
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
    componentDidMount() {
        this.retrievePosts();
    }
    retrievePosts() {
        BlogDataService.getAllPost()
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
    logout() {
        if (window.confirm("Do you want to logout?") == true) {
            AuthService.logout();
            this.props.history.push("/login");
        }
    }
    render() {
        return (
            <div>
                <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" type="text/css" />
                <link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css" />
                <link href="../css/font-awesome.min.css" rel="stylesheet" type="text/css" />
                <link href="../css/templatemo_style.css" rel="stylesheet" type="text/css" />
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
                                <li><a href="/index" className="active"><i className="fa fa-home" />Homepage</a></li>
                                <li><a href="/social"><i className="fa fa-globe" />Social</a></li>
                                <li><a href="/sport"><i className="fa fa-futbol-o" aria-hidden="true" />Sport</a></li>
                                <li><a href="/technology"><i className="fa fa-camera-retro" />Technology</a></li>
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
                            <h1 className="templatemo-header">Welcome to Novahub Blog</h1>
                            {this.state.posts.map((post, index) => (
                                <div className="row">
                                    <article className="post">
                                        <header>
                                            <div className="title">
                                                <h2><a href={"/post/" + post.id}>{post.title}</a></h2>
                                            </div>
                                            <div className="meta">
                                                <time className="published">{this.toSqlDatetime(new Date(post.createdAt))}</time>
                                                <a href="" className="author"><span className="name">{post.user.firstName} {post.user.lastName}</span></a>
                                            </div>
                                        </header>
                                        <a href={"/post/" + post.id} className="image featured"><img src={post.img_thump_url} alt="" /></a>
                                        <p className="fifty-chars">{post.content}</p>
                                        <footer>
                                            <ul className="actions">
                                                <li><a href={"/post/" + post.id} className="button large">Continue</a></li>
                                            </ul>
                                            <ul className="stats">
                                                <li><a href="#">General</a></li>
                                                <li><a href="#" className="fa fa-heart">28</a></li>
                                                <li><a href="#" className="fa fa-comment">128</a></li>
                                            </ul>
                                        </footer>
                                    </article>
                                </div>
                            ))}
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
export default withRouter(Index);