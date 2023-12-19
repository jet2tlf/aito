const Mixin = require("merge-descriptors");
const Http = require("node:http");
const Proto = require("./app");

exports = module.exports = createApplication;

function createApplication() {
    const app = function (request, response, next) { app.handle(request, response, next); };

    Mixin(app, Proto, false);

    const res = Object.create(Http.ServerResponse.prototype);

    res.send = function (body) {
        if (typeof body === "object") {
            this.json(body);
        } else if (typeof body === "string") {
            this.setHeader("Content-Type", "text/plain");
            this.end(body, "utf8");
        }

        return this;
    };

    res.json = function (body) {
        this.setHeader("Content-Type", "application/json");
        return this.send(JSON.stringify(body));
    };

    app.response = Object.create(res, {
        app: {
            configurable: true,
            enumerable: true,
            writable: true,
            value: app,
        },
    });

    app.init();
    return app;
}

exports.app = Proto;
