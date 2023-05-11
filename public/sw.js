'use strict';

const version = 'v0.2';
const CACHE_LABEL = 'offline-cache';
const CACHE_NAME = `${CACHE_LABEL}-${version}`;
const RESOURCES = [
  '/',
  '/offline',
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
const clearCaches = async () => {
  const keys = await caches.keys();
  keys.forEach(async key => {
    if (key !== CACHE_NAME) {
      await caches.delete(key);
    }
  });
};

self.addEventListener('activate', async event => {
  event.waitUntil(clearCaches());
});

// Fetching block
const putInCache = async (request, response) => {
  if (request.method !== 'GET') return;

  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

const fetchRequest = async request => {
  const networkResponse = await fetch(request);
  if (!networkResponse.ok) {
    throw new Error(await networkResponse.json());
  }

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
//   const staticDataRegexp = new RegExp(/\.(?:json|xml|csv)/i);
//   const authRegexp = new RegExp('supabase.co/auth');
// });
