import {Presentation} from "./types";

export type SelectionType = {
    selectedSlideId: string | null,
}

export type EditorType = {
    presentation: Presentation,
    selection: SelectionType | null,
}
