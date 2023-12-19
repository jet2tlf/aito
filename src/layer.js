module.exports = Layer;

function Layer(path, options, handle) {
    if (!(this instanceof Layer)) { return new Layer(path, options, handle); }

    this.handle = handle;
    this.name = handle.name || '<anonymous>';
    this.params = undefined;
    this.path = undefined;
}

Layer.prototype.handle_request = function(request, response, next) {
    const handle = this.handle;

    try {
        handle(request, response, next);
    } catch(err) {
        console.error(err)
    }
}

Layer.prototype.match = function(path) {
    if (this.route && this.route.path === path || this.name === "expressInit") { return true; }

    return false;
}