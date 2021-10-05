import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import reducer from "./bugs";

export default function configureStore(params) {
  return createStore(reducer, devToolsEnhancer({ trace: true }));
}
