"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var events_1 = require("events");
var eventHandlers = immutable_1.Map();
var Dispatcher = /** @class */ (function (_super) {
    __extends(Dispatcher, _super);
    function Dispatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dispatcher.prototype.register = function (subscribedStateScope, componentName, callback) {
        var _this = this;
        var eventHandler = function (changedStateScope, state) {
            var isSubscribedScope = _this._isScopesEqual(subscribedStateScope, changedStateScope);
            if (isSubscribedScope)
                callback(state);
        };
        eventHandlers.setIn(__spreadArrays(subscribedStateScope, [componentName]), eventHandler);
        this.on('change', eventHandler);
    };
    Dispatcher.prototype.undergister = function (subscribedStateScope, componentName) {
        var eventHandler = eventHandlers.getIn(__spreadArrays(subscribedStateScope, [componentName]));
        if (eventHandler) {
            this.off('change', eventHandler);
            eventHandlers = eventHandlers.removeIn(__spreadArrays(subscribedStateScope, [componentName]));
        }
    };
    Dispatcher.prototype.dispatch = function (stateScope, state) {
        this.emit('change', stateScope, state);
    };
    Dispatcher.prototype._isScopesEqual = function (scope1, scope2) {
        if (scope1.length !== scope2.length)
            return true;
        return scope1.every(function (key) { return scope2.includes(key); });
    };
    return Dispatcher;
}(events_1.EventEmitter));
exports.default = new Dispatcher();
//# sourceMappingURL=Dispatcher.js.map