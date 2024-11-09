import { editor } from './data.ts';
import { EditorType } from './EditorType.ts';

let _editor = editor;
let _handler: (() => void) | null = null;

export function getEditor() {
    return _editor;
}

export function setEditor(newEditor: EditorType) {
    _editor = newEditor;
}

export function dispatch(modifyFn: Function, payload?: Object): void {
    const newEditor = modifyFn(_editor, payload);
    setEditor(newEditor);

    if (_handler) {
        _handler();
    }
}

export function addEditorChangeHandler(handler: () => void): void {
    _handler = handler;
}
