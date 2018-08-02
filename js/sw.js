self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('rest-rev-app-v1').then(function(cache) {
      return cache.addAll([
        '/',
        'js/',
        'css/',
        'img/',
        'data/'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});