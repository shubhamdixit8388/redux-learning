import * as actionType from "./action-types";

let lastBugId = 0;
export default function reducer(state = [], action) {
  switch (action.type) {
    case actionType.BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastBugId,
          description: action.payload.description,
          isResolved: false,
        },
      ];
    case actionType.BUG_REMOVE:
      return state.filter((bug) => bug.id !== action.payload.id);
    case actionType.BUG_RESOLVE:
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
