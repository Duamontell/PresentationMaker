import { EditorType } from "./EditorType.ts";

export const changeBackgroundColor = (editor: EditorType, newColor: string): EditorType => {
    if (!editor.selection?.selectedSlideId) {
        return editor; 
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map((slide) => {
                if (slide.id === editor.selection.selectedSlideId) {
                    return {
                        ...slide,
                        backgroundColor: newColor,
                    };
                }
                return slide;
            }),
        },
    };
};
