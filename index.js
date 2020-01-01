const serverless = require("serverless-http")
const binaryMimeTypes = require("./binaryMimeTypes")
const nuxt = require("./nuxt")

module.exports.nuxt = serverless(nuxt, {
  binary: binaryMimeTypes,
})
