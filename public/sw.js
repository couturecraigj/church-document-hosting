/* eslint-env serviceworker */
/* global self */
/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'v5';

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

self.addEventListener('fetch', function(event) {
  // event.respondWith(
  //   caches.match(event.request).then(function(resp) {
  //     console.log(resp);
  //     return (
  //       resp ||
  //       fetch(event.request).then(function(response) {
  //         return caches.open(CACHE_NAME).then(function(cache) {
  //           cache.put(event.request, response.clone());
  //           return response;
  //         });
  //       })
  //     );
  //   })
  // );
});

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  const { title, body } = event.data.json();

  console.log(title, body);

  // const title = 'Push Codelab';
  const options = {
    body,
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(clients.openWindow('https://developers.google.com/web/'));
});
