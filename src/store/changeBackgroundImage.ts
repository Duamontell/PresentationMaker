import { EditorType } from "./EditorType.ts";
import { ChangeBackgroundImageAction } from "./redux/actions.ts";

export const changeBackgroundImage = (editor: EditorType, action: ChangeBackgroundImageAction): EditorType => {
	if (!editor.selection.selectedSlideId) {
		return editor; 
	}

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: editor.presentation.slides.map((slide) => {
				if (editor.selection.selectedSlideId && slide.id === editor.selection.selectedSlideId[0]) {
					return {
						...slide,
						backgroundImage: action.payload,
					};
				}
				return slide;
			}),
		},
	};
};