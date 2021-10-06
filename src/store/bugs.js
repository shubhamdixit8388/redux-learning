import { createSlice } from "@reduxjs/toolkit";

let lastBugId = 0;
const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    // action: action handlers
    addBug: (bugs, action) => {
      bugs.push({
        id: ++lastBugId,
        description: action.payload.description,
        isResolved: false,
      });
    },

    removeBug: (state, action) => {
      return state.filter((bug) => bug.id !== action.payload.id);
    },

    resolveBug: (state, action) => {
      const index = state.findIndex((bug) => bug.id === action.payload.id);
      state[index].isResolved = true;
    },

    updateBug: (state, action) => {
      return [...state];
    },
  },
});

export const { addBug, removeBug, resolveBug, updateBug } = slice.actions;
export default slice.reducer;

export const getUnresolvedBugs = (state) =>
  state.entities.bugs.filter((bug) => !bug.isResolved);
