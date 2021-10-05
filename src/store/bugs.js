// Action types
const BUG_ADDED = "BUG_ADDED";
const BUG_REMOVE = "BUG_REMOVE";
const BUG_RESOLVE = "BUG_RESOLVE";

// Action creators
export const addBug = (description) => ({
  type: BUG_ADDED,
  payload: { description: description },
});

export const removeBug = (id) => ({
  type: BUG_REMOVE,
  payload: { id },
});

export const resolveBug = (id) => ({
  type: BUG_RESOLVE,
  payload: { id },
});

// Reducer
let lastBugId = 0;
export default function reducer(state = [], action) {
  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastBugId,
          description: action.payload.description,
          isResolved: false,
        },
      ];
    case BUG_REMOVE:
      return state.filter((bug) => bug.id !== action.payload.id);
    case BUG_RESOLVE:
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
