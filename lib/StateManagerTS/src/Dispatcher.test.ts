import { Map } 		from 'immutable';
import { expect } from 'chai';
import dispatcher from './Dispatcher';

describe('StateManager/Dispatcher', function() {
	afterEach(() => {
    jest.restoreAllMocks();
  });

	describe('_isScopesEqual', () => {
		it('should compare to state paths and return true when they are equal', () => {
			const scope1 = ['incidents', 'list'];
			const scope2 = ['incidents', 'list'];

			const isSameScope = dispatcher._isScopesEqual(scope1, scope2);
			expect(isSameScope).to.equal(true);
		});

		it('should compare to state paths and return false when they are not equal', () => {
			const scope1 = ['incidents', 'list'];
			const scope2 = ['incidents', 'list1'];

			const isSameScope = dispatcher._isScopesEqual(scope1, scope2);
			expect(isSameScope).to.equal(false);
		});

		it('should return false when passed scopes have different length', () => {
			const scope1 = ['incidents', 'list'];
			const scope2 = ['list'];

			const isSameScope = dispatcher._isScopesEqual(scope1, scope2);
			expect(isSameScope).to.equal(false);
		});
	});

	describe('dispatch', () => {
		it('should call subscribed for scope callback', () => {
			const callback = jest.fn();
			dispatcher.register(['incidents'], 'TestComponent', callback);
			dispatcher.dispatch(['incidents'], Map());

			expect(callback.mock.calls).to.have.length(1);
		});

		it('should not call not subscribed for scope callback', () => {
			const callback = jest.fn();
			dispatcher.register(['incidents'], 'TestComponent', callback);
			dispatcher.dispatch(['incidents1'], Map());

			expect(callback.mock.calls).to.have.length(0);
		});
	});
});
