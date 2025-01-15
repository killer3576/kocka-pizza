const CACHE_NAME = "barvomat-cache-v1";
const urlsToCache = [
  "/",
  "/kocka.html",
  "/kocka.css",
  "/kocka.js",
  "/manifest.json",
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-144x144.png",
  "/icons/icon-192x192.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png",
  "https://cdn.jsdelivr.net/npm/quasar@2.16.5/dist/quasar.prod.css",
  "https://cdn.jsdelivr.net/npm/vue@3.4.31/dist/vue.global.js",
  "https://cdn.jsdelivr.net/npm/quasar@2.16.5/dist/quasar.umd.js"
];

// Instalace Service Workeru
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache otevřena");
      return cache.addAll(urlsToCache);
    })
  );
});

// Aktivace Service Workeru
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Odstraňuji staré cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Zachytávání požadavků a návrat dat z cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Pokud je odpověď v cache, vrátí ji, jinak načte z internetu
      return response || fetch(event.request);
    })
  );
});
