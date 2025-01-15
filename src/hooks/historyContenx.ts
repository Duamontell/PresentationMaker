import React from "react"
import { HistoryType } from "../store/history/history"

const defaultHistory: HistoryType = {
    undo: () => undefined,
    redo: () => undefined,
}
export const HistoryContext: React.Context<HistoryType> = React.createContext(defaultHistory)