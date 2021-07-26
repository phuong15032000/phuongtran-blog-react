import { React, Component, useLayoutEffect } from "react";
import { withRouter } from 'react-router-dom';
import AuthService from "../services/auth.service";
class Profile extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            currentUser: AuthService.getCurrentUser()
        }
    }
    logout() {
        AuthService.logout();
        this.props.history.push("/login");
    }
    render() {
        return (
            <div><link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" type="text/css" />
                <link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css" />
                <link href="../css/font-awesome.min.css" rel="stylesheet" type="text/css" />
                <link href="../css/templatemo_style.css" rel="stylesheet" type="text/css" />
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
                                <li><a href="/profile" className="active"><i className="fa fa-user" />Profile</a></li>
                                <li><a href="contact.html"><i className="fa fa-envelope-o" />Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* left section */}
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 white-bg right-container">
                        <h1 className="logo-right hidden-xs margin-bottom-60">Blog</h1>
                        <div className="tm-right-inner-container">
                            <h1 className="templatemo-header">Profile</h1>
                            <article className="templatemo-item">
                                <ul>
                                    <li> <a href="/createpost">Write blog</a></li>
                                    <li><a href="/listpost">My blogs</a></li>
                                    <li><button onClick={this.logout}>Log out</button></li>
                                </ul>
                            </article>
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
export default withRouter(Profile);