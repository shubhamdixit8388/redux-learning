import configureStore from "./store/configure-store";
import customStore from "./store/custom-store";
import * as actions from "./store/bugs";
import { addProject } from "./store/projects";

const store = configureStore();

store.subscribe(() => {
  console.log("Store Changed:", store.getState());
});

store.dispatch(addProject({ name: "Project 1" }));

store.dispatch(actions.addBug({ description: "Bug 1" }));
store.dispatch(actions.resolveBug({ id: 1 }));
store.dispatch(actions.updateBug({ id: 1 }));
store.dispatch(actions.removeBug({ id: 1 }));

console.log(store.getState());

// CUSTOM STORE
// customStore.subscribe(() => {
//   console.log("Custom Store Changed:", customStore.getState());
// });

// customStore.dispatch(actions.addBug("Bug 1"));
// console.log(customStore.getState());
