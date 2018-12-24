import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ResetPassword from '../pages/Login/ResetPassword';
import Offering from '../pages/Offering';
import Documents from '../pages/Documents';
import Document from '../pages/Documents/Single';
import UserList from '../pages/User/List';
import User from '../pages/User/Single';
import NewUser from '../pages/User/New';
import Me from '../pages/Me';
import Layout from '../components/Layout';
import AddToHomeScreen from '../components/AddToHomeScreen';

const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/account/login" component={Login} />
      <Route exact path="/documents" component={Documents} />
      <Route exact path="/document/:id" component={Document} />
      <Route exact path="/offering" component={Offering} />
      <Route exact path="/user/new" component={NewUser} />
      <Route exact path="/user/list" component={UserList} />
      <Route exact path="/user/:id" component={User} />
      <Route exact path="/me" component={Me} />
      <Route
        exact
        path="/account/password-reset/:token"
        component={ResetPassword}
      />
    </Switch>
    <AddToHomeScreen />
  </Layout>
);

export default App;
