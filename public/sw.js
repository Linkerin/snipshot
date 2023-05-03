const CACHE_NAME = 'offline-cache';
const urlsToCache = [
  '/',
  '/favicons/pwa-192x192.png',
  '/favicons/pwa-512x512.png',
  '/icons/add.png',
  '/icons/info.png',
  '/images/GuestAvatar.svg',
  '/images/LeiaFox.webp',
  '/images/LogoDark.svg',
  '/images/LogoLight.svg',
  '/images/Repair.webp',
  '/images/YogaSloth.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      return cache.addAll(urlsToCache);
    } catch (err) {
      const log = (await import('next-axiom')).log;
      log.err('Initial cache loading failed', { err });
    }
  });
});

// self.addEventListener('fetch', event => {
//   event.respondWith(async () => {
//     try {
//         const cachedResponse = await caches.match(event.request);
//         const networkFetch = fetch(event.request);

//               if (cachedResponse) {
//         return cachedResponse;
//       }

//         const response = await networkFetch;
//         const responseClone = response.clone();

//         const cache = await caches.open(url.seachParams.get('name'));
//         cache.put(event.request, responseClone);

//         return response;

//       if (cachedResponse) {
//         return cachedResponse;
//       }
//     //   return fetch(event.request);
//     } catch (err) {
//       const log = (await import('next-axiom')).log;
//       log.err('Fetch request caching failed', { err, request: event.request });
//     }
//   });
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request).then(cachedResponse => {
//       const networkFetch = fetch(event.request)
//         .then(response => {
//           // update the cache with a clone of the network response
//           const responseClone = response.clone();
//           caches.open(url.searchParams.get('name')).then(cache => {
//             cache.put(event.request, responseClone);
//           });
//           return response;
//         })
//         .catch(function (reason) {
//           console.error('ServiceWorker fetch failed: ', reason);
//         });
//       // prioritize cached response over network
//       return cachedResponse || networkFetch;
//     })
//   );
// });
