const cacheName = "to-do-pwa";
const cacheList = ['./', './index.html', './css/', './js/', './image/favi.png'];

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