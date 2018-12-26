/* eslint-env serviceworker */
/* global self */
/* eslint-disable no-restricted-globals */

import gql from 'graphql-tag';
import localForage from 'localforage';
import pTimeout from 'p-timeout';

const acceptableRequestOrigins = [
  location.origin,
  'http://localhost:3001',
  'https://js.stripe.com'
];

const CACHE_NAME = process.env.CACHE_HASH;
localForage.config({
  name: 'graphQL',
  storeName: CACHE_NAME
});
self.addEventListener('activate', function(event) {
  var cacheKeeplist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (cacheKeeplist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('install', function(event) {
  // event.waitUntil(
  //   caches.open(CACHE_NAME).then(function(cache) {
  //     return cache.addAll(["/", "/account/login", "/account/signup"]);
  //   })
  // );
});

async function sendMessageToClient(message) {
  const clientList = await self.clients.matchAll();
  clientList.forEach(client => {
    const channel = new MessageChannel();
    client.postMessage(message, [channel.port2]);
  });
}

async function graphqlMutation() {
  console.log('Performing GRAPHQL mutation');
  sendMessageToClient({ msg: 'mutation received' });
  return;
}

async function storeResponse([response, operationName]) {
  console.log('Caching response for slower network');
  let headers = {};
  for (const [key, val] of response.headers.entries()) {
    headers[key] = val;
  }

  localForage.setItem(operationName, {
    blob: await response.blob(),
    headers,
    status: response.status,
    statusText: response.statusText
  });
}

async function graphqlQuery(event, operationName) {
  try {
    const responsePromise = fetch(event.request.clone());
    const timeoutRequest = pTimeout(responsePromise, 500);
    const getStoredBlob = localForage.getItem(operationName);
    return Promise.all([timeoutRequest, getStoredBlob])
      .catch(async () => {
        const blob = await getStoredBlob;
        console.log('No Responses');
        console.log(blob);
        return [null, blob];
      })
      .then(async ([response, storedResponse]) => {
        if (response) {
          console.log('response received in time');
          Promise.resolve([response.clone(), operationName]).then(
            storeResponse
          );
          return response;
        }
        if (storedResponse) {
          const { blob, ...init } = storedResponse;
          console.log('blob found');
          responsePromise.then(response =>
            storeResponse([response, operationName])
          );
          return new Response(blob, init);
        }
        console.log('performing request');
        return responsePromise;
      });
  } catch (error) {
    console.error(error);
    console.error('Error while requesting graphql');
  }
}

async function graphqlFunction(event) {
  const {
    query,
    operationName,
    variables
  } = await event.request.clone().json();
  try {
    const { operation } = gql(query).definitions[0];
    if (operation === 'query')
      return graphqlQuery(
        event,
        `${operationName}-${JSON.stringify(variables)}`
      );
    if (operation === 'mutation') return graphqlMutation(event);
  } catch (error) {
    console.error(error);
    console.error(
      'Cannot parse Query to determine if it is a `mutation` or `query`'
    );
  }
}

async function mutations(event) {
  if (new URL(event.request.url).pathname === '/graphql')
    return graphqlFunction(event);
}

self.addEventListener('fetch', function(event) {
  /**
   * TODO: Set this up to prevent unauthorized requests to other urls
   */
  if (event.request.method !== 'GET') {
    event.respondWith(mutations(event));
  } else {
    event.respondWith(
      (async () => {
        if (
          !acceptableRequestOrigins.some(origin =>
            event.request.url.toString().startsWith(origin)
          )
        ) {
          return new Response(new Blob(['NOT ALLOWED']), {
            status: 500,
            statusText: 'NOT OK',
            headers: {
              'Content-Type': 'text/html'
            }
          });
        }
        const cache = await caches.open(CACHE_NAME);
        const response = await cache.match(event.request);
        const result = fetch(event.request).then(async res => {
          await cache.put(event.request, res.clone());
          return res;
        });
        if (response) {
          console.log('[Service worker] response in cache');
          return response;
        } else return result;
      })()
    );
  }
});

self.addEventListener('message', async function(event) {
  if (event.data.type === 'page-transition') {
    console.log(event.data.path);
    const cache = await caches.open(CACHE_NAME);
    cache.add(event.data.path);
  }
});

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  const { title, body, url } = event.data.json();

  console.log(title, body, url);

  // const title = 'Push Codelab';
  const options = {
    body,
    icon: 'images/icon.png',
    badge: 'images/badge.png',
    data: {
      url
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');
  const { url } = event.notification.data;
  console.log(url);

  event.notification.close();

  event.waitUntil(clients.openWindow(url));
});
