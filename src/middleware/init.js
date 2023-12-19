exports.init = function(app) {
    return function expressInit(request, response, next) {
        Object.setPrototypeOf(response, app.response)
        next();
    }
}