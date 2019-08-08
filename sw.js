/**
 * Initializes the cache name
 */
const cacheName = "to-do-pwa";

/**
 * files to be cached for the native web app
 */
const cacheList = ['./', './index.html', '/css/index.css', './css/materialize.min.css', './js/index.js', './js/jquery-3.3.1.min.js', './js/materialize.min.js', './image/favi.png'];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => {
        return cache.addAll(cacheList);
    }).catch((err) => {
        console.log("Error Adding Cache : ", err);
    }));
});

self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        return response || fetch(event.request);
    }).catch((err) => {
        console.log("Error fecthing cache : ", err);
    }));
})