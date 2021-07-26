import React, { useRef, Component } from "react";
import BlogDataService from "../services/blog.service";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeTagList = this.onChangeTagList.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeImgThumpUrl = this.onChangeImgThumpUrl.bind(this);
        this.demo = this.demo.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            tempTags: [],
            categories: [],
            post: {
                category: {
                    id: null
                },
                user: {
                    id: null,
                },
                tagList: [],
                title: null,
                content: null,
                img_thump_url: null,
            },
            successful: false,
            message: ""
        }
    };
    componentDidMount() {
        this.getListCategory();
        this.getUserId();
        this.getPostById();
        this.getListTag();
    }
    getUserId() {
        this.state.post.user.id = AuthService.getCurrentUser().id;
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
    toSqlDatetime = (inputDate) => {
        const date = new Date(inputDate)
        const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        return dateWithOffest
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')
    }
    handleEdit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });
        let demo = 0;
        if (this.state.tempTags.length!==0) {
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
    demo() {
        console.log("Title: " + this.state.post.title)
        console.log("Category: " + JSON.stringify(this.state.post.category))
        console.log("Tags: " + JSON.stringify(this.state.post.tagList))
        console.log("User id: " + JSON.stringify(this.state.post.user))
        console.log("Content: " + this.state.post.content)
        console.log("Img thump url: " + this.state.post.img_thump_url)
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
                                <li><a href="/createpost"><i className="fa fa-pencil" />Write blog</a></li>
                                <li><a href="/listpost" className="active"><i className="fa fa-book" />My blogs</a></li>
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
                                            <div className="form-group">
                                                <button style={{float:"right",marginRight:"5%"}} onClick={this.demo} className="btn btn-success" name="submit_reg">Submit</button>
                                            </div>
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
                                </div> {/* /.col-md-12 */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* right section */}
            </div>
        );
    }
}
