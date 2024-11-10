// import {EditorType, SelectionType} from "./EditorType.ts";

// export function setSelection(editor: EditorType, newSelection: SelectionType): EditorType {
//     return {
//         ...editor,
//         selection: newSelection,
//     }
// }

import { EditorType, SelectionType } from "./EditorType.ts";

export function setSelection(editor: EditorType, newSelection: SelectionType): EditorType {
    return {
        ...editor,
        selection: {
            selectedSlideId: newSelection.selectedElementId ? editor.selection?.selectedSlideId : newSelection.selectedSlideId,
            selectedElementId: newSelection.selectedElementId,
        },
    };
}
