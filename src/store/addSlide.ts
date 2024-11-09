import { EditorType } from "./EditorType";
import { generateId } from "./generateId.ts"

export const addSlide = (editor: EditorType): EditorType => {
	const slideId = generateId(50);

	return {
		presentation: {
			...editor.presentation,
			slides: [
				...editor.presentation.slides,
				{
					id: slideId,
					type: "slide",
					backgroundColor: "white",
					content: [],
				}
			]
		},
		selection: {
			...editor.selection,
			selectedSlideId: editor.presentation.slides.length === 0
				? slideId
				: editor.selection!.selectedSlideId
		}
	};
}