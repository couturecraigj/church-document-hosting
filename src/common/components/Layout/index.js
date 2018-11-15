import React from "react";
import Logo from "./logo.js";
import NavLink from "react-router-dom/NavLink";
import { Helmet } from "react-helmet";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <React.Fragment>
        <Helmet titleTemplate="%s | Crossway Church of Keene, NH">
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico?v=1234" type="image/x-icon" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="touch-icon-iphone.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad.png" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="touch-icon-iphone-retina.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="touch-icon-ipad-retina.png"
          />
          <title>Home</title>
        </Helmet>

        <div className="Layout-header">
          <NavLink to="/" exact className="Logo-link">
            {/* <div>
            <span>Home</span>
          </div> */}
            <Logo />
            {/* <img src={Logo} className="Layout-logo" alt="logo" /> */}
          </NavLink>
          <h2>Welcome to Church's Website</h2>
          <div className="Layout-navlinks">
            <NavLink activeClassName="active" className="Link" to="/account/login">
              Login
            </NavLink>
            <NavLink activeClassName="active" className="Link" to="/account/signup">
              Sign up
            </NavLink>
            <NavLink activeClassName="active" className="Link" to="/downloads">
              Downloads
            </NavLink>
          </div>
        </div>
        {children}
      </React.Fragment>
    </div>
  );
};

export default Layout;
