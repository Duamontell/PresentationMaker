// import React from 'react';
// import { Slide } from '../store/types';
// import { SelectionType } from '../store/EditorType';
// import { dispatch } from '../store/editor';
// import { setSelection } from '../store/setSelection';
// import { updateElementContent } from '../store/updateElementContent';
// import { useDragAndDrop } from '../hooks/useDragAndDrop';
// import styles from './Workspace.module.css';

// type WorkspaceProps = {
//     slide: Slide;
//     selection?: SelectionType | null;
// };

// export const Workspace = ({ slide, selection }: WorkspaceProps) => {
//     const { onDragStart, onDrag, onDragEnd } = useDragAndDrop(slide);

//     function onElementClick(elementId: string) {
//         dispatch(setSelection, { selectedElementId: elementId });
//     }

//     function resetSelectionElement() {
//         dispatch(setSelection, { selectedElementId: [] });
//     }

//     function onTextChange(event: React.FormEvent<HTMLDivElement>, elementId: string) {
//         const newText = event.currentTarget.textContent || '';
//         dispatch(updateElementContent, { id: elementId, content: newText });
//     }

//     const handleDragStart = (event: React.DragEvent<HTMLImageElement>) => {
//         event.preventDefault();
//     };

//     return (
//         <div
//             className={styles.workspaceContainer}
//             style={{ backgroundColor: slide ? slide.backgroundColor : 'white' }}
//             onMouseMove={onDrag}
//             onMouseUp={onDragEnd}
//             onMouseDown={() => resetSelectionElement()}
//         >
//             {slide ? (
//                 slide.content.map((element) => {
//                     const isSelectedElement = selection?.selectedElementId === element.id;

//                     if (element.type === 'text') {
//                         return (
//                             <div
//                                 contentEditable
//                                 suppressContentEditableWarning={true}
//                                 className={`${styles.element} ${isSelectedElement ? styles.selected : ''}`}
//                                 key={element.id}
//                                 style={{
//                                     position: 'absolute',
//                                     left: element.position.x,
//                                     top: element.position.y,
//                                     fontFamily: element.fontFamily,
//                                     fontSize: element.fontSize,
//                                     cursor: 'grab',
//                                 }}
//                                 onClick={() => onElementClick(element.id)}
//                                 onMouseDown={(event) => onDragStart(event, element.id)}
//                                 onInput={(event) => onTextChange(event, element.id)}
//                             >
//                                 {element.content}
//                             </div>
//                         );
//                     } else if (element.type === 'image') {
//                         return (
//                             <img
//                                 className={`${styles.element} ${isSelectedElement ? styles.selected : ''}`}
//                                 key={element.id}
//                                 src={element.src}
//                                 alt="Slide Image"
//                                 style={{
//                                     position: 'absolute',
//                                     left: element.position.x,
//                                     top: element.position.y,
//                                     width: element.size.width,
//                                     height: element.size.height,
//                                     cursor: 'grab',
//                                 }}
//                                 onClick={() => onElementClick(element.id)}
//                                 onMouseDown={(event) => onDragStart(event, element.id)}
//                                 onDragStart={handleDragStart}
//                             />
//                         );
//                     }
//                     return null;
//                 })
//             ) : (
//                 <div></div>
//             )}
//         </div>
//     );
// };

import React, { useRef } from 'react';
import { Slide } from '../store/types';
import { SelectionType } from '../store/EditorType';
import { dispatch } from '../store/editor';
import { setSelection } from '../store/setSelection';
import { updateElementContent } from '../store/updateElementContent';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { updateElementSize } from '../store/updateElementSize';
import styles from './Workspace.module.css';

type WorkspaceProps = {
    slide: Slide;
    selection?: SelectionType | null;
};

export const Workspace = ({ slide, selection }: WorkspaceProps) => {
    const {
        onDragStart,
        onDragOrResize,
        onDragEnd,
        getResizeHandles,
    } = useDragAndDrop(slide, selection?.selectedElementId || null);

    const elementRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    function onElementClick(elementId: string) {
        dispatch(setSelection, { selectedElementId: elementId });
    }

    function getElementSize(elementId: string) {
        const element = elementRefs.current[elementId];
        if (element) {
            const { width, height } = element.getBoundingClientRect();
            return { width, height };
        }
        return { width: 0, height: 0 };
    }

    function onTextChange(event: React.FormEvent<HTMLDivElement>, elementId: string) {
        const newText = event.currentTarget.textContent || '';
        dispatch(updateElementContent, { id: elementId, content: newText });
        const { width, height } = getElementSize(elementId);
        dispatch(updateElementSize, { id: elementId, size: { width, height } });
    }

    const resizeHandles = getResizeHandles();

    return (
        <div
            className={styles.workspaceContainer}
            style={{ backgroundColor: slide.backgroundColor || 'white' }}
            onMouseMove={onDragOrResize}
            onMouseUp={onDragEnd}
        >
            {slide.content.map((element) => {
                const isSelectedElement = selection?.selectedElementId === element.id;

                if (element.type === 'text') {
                    return (
                        <div
                            contentEditable
                            suppressContentEditableWarning={true}
                            className={`${styles.element} ${isSelectedElement ? styles.selected : ''}`}
                            key={element.id}
                            ref={(el) => (elementRefs.current[element.id] = el)}
                            style={{
                                position: 'absolute',
                                left: element.position.x,
                                top: element.position.y,
                                fontFamily: element.fontFamily,
                                fontSize: element.fontSize,
                                cursor: isSelectedElement ? 'grab' : 'pointer',
                                userSelect: 'none',
                            }}
                            onClick={() => onElementClick(element.id)}
                            onMouseDown={(event) => onDragStart(event, null, element.id)}
                            onInput={(event) => onTextChange(event, element.id)}
                        >
                            {element.content}
                        </div>
                    );
                } else if (element.type === 'image') {
                    return (
                        <img
                            draggable='false'
                            className={`${styles.element} ${isSelectedElement ? styles.selected : ''}`}
                            key={element.id}
                            src={element.src}
                            alt="Slide Image"
                            style={{
                                position: 'absolute',
                                left: element.position.x,
                                top: element.position.y,
                                width: element.size.width,
                                height: element.size.height,
                                cursor: isSelectedElement ? 'grab' : 'pointer',
                                userSelect: 'none',
                            }}
                            onClick={() => onElementClick(element.id)}
                            onMouseDown={(event) => onDragStart(event, null, element.id)}
                        />
                    );
                }
                return null;
            })}

            {resizeHandles.map((handle, index) => (
                <div
                    key={index}
                    className={styles[handle.id]}
                    style={{
                        position: 'absolute',
                        left: handle.x - 3,
                        top: handle.y - 3,
                        width: 8,
                        height: 8,
                        backgroundColor: 'blue',
                        borderRadius: '50%',
                    }}
                    onMouseDown={(event) => onDragStart(event, handle.id, selection?.selectedElementId || '')}
                />
            ))}
        </div>
    );
};


