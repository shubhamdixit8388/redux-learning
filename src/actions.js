import * as actionType from "./action-types";

export const addBug = (description) => ({
  type: actionType.BUG_ADDED,
  payload: { description: description },
});

export const removeBug = (id) => ({
  type: actionType.BUG_REMOVE,
  payload: { id },
});

export const resolveBug = (id) => ({
  type: actionType.BUG_RESOLVE,
  payload: { id },
});
