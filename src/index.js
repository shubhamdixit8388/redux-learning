import store from "./store";
import customStore from "./custom-store";
import * as actions from "./actions";

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
