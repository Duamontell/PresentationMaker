import { EditorType } from "./EditorType.ts";
import { ChangeFontSizeAction } from "./redux/actions.ts";

export const changeFontSize = (editor: EditorType, action: ChangeFontSizeAction): EditorType => {
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
							fontSize: action.payload,
						};
					}
					return element;
				}
				),
			})),
		},
	};
};