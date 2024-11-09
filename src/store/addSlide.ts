import { EditorType } from "./EditorType.ts";
import { generateSlideId } from "./generateSlideId.ts"

export const addSlide = (editor: EditorType): EditorType => {
	const slideId = generateSlideId(30);

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