import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

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

    removeBug: (bugs, action) => {
      return bugs.filter((bug) => bug.id !== action.payload.id);
    },

    resolveBug: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].isResolved = true;
    },

    assignBug: (bugs, action) => {
      const { userId, bugId } = action.payload;
      const index = bugs.findIndex((bug) => bug.id === bugId);
      if (index >= 0) {
        bugs[index].userId = userId;
      }
    },

    updateBug: (bugs, action) => {
      return [...bugs];
    },
  },
});

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.isResolved)
);

export const getBugForUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs, projects) => bugs.filter((bug) => bug.userId === userId)
  );

export const { addBug, removeBug, resolveBug, assignBug, updateBug } =
  slice.actions;
export default slice.reducer;
