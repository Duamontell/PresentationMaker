// import { EditorType, SelectionType } from "./EditorType.ts";

// export function setSelection(editor: EditorType, newSelection: SelectionType): EditorType {
//     return {
//         ...editor,
//         selection: {
//             selectedSlideId: newSelection.selectedElementId ? editor.selection?.selectedSlideId : newSelection.selectedSlideId,
//             selectedElementId: newSelection.selectedElementId,
//         },
//     };
// }

import { EditorType } from "./EditorType.ts";
import { SetSelectionAction } from "./redux/actions.ts";

export function setSelection(editor: EditorType, action: SetSelectionAction): EditorType {

    return {
        ...editor,
        selection: action.payload,
    }
}
