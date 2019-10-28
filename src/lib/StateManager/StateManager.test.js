"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var chai_1 = require("chai");
var StateManager_1 = __importDefault(require("./StateManager"));
var Dispatcher_1 = __importDefault(require("./Dispatcher"));
jest.mock('./Dispatcher');
function mockDispatcher(object, methods) {
    return Object.keys(methods).map(function (key) {
        object[key].mockClear();
        return object[key].mockImplementation(methods[key]);
    });
}
describe('StateManager', function () {
    afterEach(function () {
        jest.restoreAllMocks();
    });
    describe('addStateChangeListener', function () {
        it('should call dispatcher.register with passed parameters', function () {
            var stateScope = ['init'];
            var componentName = 'TestComponent';
            var callback = function () { return true; };
            var dispatcherRegister = jest.fn();
            mockDispatcher(Dispatcher_1.default, { register: dispatcherRegister });
            StateManager_1.default.addStateChangeListener(stateScope, componentName, callback);
            chai_1.expect(dispatcherRegister.mock.calls).to.have.length(1);
            chai_1.expect(dispatcherRegister.mock.calls[0]).to.deep.equal([stateScope, componentName, callback]);
        });
    });
    describe('removeStateChangeListener', function () {
        it('should call dispatcher.undergister with passed parameters', function () {
            var stateScope = ['init'];
            var componentName = 'TestComponent';
            var dispatcherUnregister = jest.fn();
            mockDispatcher(Dispatcher_1.default, { undergister: dispatcherUnregister });
            StateManager_1.default.removeStateChangeListener(stateScope, componentName);
            chai_1.expect(dispatcherUnregister.mock.calls).to.have.length(1);
            chai_1.expect(dispatcherUnregister.mock.calls[0]).to.deep.equal([stateScope, componentName]);
        });
    });
    describe('registerStore', function () {
        it('should apply initialize specified in store scope from an application state with specified in store value', function () {
            var scope = ['incidents'];
            var scopeValue = immutable_1.List();
            var store = {
                getStateScope: function () { return scope; },
                getInitialState: function () { return scopeValue; },
                getActions: function () { return ({}); }
            };
            var initialState = StateManager_1.default.getState();
            StateManager_1.default.registerStore(store);
            var resultState = StateManager_1.default.getState();
            chai_1.expect(initialState).to.equal(immutable_1.Map());
            chai_1.expect(resultState.toJS()).to.deep.equal(({ incidents: [] }));
        });
        it('should return a set of actions with same names as in store', function () {
            var scope = ['incidents'];
            var scopeValue = immutable_1.List();
            var store = {
                getStateScope: function () { return scope; },
                getInitialState: function () { return scopeValue; },
                getActions: function () { return ({
                    testAction1: function (state) { return true; },
                    testAction2: function (state) { return false; }
                }); }
            };
            var actions = StateManager_1.default.registerStore(store);
            chai_1.expect(Object.keys(actions)).to.deep.equal(['testAction1', 'testAction2']);
        });
    });
});
//# sourceMappingURL=StateManager.test.js.map