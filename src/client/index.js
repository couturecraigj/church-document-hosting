import App from '../common/App';
import { loadComponents } from 'loadable-components';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { StripeProvider } from 'react-stripe-elements';
import { ApolloProvider } from 'react-apollo';
import createClient from '../common/apollo';
import { HttpLink } from 'apollo-link-http';
import React from 'react';
import { hydrate } from 'react-dom';

const stripeKey = process.env.RAZZLE_STRIPE_PUBLISHABLE_KEY;
let deferredPrompt;

window.addEventListener('beforeinstallprompt', e => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  // e.preventDefault();
  console.log(e);
  deferredPrompt = e;
  deferredPrompt.prompt();
});

window.addEventListener('appinstalled', evt => {
  console.log(evt);
});

if ('serviceWorker' in navigator) {
  const receiveMessage = event => {
    // eslint-disable-next-line no-restricted-globals
    if (![location.origin, 'http://localhost:3001'].includes(event.origin))
      return;
    console.log(event.data);
  };
  navigator.serviceWorker.register('/sw.js');
  navigator.serviceWorker.addEventListener('message', receiveMessage);
}
loadComponents().then(() => {
  const currentState = window.__APOLLO_STATE__;
  const client = createClient({
    ssrForceFetchDelay: 100,
    currentState,
    link: new HttpLink({
      uri: '/graphql',
      credentials: 'same-origin'
    })
  });
  hydrate(
    <ApolloProvider client={client}>
      <StripeProvider apiKey={stripeKey}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StripeProvider>
    </ApolloProvider>,
    document.getElementById('root')
  );
});

if (module.hot) {
  module.hot.accept();
}
