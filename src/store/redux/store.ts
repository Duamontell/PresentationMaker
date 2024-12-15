import { legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducer";

export const store = createStore(editorReducer);

store.subscribe(() => {
	const state = store.getState();
	const editorState = JSON.stringify(state);
	localStorage.setItem("presentation", editorState);
});
