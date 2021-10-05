import reducer from "./bugs";

function customStore() {
  let state = [];
  let listeners = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action);
    // Call reducer to get new state

    // notify with subsscriber method
    for (let listener of listeners) listener();
    return state;
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export default customStore();
