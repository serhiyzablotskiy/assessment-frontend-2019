import { Map, List }    from 'immutable';
import { expect } from 'chai';
import stateManager from './StateManager';
import dispatcher from './Dispatcher'

jest.mock('./Dispatcher');

function mockDispatcher(object: any, methods: any) {
  return Object.keys(methods).map(key => {
    object[key].mockClear();
    return object[key].mockImplementation(methods[key]);
  });
}

describe('StateManager', function() {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('addStateChangeListener', () => {
    it('should call dispatcher.register with passed parameters', () => {
      const stateScope = ['init'];
      const componentName = 'TestComponent';
      const callback = () => true;
      const dispatcherRegister = jest.fn();

      mockDispatcher(dispatcher, { register: dispatcherRegister })

      stateManager.addStateChangeListener(stateScope, componentName, callback);

      expect(dispatcherRegister.mock.calls).to.have.length(1);
      expect(dispatcherRegister.mock.calls[0]).to.deep.equal([stateScope, componentName, callback]);
    });
  });

  describe('removeStateChangeListener', () => {
    it('should call dispatcher.undergister with passed parameters', () => {
      const stateScope = ['init'];
      const componentName = 'TestComponent';
      const dispatcherUnregister = jest.fn();

      mockDispatcher(dispatcher, { undergister: dispatcherUnregister })

      stateManager.removeStateChangeListener(stateScope, componentName);

      expect(dispatcherUnregister.mock.calls).to.have.length(1);
      expect(dispatcherUnregister.mock.calls[0]).to.deep.equal([stateScope, componentName]);
    });
  });

  describe('registerStore', () => {
    it('should apply initialize specified in store scope from an application state with specified in store value', () => {
      const scope = ['incidents'];
      const scopeValue = List();
      const store = {
        getStateScope: () => scope,
        getInitialState: () => scopeValue,
        getActions: () => ({})
      };

      const initialState = stateManager.getState();
      stateManager.registerStore(store);
      const resultState = stateManager.getState();

      expect(initialState).to.equal(Map());
      expect(resultState.toJS()).to.deep.equal(({ incidents: [] }));
    });

    it('should return a set of actions with same names as in store', () => {
      const scope = ['incidents'];
      const scopeValue = List();
      const store = {
        getStateScope: () => scope,
        getInitialState: () => scopeValue,
        getActions: () => ({
          testAction1: (state: Map<string, any>) => true,
          testAction2: (state: Map<string, any>) => false
        })
      };

      const actions = stateManager.registerStore(store);

      expect(Object.keys(actions)).to.deep.equal(['testAction1', 'testAction2']);
    });
  });
});
