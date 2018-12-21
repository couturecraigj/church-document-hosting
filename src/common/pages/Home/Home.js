import React from 'react';
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <h2>Home</h2>
        <p className="Home-intro">
          Welcome to the Crossway Church of Keene App
        </p>
        <p>
          We are so glad you came we are really looking forward to showing you
          around
        </p>
        <p>
          Some of our sections require that you log in so please try to get a
          log in and we will be able to give you some direction
        </p>
      </div>
    );
  }
}

export default Home;
