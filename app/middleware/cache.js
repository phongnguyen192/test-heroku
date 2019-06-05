'use strict';
const NodeCache = require('node-cache')

// stdTTL: time to live in seconds for every generated cache element.
const cache = new NodeCache({ stdTTL: 60 * 60 })

function set(key, value) {
  cache.set(key, value)
  return;
}

function get(key) {
  const content = cache.get(key)
  if (content) {
    return content;
  }
  return null;
}

module.exports = { get, set }