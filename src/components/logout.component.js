import { React, Component, useLayoutEffect } from "react";
import { withRouter } from 'react-router-dom';
import AuthService from "../services/auth.service";
class Profile extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    componentDidCatch() {
        this.logout();
        this.props.history.push("/login");
        window.location.reload();
    }
    logout() {
        AuthService.logout();
        this.props.history.push("/login");
    }
    render() {
        return (
            <div></div>
        )
    }
}
export default withRouter(Profile);