import React from 'react';
import Logo from './logo.js';
import styled from 'styled-components';
import NavLink from 'react-router-dom/NavLink';
import PushNotificationsButton from '../PushNotifications';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';
import './Layout.css';
const ME = gql`
  query Me {
    me {
      id
    }
  }
`;
const SEND_PUSH = gql`
  mutation SendPush($input: PushInput!) {
    sendPush(input: $input)
  }
`;
const LOG_OUT = gql`
  mutation LogOut {
    logOut
  }
`;

const HeaderLink = styled(NavLink)`
  filter: drop-shadow(0px 0px 10px rgba(63, 54, 24, 0.486));
  color: #c7996e;
  transition: all 0.3s;
  font-size: 100%;
  padding: 0 4px;
  text-shadow: 0px 0px 10px #000;
  &.active {
    color: #d8af79;
    font-weight: bold;
  }
`;
const HeaderButton = styled.button`
  filter: drop-shadow(0px 0px 10px rgba(63, 54, 24, 0.486));
  border: none;
  background: transparent;
  color: #c7996e;
  transition: all 0.3s;
  font-size: 100%;
  padding: 0 4px;
  text-shadow: 0px 0px 10px #000;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const NavBar = ({ loggedIn = false }) => (
  <div className="Layout-navlinks">
    <HeaderLink activeClassName="active" to="/documents">
      Documents
    </HeaderLink>
    <HeaderLink activeClassName="active" to="/offering">
      Offering
    </HeaderLink>
    {!loggedIn ? (
      <HeaderLink activeClassName="active" to="/account/login">
        Login
      </HeaderLink>
    ) : (
      <React.Fragment>
        <Mutation mutation={LOG_OUT}>
          {(logout, { client }) => {
            const onClick = async () => {
              await logout();
              client.resetStore();
            };
            return <HeaderButton onClick={onClick}>Logout</HeaderButton>;
          }}
        </Mutation>
        <PushNotificationsButton serverApiKey={serverApiKey} />
      </React.Fragment>
    )}
  </div>
);

const serverApiKey = process.env.RAZZLE_GCM_API_KEY;

const imageList = process.env.RAZZLE_IMAGE_LIST || [];

const hash = process.env.RAZZLE_FAVICON_HASH || '1';

const Layout = ({ children, loggedIn }) => {
  return (
    <div className="Layout">
      <React.Fragment>
        <Helmet titleTemplate="%s | Crossway Church of Keene, NH">
          <meta charSet="utf-8" />
          <link
            rel="icon"
            href={`/favicon.ico?v=${hash}`}
            type="image/x-icon"
          />
          <link rel="manifest" href="/manifest.json" />
          {imageList.map(image => (
            <link
              key={image}
              rel="apple-touch-icon"
              sizes={`${image.replace(
                /[\w/]*-(\d+).png/gm,
                '$1'
              )}x${image.replace(/[\w/]*-(\d+).png/gm, '$1')}`}
              href={image}
            />
          ))}
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
          <NavBar loggedIn={loggedIn} />
          {loggedIn && (
            <Mutation mutation={SEND_PUSH}>
              {sendPush => (
                <button
                  onClick={() =>
                    sendPush({
                      variables: {
                        input: {
                          title: 'PUSH!!',
                          body: 'THIS IS A PUSH, YEA!!!'
                        }
                      }
                    })
                  }
                >
                  Send Push
                </button>
              )}
            </Mutation>
          )}
        </div>
        {children}
      </React.Fragment>
    </div>
  );
};

const DynamicLayout = ({ children }) => (
  <Query query={ME}>
    {({ data, loading, error }) => {
      if (loading) return <Layout loggedIn={false}>{children}</Layout>;
      if (error) {
        console.error(error);
        return <div>ERROR</div>;
      }
      return <Layout loggedIn={data.me !== null}>{children}</Layout>;
    }}
  </Query>
);

export const queryMe = ME;

export default DynamicLayout;
