import { createAction } from "@reduxjs/toolkit";

// // Action types
// const BUG_ADDED = "BUG_ADDED";
// const BUG_REMOVE = "BUG_REMOVE";
// const BUG_RESOLVE = "BUG_RESOLVE";
// const BUG_UPDATE = "BUG_UPDATE";

// Action creators
const updateBug = createAction("BUG_UPDATE");
export const addBug = createAction("BUG_ADDED");
export const removeBug = createAction("BUG_REMOVE");
export const resolveBug = createAction("BUG_RESOLVE");

// Reducer
let lastBugId = 0;
export default function reducer(state = [], action) {
  switch (action.type) {
    case addBug.type:
      return [
        ...state,
        {
          id: ++lastBugId,
          description: action.payload.description,
          isResolved: false,
        },
      ];
    case removeBug.type:
      return state.filter((bug) => bug.id !== action.payload.id);
    case updateBug.type:
      return { ...state };
    case resolveBug.type:
      return state.map((bug) =>
        action.payload.id !== bug.id ? bug : { ...bug, isResolved: true }
      );
    //   {
    //     if (action.payload.id === bug.id) {
    //         return  {...bug, isResolved = true}
    //     } else {
    //         return bug;
    //     }
    //   }
    default:
      return state;
  }
}
