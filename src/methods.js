var Http = require("node:http")

module.exports = Http.METHODS.map(function lowerCaseMethod(method) {
    return method.toLowerCase()
  })