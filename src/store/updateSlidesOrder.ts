import { EditorType } from "./EditorType.ts";
import { Slide } from "./types.ts";

export function updateSlidesOrder(editor: EditorType, newSlides: Slide[]): EditorType {
	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: newSlides,
		},
	};
}
