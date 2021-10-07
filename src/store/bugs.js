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
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    bugRemoved: (bugs, action) => {
      bugs.list = bugs.list.filter((bug) => bug.id !== action.payload.id);
      return bugs;
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].isResolved = true;
    },

    bugAssigned: (bugs, action) => {
      const { userId, id: bugId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      if (index >= 0) {
        bugs.list[index].userId = userId;
      }
    },

    bugUpdated: (bugs, action) => {
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
  return dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onError: bugsRequestFailed.type,
      onSuccess: bugRecieved.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

// Optional/Changed implementation addBug for testing
// export const addBug = (bug) => async (dispatch) => {
//   const response = await axios.request({
//     baseURL: "http://localhost:9001/api",
//     url: url,
//     method: "post",
//     data: bug,
//   });
//   dispatch(bugAdded(response.data));
// };

export const resolveBug = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssigned.type,
  });

const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssigned,
  bugUpdated,
  bugRecieved,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;
