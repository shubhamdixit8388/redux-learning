import { createAction, createReducer } from "@reduxjs/toolkit";

// // Action types
// const BUG_ADDED = "BUG_ADDED";
// const BUG_REMOVE = "BUG_REMOVE";
// const BUG_RESOLVE = "BUG_RESOLVE";
// const BUG_UPDATE = "BUG_UPDATE";

// Action creators
export const addBug = createAction("BUG_ADDED");
export const removeBug = createAction("BUG_REMOVE");
export const resolveBug = createAction("BUG_RESOLVE");
export const updateBug = createAction("BUG_UPDATE");

let lastBugId = 0;
export default createReducer([], {
  [addBug.type]: (state, action) => {
    state.push({
      id: ++lastBugId,
      description: action.payload.description,
      isResolved: false,
    });
  },

  [removeBug.type]: (state, action) => {
    return state.filter((bug) => bug.id !== action.payload.id);
  },

  [removeBug.type]: (state, action) => {
    return state.filter((bug) => bug.id !== action.payload.id);
  },

  [resolveBug.type]: (state, action) => {
    const index = state.findIndex((bug) => bug.id === action.payload.id);
    state[index].isResolved = true;
  },
});
