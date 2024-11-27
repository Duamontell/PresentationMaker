import { EditorType } from "./EditorType";
import { generateId } from "./generateId.ts";

export const addImageElement = (editor: EditorType, imageURL: string): EditorType => {
	const imageSrc = "Screenshot 2024-11-09 203527.png";
	const newImageId = generateId(50);

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
								id: newImageId,
								type: "image",
								src: imageURL,
								size: { width: 150, height: 150 },
								position: { x: 500, y: 300 },
							},
						],
					};
				}
				return slide;
			}),
		},
	};
};
