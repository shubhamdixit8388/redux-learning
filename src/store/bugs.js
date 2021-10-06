import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import moment from "moment";
import { apiCallBegan } from "./api";

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
      bugs.list.push(action.payload);
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
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
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
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

  if (diffInMinutes < 10) return;
  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onError: bugsRequestFailed.type,
      onSuccess: bugRecieved.type,
    })
  );
};

export const addNewBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: addBug.type,
  });

export const {
  addBug,
  removeBug,
  resolveBug,
  assignBug,
  updateBug,
  bugRecieved,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;
