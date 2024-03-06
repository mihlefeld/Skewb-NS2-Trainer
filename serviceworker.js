const trainerCache = "oll-cache-v1";

const putInCache = async (request, response) => {
    const cache = await caches.open(trainerCache);
    await cache.put(request, response);
};

const cacheFirst = async ({ request, fallbackUrl }) => {
    // First try to get the resource from the cache.
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }

    // If the response was not found in the cache,
    // try to get the resource from the network.
    try {
        const responseFromNetwork = await fetch(request);
        // If the network request succeeded, clone the response:
        // - put one copy in the cache, for the next time
        // - return the original to the app
        // Cloning is needed because a response can only be consumed once.
        putInCache(request, responseFromNetwork.clone());
        return responseFromNetwork;
    } catch (error) {
        // If the network request failed,
        // get the fallback response from the cache.
        const fallbackResponse = await caches.match(fallbackUrl);
        if (fallbackResponse) {
            return fallbackResponse;
        }
        // When even the fallback response is not available,
        // there is nothing we can do, but we must always
        // return a Response object.
        return new Response("Network error happened", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
        });
    }
};

self.addEventListener("fetch", (event) => {
    event.respondWith(
        cacheFirst({
            request: event.request,
            fallbackUrl: "/Skewb-NS2-Trainer/index.html",
        }),
    );
});

var assets = [
  "/Skewb-NS2-Trainer",
  "/Skewb-NS2-Trainer/index.html",
  "/Skewb-NS2-Trainer/icon.png",
  "/Skewb-NS2-Trainer/styles/hint.css",
  "/Skewb-NS2-Trainer/styles/main.css",
  "/Skewb-NS2-Trainer/styles/selection.css",
  "/Skewb-NS2-Trainer/styles/settings.css",
  "/Skewb-NS2-Trainer/styles/timer.css",
  "/Skewb-NS2-Trainer/scripts/algsinfo.js",
  "/Skewb-NS2-Trainer/scripts/algsmap.js",
  "/Skewb-NS2-Trainer/scripts/main.js",
  "/Skewb-NS2-Trainer/scripts/practice.js",
  "/Skewb-NS2-Trainer/scripts/saveload.js",
  "/Skewb-NS2-Trainer/scripts/selection.js",
  "/Skewb-NS2-Trainer/scripts/settings.js",
  "/Skewb-NS2-Trainer/scripts/timer.js",
  "/Skewb-NS2-Trainer/scripts/utils.js",
  "https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap",
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
  "https://colorjs.io/dist/color.global.js"
]

for (var i = 1; i <= 267; i++) {
    assets.push(`/Skewb-NS2-Trainer/pic/${i}.svg`)
}

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(trainerCache).then(cache => {
      cache.addAll(assets)
    })
  )
})
