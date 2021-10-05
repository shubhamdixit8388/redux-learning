import store from "./store";
import { addBug, removeBug, resolveBug } from "./actions";

store.subscribe(() => {
  console.log("Store Changed:", store.getState());
});

store.dispatch(addBug("Bug 1"));
store.dispatch(resolveBug(1));
store.dispatch(removeBug(1));

console.log(store.getState());
