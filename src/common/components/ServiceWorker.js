import React from 'react';

class ServiceWorker extends React.Component {
  state = { sendMessages: false };
  componentDidMount() {
    this.setState({
      sendMessages: true
    });
  }
  sendMessage = message => {
    const { sendMessages } = this.state;
    if (sendMessages && 'serviceWorker' in navigator) {
      navigator.serviceWorker.controller.postMessage(message);
    }
  };
  render() {
    this.sendMessage(this.props.message);
    return null;
  }
}

export default ServiceWorker;
