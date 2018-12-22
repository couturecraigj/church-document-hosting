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
        <div>
          <PushNotificationsButton serverApiKey={serverApiKey} />
        </div>
      </React.Fragment>
    )}
  </div>
);

const serverApiKey = process.env.RAZZLE_GCM_API_KEY;

const imageList = process.env.RAZZLE_IMAGE_LIST || [];

const hash = process.env.RAZZLE_FAVICON_HASH || '1';

const LayoutWrapper = styled.div`
  min-height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const LayoutHeader = styled.div`
  /* flex: 1; */
  background: linear-gradient(
    125deg,
    #534d3b,
    #757163 20%,
    #757163 80%,
    #534d3b
  );
  /* height: 150px; */
  padding: 20px;
  margin-bottom: 1em;
  color: #000;
  border-bottom: 2px solid #763c23;
  & h2 {
    filter: drop-shadow(0px 0 10px #ad9f99) drop-shadow(0px 0 5px #ad9f99);
  }
`;

const LayoutFooter = styled.div`
  background: linear-gradient(
    125deg,
    #332f23,
    #534d3b 20%,
    #534d3b 80%,
    #332f23
  );
  color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-top: 2px solid #763c23;
  /* flex: 1; */
`;

const LayoutContent = styled.div`
  flex: 5;
  padding: 10px 0 20px;
`;

const Layout = ({ children, loggedIn }) => {
  return (
    <LayoutWrapper>
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

        <LayoutHeader>
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
            <div>
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
            </div>
          )}
        </LayoutHeader>
        <LayoutContent>{children}</LayoutContent>
        <LayoutFooter>Created by Craig Couture</LayoutFooter>
      </React.Fragment>
    </LayoutWrapper>
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
