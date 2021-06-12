let cache = {};

function set(key, data) {
  cache[key] = {
    data,
    cachedAt: new Date().getTime()
  }
}

function get(key, async = false) {
  if (async) {
    return new Promise(resolve => {
      resolve(cache[key] && cache[key].cachedAt + 15*60*1000 > new Date().getTime()
              ? cache[key].data
              : null);
    });
  } else {
    return cache[key] && cache[key].cachedAt + 15*60*1000 > new Date().getTime()
    ? cache[key].data
    : null
  }
}

function clear(key) {
  delete cache[key];
}

function erase() {
  cache = {};
}

function getCache() {
  return cache;
}

export default {
  get,
  set,
  clear,
  erase,
  getCache
}