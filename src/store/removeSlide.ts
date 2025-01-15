import { EditorType } from "./EditorType.ts";

export function removeSlide(editor: EditorType): EditorType {
    if (!editor.selection.selectedSlideId) {
        return editor
    }

    const newSlides = editor.presentation.slides.filter(
        slide => !editor.selection.selectedSlideId?.includes(slide.id)
    );

    let newSelectedSlideId: string[] = [];
    if (newSlides.length > 0) {
        newSelectedSlideId = [newSlides[0].id];
    }

    return {
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            selectedSlideId: newSelectedSlideId, 
            selectedElementId: null,
        },
    };
}