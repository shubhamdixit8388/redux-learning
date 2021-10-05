import { createSlice } from "@reduxjs/toolkit";

let projectId = 0;

const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    addProject: (projects, action) => {
      projects.push({
        id: ++projectId,
        name: action.payload.name,
      });
    },
  },
});

export const { addProject } = slice.actions;
export default slice.reducer;
