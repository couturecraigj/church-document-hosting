import React from "react";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Downloads from "../pages/Downloads";
import Layout from "../components/Layout";
import AddToHomeScreen from "../components/AddToHomeScreen";

const App = ({ install }) => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/account/login" component={Login} />
      <Route exact path="/account/signup" component={SignUp} />
      <Route exact path="/downloads" component={Downloads} />
      <AddToHomeScreen />
    </Switch>
  </Layout>
);

export default App;
