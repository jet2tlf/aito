const Http = require("node:http");
const Methods = require("./methods");
const Router = require("./router");
const middleware = require("./middleware/init");

const slice = Array.prototype.slice;

const app = exports = module.exports = {};

app.init = function() {
    this.cache = {};
    this.engines = {};
    this.settings = {};

    this._router = undefined;
}

app.lazyRouter = function() {
    if (!this._router) { this._router = new Router({}) }

    this._router.use(middleware.init(this))
}

app.listen = function listen() {
    var server = Http.createServer(this);
    return server.listen.apply(server, arguments);
};

app.handle = function(request, response, callback) {
    const router = this._router;

    router.handle(request, response);
}

Methods.forEach(function (method) {
    app[method] = function(path) {
        this.lazyRouter();

        const route = this._router.route(path);

        route[method].apply(route, slice.call(arguments, 1));
        return this;
    }
})