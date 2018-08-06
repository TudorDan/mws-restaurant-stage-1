//fill initial info in the cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('rest-rev-app-v1').then(function(cache) {
      return cache.addAll([
        './',
        './restaurant.html',
        './restaurant_missing.html',
        './index.html',
        './css/styles.css',
        './data/restaurants.json',
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg',
        './img/6.jpg',
        './img/7.jpg',
        './img/8.jpg',
        './img/9.jpg',
        './img/10.jpg',
        './js/dbhelper.js',
        './js/main.js',
        './js/restaurant_info.js'
      ]);
    })
  );
});

//intercept fetch event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    //if the request is cached, serve it
    caches.match(event.request).then(function(resp) {
      return resp ||

      //if the request is not cached then fetch and cache it
      fetch(event.request).then(function(response) {
        return caches.open('rest-rev-app-v1').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }).catch(function(error) {
      //if fetch fails return custom page with error message
      return fetch('./restaurant_missing.html');
    })
  );
});