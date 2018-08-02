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
