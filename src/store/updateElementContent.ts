import { EditorType } from "./EditorType";

export function updateElementContent(editor: EditorType, payload: { id: string; content: string }): EditorType {
    const updatedSlides = editor.presentation.slides.map(slide => ({
        ...slide,
        content: slide.content.map(element =>
            element.id === payload.id
                ? { ...element, content: payload.content }
                : element
        )
    }));

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides
        }
    };
}
