import * as actions from "./action-types";

export const addBug = (description) => ({
  type: actions.BUG_ADDED,
  payload: { description: description },
});

export const removeBug = (id) => ({
  type: actions.BUG_REMOVE,
  payload: { id },
});

export const resolveBug = (bugId) => ({
  type: actions.BUG_RESOLVE,
  payload: { id: bugId },
});
