import React, { Component } from 'react';

const iOSShareBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAActpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgSW1hZ2VSZWFkeTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KKS7NPQAAAsxJREFUSA2lVjFrFFEQnnm7l2iiF2LuEggWImchFjb5B4KFhZ3+AC1io1hZJedyYGNjERANaB9FG0FBBGuLIBamukYQRXN4GnKSy+6+cebt283buz3dmIF3O2/ezHwz82ZnD+BfdIm8VKW+vLsmK92Dc5bJ9sUEpFL9+nL4bPYOkSzhUzk4OpnMYdDh86wYBqjFQU1HrxGoDoA9qzRBAJ2O8s+nOuaZ92B2xQBECIh0JqCxbzp6yUpnp7r+8a1j8WMADdUfn678mj7xmUE+zCn/wscAd8HaDGJkJRg8kH0XvvqI8A6VPtdewT6LjrCfo+2VU32RyVkXwC+yHSHjyCUSWQW1rTej57KGjEU3tQO2dchBlwMk2DvmCpQkc1eurvXFogTgCbfiZYxrSzsXUal7DBQDmPaMEPiOgR51WpVbLMsCqjXDuwrwKoHuAChuZdJiQ6Budlr4AqzPxOANyF3EgF6DL/ckkb7GNpMQx2I0gYjvJT5OjvcJcRe8JaKfnOZv8FCB1j1E7wEQNIyG9ZkAzLNYCBUh6Y3N1thDsx/4YaUMYLPlv+JjWRnNNsMbnEGytz6zlFMtjuqw4blF4UsC3BgHJV1Ezg01rtN4u28B5zk5blVju3eHxk0egDRnbrO5DaG8C6LVDpLac6mSTEU2wyUNMDJeTNcxJ7biw6E8gHNQxHKEOeMiHSmzK98XACobsethkD9gBtOD/ob2/5mB6R6llPsWZx01BOIIypXITtXvAd43tumkdRyNYssBiLWApB+YQN70clQeQPw9Le84hf/ruE6VDvLMZ2A6wLbx4rrPA6vURcLiugQa8tAbiiUPwOORh1ZS39WFEFaH9EcJEhsSW/4MOZQDQB2LQnVmiU77GFYjz44Nx6CI9XkOR1TZ4t8qT4sEzCrmAFi2rSb9OdyBDVIVyP6vFHl1ZPLl8LiYeMgH3Qu3nSP4A9EHFXrGnVaNAAAAAElFTkSuQmCC';
const closeBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAAl0lEQVR4Ae2TMQ6DMBTFfA+kHqkSUmcKgd5/BIaEqsOfWqyILgx4jewl/3FxSm74q8ODlcQeL1Za769sFNKOXthYaBAS5Wci9ExH4AlG143xKxH6k0oiMbluTEQi9B5BEpW6fNtHH+CfQCEd13PcxVF9IHnC9V6us1qvTsjVScJ1SeicM53MbKZBaFlkcYmZO473aTghF2/X9XbQ39L36gAAAABJRU5ErkJggg==';

const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};
// Detects if device is in standalone mode
const isInStandaloneMode = () =>
  'standalone' in window.navigator && window.navigator.standalone;

class AddToHomeScreen extends Component {
  state = {
    visible: false
  };
  componentDidMount() {
    this.setState({
      visible: isIos() && !isInStandaloneMode()
      // visible: true
    });
  }

  handleClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: this.state.visible ? 'inline-block' : 'none',
          color: '#333'
        }}
      >
        <div
          style={{
            height: 100,
            padding: 10,
            fontSize: '10pt',
            background: '#F5F5F4',
            width: '280px',
            border: '1px solid #333',
            lineHeight: '30px'
          }}
        >
          <span>
            Install this web app on your iPhone for the best experience. It's
            easy, just tap{' '}
          </span>
          <img
            alt="ios share button"
            style={{ verticalAlign: 'top' }}
            src={`data:image/png;base64,${iOSShareBase64}`}
          />
          <span> and then "Add to Home Screen".</span>
        </div>
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderTop: '20px solid #333',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderTop: '20px solid #F5F5F4',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '-19px'
          }}
        />
        <img
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 16,
            height: 16,
            padding: 5,
            cursor: 'pointer'
          }}
          alt="ios close button"
          src={`data:image/png;base64,${closeBase64}`}
          onClick={this.handleClose}
        />
      </div>
    );
  }
}
export default AddToHomeScreen;
