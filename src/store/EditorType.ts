import {Presentation} from "./types";

export type SelectionType = {
    selectedSlideId: string,
}

export type EditorType = {
    presentation: Presentation,
    selection: SelectionType | null,
}
