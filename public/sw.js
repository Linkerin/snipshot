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
//   event.respondWith(
//     fetch(event.request).catch(() => {
//       caches.match(event.request).then(response => {
//         return response;
//       });
//     })
//   );
// });
