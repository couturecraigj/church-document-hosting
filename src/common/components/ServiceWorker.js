import React from 'react';

class ServiceWorker extends React.Component {
  state = { sendMessages: false };
  componentDidMount() {
    this.setState({
      sendMessages: true
    });
  }
  sendMessage = async message => {
    const { sendMessages } = this.state;
    if (sendMessages && 'serviceWorker' in navigator) {
      await navigator.serviceWorker.ready;
      if (navigator.serviceWorker.controller)
        navigator.serviceWorker.controller.postMessage(message);
    }
  };
  render() {
    this.sendMessage(this.props.message);
    return null;
  }
}

export default ServiceWorker;
