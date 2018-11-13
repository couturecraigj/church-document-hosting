import React from "react";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Layout from "../components/Layout";

const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/account/login" component={Login} />
      <Route exact path="/account/SignUp" component={SignUp} />
    </Switch>
  </Layout>
);

export default App;
