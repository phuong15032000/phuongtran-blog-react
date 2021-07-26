import './App.css';
import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Index from "./components/index.component";
import Social from "./components/social.component";
import Sport from "./components/sport.component";
import Technology from "./components/technology.component";
import Detail from "./components/detail.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component"
import Listpost from "./components/listpost.component"
import Createpost from "./components/createpost.component"
import Edit from "./components/edit.component"
import Logout from "./components/logout.component"
import Admin_browse from "./components/admin-post.component"
import Admin_browse_post from "./components/admin-edit.component"
import Tag from "./components/tag.component"
import Admin_category from "./components/admin-category.component";
import Admin_user from "./components/admin-user.component";
import Admin_add_user from "./components/admin-add-user.component";
function App() {
  if (!localStorage.getItem("user")) {
    return (
      <Switch>
        <Route exact path={["/", "/index", "/login", "/social", "/sport", "/technology", "/post/:id", "/profile"]} component={Login} />
        <Route exact path={["/register"]} component={Register} />
      </Switch>
    );
  }
  else {
    return (
      <Switch>
        <Route exact path={"/admin-posts"} component={Admin_browse} />
        <Route path={"/admin/:id"} component={Admin_browse_post} />
        <Route exact path={["/", "/index"]} component={Index} />
        <Route exact path={["/login"]} component={Login} />
        <Route exact path="/social" component={Social} />
        <Route exact path="/sport" component={Sport} />
        <Route exact path="/technology" component={Technology} />
        <Route path="/post/:id" component={Detail} />
        <Route path="/profile" component={Profile} />
        <Route path="/listpost" component={Listpost} />
        <Route path="/createpost" component={Createpost} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/logout" component={Logout} />
        <Route path="/tag/:nametag" component={Tag}/>
        <Route path="/admin-categories" component={Admin_category}/>
        <Route path="/admin-users" component={Admin_user}/>
        <Route path="/admin-add-user" component={Admin_add_user}/>
      </Switch>
    );
  }
}
export default App;
