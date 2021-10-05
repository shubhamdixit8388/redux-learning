import configureStore from "./store/configure-store";
import customStore from "./store/custom-store";
import * as actions from "./store/bugs";

const store = configureStore();

store.subscribe(() => {
  // console.log("Store Changed:", store.getState());
});

store.dispatch(actions.addBug("Bug 1"));
store.dispatch(actions.resolveBug(1));
store.dispatch(actions.removeBug(1));

// console.log(store.getState());

customStore.subscribe(() => {
  console.log("Custom Store Changed:", customStore.getState());
});

customStore.dispatch(actions.addBug("Bug 1"));
console.log(customStore.getState());
