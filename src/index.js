import configureStore from "./store/configure-store";
import customStore from "./store/custom-store";
import {
  addBug,
  removeBug,
  resolveBug,
  assignBug,
  updateBug,
  getUnresolvedBugs,
  getBugForUser,
} from "./store/bugs";
import { addProject } from "./store/projects";
import { addUser } from "./store/users";

const store = configureStore();

store.subscribe(() => {
  console.log("Store Changed:", store.getState());
});

// Add User
// store.dispatch(addUser({ name: "Shubham Dixit" }));
// store.dispatch(addUser({ name: "New User" }));

// // Add Project
// store.dispatch(addProject({ name: "Project 1" }));

// // Bug operations
// store.dispatch(addBug({ description: "Bug 1" }));
// store.dispatch(addBug({ description: "Bug 2" }));
// store.dispatch(addBug({ description: "Bug 3" }));
// store.dispatch(resolveBug({ id: 3 }));
// store.dispatch(updateBug({ id: 1 }));
// store.dispatch(removeBug({ id: 1 }));

// Assign bug to user
// store.dispatch(assignBug({ bugId: 2, userId: 2 }));

// Get bugs assigned to user
// console.log("Bug assigned to user:", getBugForUser(2)(store.getState()));

// console.log(store.getState());
// const x = getUnresolvedBugs(store.getState());
// const y = getUnresolvedBugs(store.getState());
// console.log("Unresolved", x === y);

// Dispatching a method
store.dispatch((dispatch, getState) => {
  // Call API
  // when the promise is resolved => dispatch()
  dispatch({ type: "bugReceivd", bugs: [1, 2, 3] });
  console.log(getState());
  // when the promise is rejected => dispatch()
});

// CUSTOM STORE
// customStore.subscribe(() => {
//   console.log("Custom Store Changed:", customStore.getState());
// });

// customStore.dispatch(actions.addBug("Bug 1"));
// console.log(customStore.getState());
