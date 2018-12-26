import React from 'react';
import './Fallback.css';

class Fallback extends React.Component {
  render() {
    return (
      <div className="Fallback">
        <h2>HMMM!!!</h2>
        <p>One of two things just happened</p>
        <ol>
          <li>You navigated here on accident</li>
          <li>You are offline and trying to use our full experience</li>
        </ol>
      </div>
    );
  }
}

export default Fallback;
