import { EditorType } from "./EditorType";

export function updateElementPosition(editor: EditorType, payload: { id: string; position: { x: number; y: number } }): EditorType {
    const updatedSlides = editor.presentation.slides.map(slide => ({
        ...slide,
        content: slide.content.map(element =>
            element.id === payload.id ? { ...element, position: payload.position } : element
        )
    }));

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
    };
}
