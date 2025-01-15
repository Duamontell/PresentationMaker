import { EditorType } from "../EditorType";
import { ActionType, EditorAction } from "./actions";
import { addSlide } from "../addSlide";
import { removeSlide } from "../removeSlide";
import { addTextElement } from "../addTextElement";
import { addImageElement } from "../addImageElement";
import { deleteElement } from "../deleteElement";
import { changeBackgroundColor } from "../changeBackgroundColor";
import { changeBackgroundImage } from "../changeBackgroundImage";
import { renamePresentationTitle } from "../renamePresentationTitle";
import { setSelection } from "../setSelection";
import { loadEditorFromLocalStorage } from "../editor";
import { updateElementContent } from "../updateElementContent";
import { updateElementPosition } from "../updateElementPosition";
import { updateElementSize } from "../updateElementSize";
import { updateSlidesOrder } from "../updateSlidesOrder";
import { changeFontColor } from "../changeFontColor";
import { changeFontSize } from "../changeFontSize";
import { changeFontFamily } from "../changeFontFamily";

export function editorReducer(editor: EditorType = loadEditorFromLocalStorage(), action: EditorAction): EditorType {
	switch (action.type) {
		case ActionType.ADD_SLIDE:
			return addSlide(editor)
		case ActionType.REMOVE_SLIDE:
			return removeSlide(editor)
		case ActionType.ADD_TEXT:
			return addTextElement(editor)
		case ActionType.ADD_IMAGE:
			return addImageElement(editor, action)
		case ActionType.DELETE_ELEMENT:
			return deleteElement(editor)
		case ActionType.CHANGE_FONT_FAMILY:
			return changeFontFamily(editor, action)
		case ActionType.CHANGE_FONT_SIZE:
			return changeFontSize(editor, action)
		case ActionType.CHANGE_FONT_COLOR:
			return changeFontColor(editor, action)
		case ActionType.CHANGE_BACKGROUND_COLOR:
			return changeBackgroundColor(editor, action)
		case ActionType.CHANGE_BACKGROUND_IMAGE:
			return changeBackgroundImage(editor, action)
		case ActionType.RENAME_PRESENTATION_TITLE:
			return renamePresentationTitle(editor, action)
		case ActionType.UPDATE_ELEMENT_CONTENT:
			return updateElementContent(editor, action)
		case ActionType.UPDATE_ELEMENT_POSITION:
			return updateElementPosition(editor, action)
		case ActionType.UPDATE_ELEMENT_SIZE:
			return updateElementSize(editor, action)
		case ActionType.UPDATE_SLIDES_ORDER:
			return updateSlidesOrder(editor, action)
		case ActionType.SET_SELECTION:
			return setSelection(editor, action)
		case ActionType.SET_EDITOR:
			return action.payload
		default:
			return editor
	}
}