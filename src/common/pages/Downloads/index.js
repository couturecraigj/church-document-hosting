import React from "react";
import "./Downloads.css";

class Downloads extends React.Component {
  render() {
    return (
      <div className="Downloads">
        <h2>Downloads</h2>
        <ul>
          <li>
            <div>2018.11.18</div>
            <div>
              <a href="?s=#">Prayer Guide</a>
              <span> | </span>
              <a href="?s=#">Bulletin</a>
            </div>
          </li>
          <li>
            <div>2018.11.11</div>
            <div>
              <a href="?s=#">Prayer Guide</a>
              <span> | </span>
              <a href="?s=#">Bulletin</a>
            </div>
          </li>
          <li>
            <div>2018.11.4</div>
            <div>
              <a href="?s=#">Prayer Guide</a>
              <span> | </span>
              <a href="?s=#">Bulletin</a>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Downloads;
