import { EditorType } from "./EditorType.ts";
import { ChangeFontFamilyAction } from "./redux/actions.ts";

export const changeFontFamily = (editor: EditorType, action: ChangeFontFamilyAction): EditorType => {
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
							fontFamily: action.payload,
						};
					}
					return element;
				}
				),
			})),
		},
	};
};
