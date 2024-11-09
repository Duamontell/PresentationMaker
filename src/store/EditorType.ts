import {Presentation} from "./types";

export type SelectionType = {
    selectedSlideId: string | null,
    selectionElementId: string | null,
}

export type EditorType = {
    presentation: Presentation,
    selection: SelectionType
}
