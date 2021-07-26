import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import { withRouter } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        //this.handleRegister = this.handleRegister.bind(this);
        this.logout = this.logout.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeIntro = this.onChangeIntro.bind(this);
        this.email_validate = this.email_validate.bind(this);
        this.onChangeCfPassword = this.onChangeCfPassword.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.phone_validate = this.phone_validate.bind(this);
        this.demo = this.demo.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            firstName: null,
            lastName: null,
            mobile: null,
            email: null,
            password: null,
            cfPassword: null,
            intro: null,
            successful: false,
            message: ""
        }
    }
    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.firstName,
                this.state.lastName,
                this.state.mobile,
                this.state.email,
                this.state.cfPassword,
                this.state.intro
            ).then(
                response => {
                    this.setState({
                        message: response.data,
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
    demo() {
        console.log("First name: " + this.state.firstName)
        console.log("Last name: " + this.state.lastName)
        console.log("Phone number: " + this.state.mobile)
        console.log("Email: " + this.state.email)
        console.log("cfPassword: " + this.state.cfPassword)
        console.log("Intro: " + this.state.intro)
    }
    phone_validate(e) {
        var phone = document.getElementById('mobile');
        var maintainplus = '';
        var numval = phone.value
        if (numval.charAt(0) == '+') {
            var maintainplus = '';
        }
        var curphonevar = numval.replace(/[\\A-Za-z!"£$%^&\,*+_={};:'@#~,.Š\/<>?|`¬\]\[]/g, '');
        phone.value = maintainplus + curphonevar;
        var maintainplus = '';
        // eslint-disable-next-line no-unused-expressions
        phone.focus;
    }
    email_validate(e) {
        var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
        if (regMail.test(e.target.value) == false) {
            document.getElementById("status").innerHTML = "<span class='warning'>Email address is not valid yet.</span>";
            console.log(e.target.value + "day khong phai email");
        } else {
            document.getElementById("status").innerHTML = "<span class='valid'>Thanks, you have entered a valid Email address!</span>";
        }
    }
    password_validate(e) {
        var pass2 = document.getElementById('pass2');
        var message = document.getElementById('confirmMessage');
        //Set the colors we will be using ...
        var goodColor = "#66cc66";
        var badColor = "#ff6666";
        if (document.getElementById('pass1').value === document.getElementById('pass2').value) {
            pass2.style.backgroundColor = goodColor;
            message.style.color = goodColor;
            message.innerHTML = "Passwords Match"
        } else {
            pass2.style.backgroundColor = badColor;
            message.style.color = badColor;
            message.innerHTML = "Passwords Do Not Match!"
        }
    }
    onChangeCfPassword(e) {
        this.setState({
            cfPassword: e.target.value
        })
    }
    onChangeMobile(e) {
        this.setState({
            mobile: e.target.value
        })
    }
    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangeIntro(e) {
        this.setState({
            intro: e.target.value
        })
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
                <script src="https://use.fontawesome.com/967b9063cd.js"></script>
                <link href="../css/register.css" rel="stylesheet" type="text/css" />
                <link href="../" />
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
                            <div className="row">
                                <div className="col-md-12">
                                    <Form
                                        className="form"
                                        onSubmit={this.handleRegister}
                                        ref={c => {
                                            this.form = c;
                                        }}
                                    >
                                        {!this.state.successful && (
                                            <fieldset>
                                                <legend className="text-center">Fill user's information to below form. <span className="req" />
                                                </legend>
                                                <div className="form-group">
                                                    <label><span className="req">* </span> First name: </label>
                                                    <input
                                                        name="firstname"
                                                        type="text"
                                                        className="form-control"
                                                        required="required"
                                                        value={this.state.firstName}
                                                        onChange={this.onChangeFirstName}

                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label><span className="req">* </span> Last name: </label>
                                                    <input
                                                        name="lastname"
                                                        type="text"
                                                        className="form-control"
                                                        required="required"
                                                        value={this.state.lastName}
                                                        onChange={this.onChangeLastName}

                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phonenumber"><span className="req">* </span> Phone number: </label>
                                                    <input
                                                        id="mobile"
                                                        name="mobile"
                                                        required="required"
                                                        type="text"
                                                        className="form-control"
                                                        maxLength={28}
                                                        value={this.state.mobile}
                                                        onKeyUp={this.phone_validate}
                                                        onChange={this.onChangeMobile}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phonenumber"><span className="req">* </span> Introduction: : </label>
                                                    <textarea
                                                        className="form-control "
                                                        defaultValue={""}
                                                        onChange={this.onChangeIntro}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email"><span className="req">* </span> Email: <small>(Also your username)</small></label>
                                                    <input
                                                        name="email"
                                                        required="required"
                                                        className="form-control"
                                                        type="text"
                                                        value={this.state.email}
                                                        onKeyUp={this.email_validate}
                                                        onChange={this.onChangeEmail}
                                                    />
                                                    <div className="status" id="status" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password"><span className="req">* </span> Password: </label>
                                                    <input
                                                        type="password"
                                                        required="required"
                                                        className="form-control inputpass"
                                                        minLength={4}
                                                        maxLength={16}
                                                        placeholder="Password"
                                                        id="pass1"
                                                        onChange={this.onChangePassword}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label><span className="req">* </span> Confirm password: </label>
                                                    <input
                                                        required
                                                        type="password"
                                                        className="form-control inputpass"
                                                        minLength={4}
                                                        maxLength={16}
                                                        id="pass2"
                                                        placeholder="Input your password again to confirm"
                                                        onKeyUp={this.password_validate}
                                                        onChange={this.onChangeCfPassword}
                                                    /> <p />
                                                    <span id="confirmMessage" className="confirmMessage" />
                                                </div>
                                                <div className="form-group">
                                                    <button onClick={this.demo} className="btn btn-success" type="submit" name="submit_reg">Sign up</button>
                                                </div>
                                            </fieldset>
                                        )}
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
                    </div>
                    {/* right section */}
                </div>
                <script lang="JavaScript">

                </script>
            </div>
        );

    }

}
export default withRouter(Register);