import * as actions from "./action-types";

let lastBugId = 0;
export default function reducer(state = [], action) {
  switch (action.type) {
    case actions.BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastBugId,
          description: action.payload.description,
          isResolved: false,
        },
      ];
    case actions.BUG_REMOVE:
      return state.filter((bug) => bug.id !== action.payload.id);
    case actions.BUG_RESOLVE:
      console.log(action);
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
