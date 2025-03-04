import { EditorType } from "./EditorType.ts";

export const deleteElement = (editor: EditorType): EditorType => {
    if (!editor.selection?.selectedElementId) {
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
                        content: slide.content.filter(
                            (element) => element.id !== editor.selection.selectedElementId
                        ),
                    };
                }
                return slide;
            }),
        },
        selection: {
            selectedSlideId: editor.selection.selectedSlideId,
            selectedElementId: null,
        },
    };
};
