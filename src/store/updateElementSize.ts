import { EditorType } from './EditorType';
import { Size } from './types';

export function updateElementSize(editor: EditorType, payload: { id: string; size: Size }): EditorType {
	const { id, size } = payload;

	const updatedSlides = editor.presentation.slides.map((slide) => ({
		...slide,
		content: slide.content.map((element) => {
			if (element.id === id) {
				if (element.type === 'text' || element.type === 'image') {
					return {
						...element,
						size, 
					};
				}
			}
			return element;
		}),
	}));

	return {
		...editor,
		presentation: {
			...editor.presentation,
			slides: updatedSlides,
		},
	};
}