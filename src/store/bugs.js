import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

let lastBugId = 0;
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // action: action handlers
    addBug: (bugs, action) => {
      bugs.list.push({
        id: ++lastBugId,
        description: action.payload.description,
        isResolved: false,
      });
    },

    removeBug: (bugs, action) => {
      bugs.list = bugs.list.filter((bug) => bug.id !== action.payload.id);
      return bugs;
    },

    resolveBug: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].isResolved = true;
    },

    assignBug: (bugs, action) => {
      const { userId, bugId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      if (index >= 0) {
        bugs.list[index].userId = userId;
      }
    },

    updateBug: (bugs, action) => {
      return [...bugs];
    },

    bugRecieved: (bugs, action) => {
      bugs.list = action.payload;
    },
  },
});

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.list.filter((bug) => !bug.isResolved)
);

export const getBugForUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs, projects) => bugs.list.filter((bug) => bug.userId === userId)
  );

//Action creator
const url = "/bugs";
export const loadBugs = () =>
  apiCallBegan({
    url,
    onSuccess: bugRecieved.type,
  });

export const {
  addBug,
  removeBug,
  resolveBug,
  assignBug,
  updateBug,
  bugRecieved,
} = slice.actions;
export default slice.reducer;
