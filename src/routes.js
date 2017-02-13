import React from "react";
import { Route } from "react-router";

import { redirectNonUser, redirectNonAdmin } from "middleware/restrictAccess";

import App from "components/app/App";
import FrontPage from "components/app/FrontPage";
import LoginPage from "components/app/LoginPage";
import NotFound from "components/app/NotFound";

import UserShow from "components/user/UserShow";
// import UserList from "./user/UserList";
import ChatContainer from "components/chat/ChatContainer";
import Login from "components/auth/Login";
// import Registration from "./auth/Registration";

export default (
  <Route>
    <Route path="" component={App}>
      <Route path="/" component={FrontPage} />
      <Route path="/user/me" component={UserShow} onEnter={redirectNonUser} />
      {/*<Route path="user" component={UserList} onEnter={redirectNonAdmin} />*/}
      <Route path="/chat" component={ChatContainer} onEnter={redirectNonUser} />
      <Route path="/login" component={LoginPage} />
      {/*<Route path="register" component={Registration} />*/}
      <Route path="*" component={NotFound}/>
    </Route>
  </Route>
);
