import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Admin_browse from "./admin-browse.component"
import Admin_browse_post from "./admin-browse-post.component"
import Admin_category from "./admin-category.component";
function App() {
  
    return (
      <Switch>
        <Route exact path={"/browse"} component={Admin_browse} />
        <Route path={"/:id"} component={Admin_browse_post} />
        <Route path="/category" component={Admin_category}/>
      </Switch>
    );
}
export default App;
