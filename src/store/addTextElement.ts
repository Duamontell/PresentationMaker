import { EditorType } from "./EditorType";
import { generateId } from "./generateId.ts"

export const addTextElement = (editor: EditorType): EditorType => {
	const slideId = generateId(50);

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: editor.presentation.slides.map((slide) => {
				if (slide.id === editor.selection!.selectedSlideId) {
					return {
						...slide,
						content: [
							...slide.content,
							{
								id: slideId,
								type: "text",
								content: "New Text",
								position: { x: 0, y: 0 },
								size: { width: 200, height: 50 },
								fontFamily: "Arial",
								fontSize: 16,
							},
						],
					};
				}
				return slide;
			}),
		},
	};
}