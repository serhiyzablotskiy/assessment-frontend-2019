"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var chai_1 = require("chai");
var Dispatcher_1 = __importDefault(require("./Dispatcher"));
describe('StateManager/Dispatcher', function () {
    afterEach(function () {
        jest.restoreAllMocks();
    });
    describe('_isScopesEqual', function () {
        it('should compare to state paths and return true when they are equal', function () {
            var scope1 = ['incidents', 'list'];
            var scope2 = ['incidents', 'list'];
            var isSameScope = Dispatcher_1.default._isScopesEqual(scope1, scope2);
            chai_1.expect(isSameScope).to.equal(true);
        });
        it('should compare to state paths and return false when they are not equal', function () {
            var scope1 = ['incidents', 'list'];
            var scope2 = ['incidents', 'list1'];
            var isSameScope = Dispatcher_1.default._isScopesEqual(scope1, scope2);
            chai_1.expect(isSameScope).to.equal(false);
        });
        it('should return false when passed scopes have different length', function () {
            var scope1 = ['incidents', 'list'];
            var scope2 = ['list'];
            var isSameScope = Dispatcher_1.default._isScopesEqual(scope1, scope2);
            chai_1.expect(isSameScope).to.equal(false);
        });
    });
    describe('dispatch', function () {
        it('should call subscribed for scope callback', function () {
            var callback = jest.fn();
            Dispatcher_1.default.register(['incidents'], 'TestComponent', callback);
            Dispatcher_1.default.dispatch(['incidents'], immutable_1.Map());
            chai_1.expect(callback.mock.calls).to.have.length(1);
        });
        it('should not call not subscribed for scope callback', function () {
            var callback = jest.fn();
            Dispatcher_1.default.register(['incidents'], 'TestComponent', callback);
            Dispatcher_1.default.dispatch(['incidents1'], immutable_1.Map());
            chai_1.expect(callback.mock.calls).to.have.length(0);
        });
    });
});
//# sourceMappingURL=Dispatcher.test.js.map