import { legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducer";
import { EditorType } from "../EditorType";

function saveStateToLocalStorage(state: EditorType) {
	const editorState = JSON.stringify(state);
	localStorage.setItem("presentation", editorState);
}

export const store = createStore(editorReducer);

store.subscribe(() => {
	const state = store.getState();
	saveStateToLocalStorage(state);
});
