import configureStore from "./store/configure-store";
import customStore from "./store/custom-store";
import {
  addBug,
  removeBug,
  resolveBug,
  updateBug,
  getUnresolvedBugs,
} from "./store/bugs";
import { addProject } from "./store/projects";

const store = configureStore();

store.subscribe(() => {
  console.log("Store Changed:", store.getState());
});

store.dispatch(addProject({ name: "Project 1" }));

store.dispatch(addBug({ description: "Bug 1" }));
store.dispatch(addBug({ description: "Bug 2" }));
store.dispatch(addBug({ description: "Bug 3" }));
store.dispatch(resolveBug({ id: 3 }));
store.dispatch(updateBug({ id: 1 }));
store.dispatch(removeBug({ id: 1 }));

console.log(store.getState());
console.log("Unresolved", getUnresolvedBugs(store.getState()));

// CUSTOM STORE
// customStore.subscribe(() => {
//   console.log("Custom Store Changed:", customStore.getState());
// });

// customStore.dispatch(actions.addBug("Bug 1"));
// console.log(customStore.getState());
