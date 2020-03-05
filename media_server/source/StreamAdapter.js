const ee = require("events");

const StreamAdapter = {
    _emiter: new ee.EventEmitter(),

    get emiter() {
        return this._emiter;
    }
};

module.exports = StreamAdapter;