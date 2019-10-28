"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var Dispatcher_1 = __importDefault(require("./Dispatcher"));
var applicationState = immutable_1.Map();
;
var StateManager = /** @class */ (function () {
    function StateManager() {
        this.addStateChangeListener = function (stateScope, componentName, callback) {
            Dispatcher_1.default.register(stateScope, componentName, callback);
        };
        this.removeStateChangeListener = function (stateScope, componentName) {
            Dispatcher_1.default.undergister(stateScope, componentName);
        };
        this.getState = function (stateScope) {
            if (stateScope === void 0) { stateScope = []; }
            return applicationState.getIn(stateScope);
        };
    }
    StateManager.prototype.registerStore = function (store) {
        var stateScope = store.getStateScope();
        var initialState = store.getInitialState();
        var actions = store.getActions();
        var createActionWithState = function (action) { return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            applicationState = applicationState.updateIn(stateScope, function (storeState) {
                return action.call.apply(action, __spreadArrays([store, storeState], args));
            });
            Dispatcher_1.default.dispatch(stateScope, applicationState.getIn(stateScope));
            return applicationState;
        }; };
        applicationState = applicationState.setIn(stateScope, initialState);
        var initialValue = {};
        var actionNames = Object.keys(actions);
        var result = actionNames.reduce(function (memo, actionName) {
            var action = actions[actionName];
            memo[actionName] = createActionWithState(action);
            return memo;
        }, initialValue);
        return result;
    };
    return StateManager;
}());
exports.default = new StateManager();
//# sourceMappingURL=StateManager.js.map