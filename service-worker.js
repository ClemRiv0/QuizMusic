const CACHE_NAME = "quiz-musical-v2";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",

  // Audio principaux
  "./audio1.mp3","./audio2.mp3","./audio3.mp3","./audio4.mp3","./audio5.mp3",
  "./audio6.mp3","./audio7.mp3","./audio8.mp3","./audio9.mp3","./audio10.mp3",
  "./audio11.mp3","./audio12.mp3","./audio13.mp3","./audio14.mp3","./audio15.mp3",
  "./audio16.mp3","./audio17.mp3","./audio18.mp3","./audio19.mp3","./audio20.mp3",

  // Faux audio
  "./fake1.mp3","./fake2.mp3","./fake3.mp3","./fake4.mp3",

  // Icônes
  "./icon-72.png",
  "./icon-96.png",
  "./icon-128.png",
  "./icon-192.png",
  "./icon-512.png"
];

// Installation du service worker et mise en cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activation et nettoyage des anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Interception des requêtes pour servir le cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
});
