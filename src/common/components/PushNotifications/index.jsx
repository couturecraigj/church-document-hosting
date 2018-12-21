import React from 'react';
// import PropType from 'prop-types'
import {withApollo} from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components';
import {queryMe} from '../Layout'

const GET_PUSHES = gql`
  mutation GetPushes($input: SubscriptionInput!) {
    getPushes(input: $input)
  }
`

// const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

const Button = styled.button`
  background: #ccc;
  &:disabled {
    background: #999;
  }
`;

const PushNotificationButton = ({ registered, available, ...props }) => {
  if (!available) return null;
  return (
    <Button {...props}>
      {registered ? 'Disable Push Notifications' : 'Enable Push Notifications'}
    </Button>
  );
};

class RegisterPushNotifications extends React.Component {
  state = {
    available: false,
    disabled: true,
    registered: false
  };
  componentDidMount() {
    setTimeout(this.isAvailable, 1000);
  }
  getSubscription = async () => {
    let registered = false;
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    const subscription = await serviceWorkerRegistration.pushManager.getSubscription();
    if (subscription) {
      registered = true;
      this.sendSubscriptionToServer(subscription);
    }
    this.setState({
      disabled: false,
      available: true,
      registered
    });
  };
  urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };
  sendSubscriptionToServer = async subscription => {
    const {client} = this.props
    const { me } = client.readQuery({query: queryMe})
    if (me) {
      await client.mutate({ mutation: GET_PUSHES, variables: { input: subscription, userId: me.id}})
    } 

    this.setState({
      disabled: false,
      registered: true
    });
  };
  onClick = () => {
    const { registered } = this.state;
    if (registered) {
      this.unsubscribe();
    } else {
      this.subscribe();
    }
  };
  subscribe = async () => {
    const { serverApiKey } = this.props;
    this.setState({
      disabled: true
    });
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;
      const subscription = await serviceWorkerRegistration.pushManager.subscribe(
        {
          userVisibleOnly: true,
          applicationServerKey: this.urlB64ToUint8Array(serverApiKey)
        }
      );

      this.sendSubscriptionToServer(subscription);
    } catch (error) {
      if (Notification.permission === 'denied') {
        // TODO: Create an alert
        this.setState({
          disabled: false
        });
        // eslint-disable-next-line no-console
        console.log('Permission for Notifications was denied');
      } else {
        // eslint-disable-next-line no-console
        console.log('Unable to subscribe to push.', error);
        this.setState({
          disabled: false
        });
      }
    }
  };
  unsubscribe = async () => {
    this.setState({
      disabled: true
    });
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;
      const pushSubscription = await serviceWorkerRegistration.pushManager.getSubscription();
      if (!pushSubscription) {
        return this.setState({
          registered: false,
          disabled: false
        });
      }
      try {
        await pushSubscription.unsubscribe();
        this.setState({
          registered: false
        });
      } catch (error) {
        //
      }
      this.setState({
        disabled: false
      });
    } catch (error) {
      console.error(error);
    }
  };
  isAvailable = () => {
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) return;
    if (!('PushManager' in window)) return;
    this.getSubscription();
  };
  render() {
    const { available, disabled, registered } = this.state;
    return (
      <PushNotificationButton
        onClick={this.onClick}
        available={available}
        registered={registered}
        disabled={disabled}
      />
    );
  }
}

export default withApollo(RegisterPushNotifications);
