const VERSION = 'v0.1';
const CACHE_NAME = `offline-cache-${VERSION}`;
const RESOURCES = [
  '/',
  '/add',
  '/about',
  '/settings',
  '/#languages',
  '/#search',
  '/legal/privacy-policy',
  '/legal/terms-of-service',
  '/favicons/pwa-192x192.png',
  '/favicons/pwa-512x512.png',
  '/favicons/site.webmanifest',
  '/images/GuestAvatar.svg',
  '/images/LeiaFox.webp',
  '/images/LogoDark.svg',
  '/images/LogoLight.svg',
  '/images/Repair.webp',
  '/images/YogaSloth.webp'
];

// Install phase
const preCache = async resources => {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(resources);
  } catch (err) {
    throw new Error(err);
  }
};

self.addEventListener('install', event => {
  event.waitUntil(preCache(RESOURCES));
});

// Activate phase
self.addEventListener('activate', async event => {
  await caches.delete('offline-cache-1');
});

// Fetching block
const putInCache = async (request, response) => {
  if (request.method !== 'GET') return;

  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

const fetchRequest = async request => {
  const networkResponse = await fetch(request);
  await putInCache(request, networkResponse.clone());

  return networkResponse;
};

const staleWhileRevalidate = async request => {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      // Serve cached response while revalidating
      fetchRequest(request);
      return cachedResponse;
    }

    // If no cached response, fetch from network and cache
    const networkResponse = await fetchRequest(request);

    return networkResponse;
  } catch (err) {
    throw new Error(err);
  }
};

// self.addEventListener('fetch', async event => {
//   event.respondWith(staleWhileRevalidate(event.request));
// });
