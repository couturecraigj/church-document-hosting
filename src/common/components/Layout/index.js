import React from "react";
import logo from "./crown-of-thorns.1.svg";
import NavLink from "react-router-dom/NavLink";
import { Helmet } from "react-helmet";
import "./Layout.css";

const Layout = ({ children }) => (
  <div className="Layout">
    <React.Fragment>
      <Helmet titleTemplate="%s | Crossway Church of Keene, NH">
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico?v=1234" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
        <title>Home</title>
      </Helmet>
      <div className="Layout-header">
        <NavLink to="/" exact className="Logo-link">
          <div>
            <span>Home</span>
          </div>
          <img src={logo} className="Layout-logo" alt="logo" />
        </NavLink>
        <h2>Welcome to Church's Website</h2>
        <div className="Layout-navlinks">
          <NavLink activeClassName="active" className="Link" to="/account/login">
            Login
          </NavLink>
          <NavLink activeClassName="active" className="Link" to="/account/signup">
            Sign up
          </NavLink>
        </div>
      </div>
      {children}
    </React.Fragment>
  </div>
);

export default Layout;
