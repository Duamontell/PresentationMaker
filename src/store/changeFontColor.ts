import { EditorType } from "./EditorType.ts";
import { ChangeFontColorAction } from "./redux/actions.ts";

export const changeFontColor = (editor: EditorType, action: ChangeFontColorAction): EditorType => {
	if (!editor.selection?.selectedElementId) {
		return editor;
	}

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: editor.presentation.slides.map((slide) => ({
				...slide,
				content: slide.content.map((element) => {
					if (element.id === editor.selection.selectedElementId) {
						return {
							...element,
							fontColor: action.payload,
						};
					}
					return element;
				}
				),
			})),
		},
	};
};
