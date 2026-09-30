const CACHE_NAME = "eugene-pwa-v3";
const APP_SHELL = [
    "./",
    "./index.html",
    "./manifest.webmanifest",
    "./styles/styles.css",
    "./styles/app-styles.css",
    "./scripts/jquery-1.11.0.min.js",
    "./scripts/jqtouch.min.js",
    "./scripts/jqtouch-jquery.min.js",
    "./scripts/jquery.jnotify.js",
    "./scripts/xhr.js",
    "./scripts/chess.js",
    "./scripts/defaults.js",
    "./scripts/app.js",
    "./scripts/pwa.js",
    "./scripts/fastclick.js",
    "./images/players/eugene.svg",
    "./images/icon.png",
    "./apple-touch-icon.png"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(APP_SHELL);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") {
        return;
    }

    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin !== self.location.origin) {
        return;
    }

    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request).catch(function () {
                return caches.match("./index.html");
            })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).then(function (networkResponse) {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
                    return networkResponse;
                }

                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            });
        })
    );
});
