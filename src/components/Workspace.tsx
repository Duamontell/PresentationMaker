// import React, { useRef } from 'react';
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
//     const {
//         tempSlide,
//         onDragStart,
//         onDragOrResize,
//         onDragEnd,
//         getResizeHandles,
//     } = useDragAndDrop(slide, selection?.selectedElementId || null);

//     const elementRefs = useRef<{ [key: string]: HTMLElement | null }>({});

//     function onElementClick(elementId: string) {
//         dispatch(setSelection, { selectedElementId: elementId });
//     }

//     function onTextChange(event: React.FormEvent<HTMLDivElement>, elementId: string) {
//         const newText = event.currentTarget.textContent || '';
//         dispatch(updateElementContent, { id: elementId, content: newText });
//     }

//     const resizeHandles = getResizeHandles();

//     return (
//         <div
//             className={styles.workspaceContainer}
//             style={{ backgroundColor: tempSlide?.backgroundColor || 'white' }}
//             onMouseMove={onDragOrResize}
//             onMouseUp={onDragEnd}
//         // onClick={() => resetSelectionElement()}
//         >

//             {!tempSlide ? (
//                 <div className={styles.emptySlideMessage}>
//                     Создайте свой первый слайд!
//                 </div>
//             ) : (

//                 tempSlide.content.map((element) => {
//                     const isSelectedElement = selection?.selectedElementId === element.id;

//                     if (element.type === 'text') {
//                         return (
//                             <div
//                                 contentEditable
//                                 suppressContentEditableWarning={true}
//                                 className={`${styles.element} ${isSelectedElement ? styles.selected : ''}`}
//                                 key={element.id}
//                                 ref={(el) => (elementRefs.current[element.id] = el)}
//                                 style={{
//                                     position: 'absolute',
//                                     left: element.position.x,
//                                     top: element.position.y,
//                                     width: element.size.width,
//                                     height: element.size.height,
//                                     fontFamily: element.fontFamily,
//                                     fontSize: element.fontSize,
//                                     cursor: isSelectedElement ? 'grab' : 'pointer',
//                                     userSelect: 'none',
//                                 }}
//                                 onClick={() => onElementClick(element.id)}
//                                 onMouseDown={(event) => onDragStart(event, null)}
//                                 onInput={(event) => onTextChange(event, element.id)}
//                             >
//                                 {element.content}
//                             </div>
//                         );
//                     } else if (element.type === 'image') {
//                         return (
//                             <img
//                                 draggable='false'
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
//                                     cursor: isSelectedElement ? 'grab' : 'pointer',
//                                     userSelect: 'none',
//                                 }}
//                                 onClick={() => onElementClick(element.id)}
//                                 onMouseDown={(event) => onDragStart(event, null)}
//                             />
//                         );
//                     }
//                     return null;
//                 })
//             )}
//             {resizeHandles.map((handle, index) => (
//                 <div
//                     key={index}
//                     className={styles[handle.id]}
//                     style={{
//                         position: 'absolute',
//                         left: handle.x - 3,
//                         top: handle.y - 3,
//                         width: 8,
//                         height: 8,
//                         backgroundColor: 'blue',
//                         borderRadius: '50%',
//                     }}
//                     onMouseDown={(event) => onDragStart(event, handle.id)}
//                 />
//             ))}
//         </div>
//     );
// };

import React, { useRef } from 'react';
import styles from './Workspace.module.css';
import { Slide } from '../store/types';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppActions } from '../hooks/useAppActions';


export function Workspace() {
    const slides = useAppSelector((editor => editor.presentation.slides))
    const selection = useAppSelector((editor => editor.selection))
    const slide: Slide = slides.find(slide => slide.id === selection?.selectedSlideId) || slides[0]
    const { setSelection, updateElementContent } = useAppActions()

    const {
        tempSlide,
        onDragStart,
        onDragOrResize,
        onDragEnd,
        getResizeHandles,
    } = useDragAndDrop(slide, selection?.selectedElementId || null);

    const elementRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    function onElementClick(elementId: string) {
        setSelection({
            selectedElementId: elementId,
            selectedSlideId: slide.id,
        })
    }

    function onTextChange(event: React.FormEvent<HTMLDivElement>, elementId: string) {
        const newText = event.currentTarget.textContent || '';
        updateElementContent(elementId, newText);
    }

    const resizeHandles = getResizeHandles();

    return (
        <div
            className={styles.workspaceContainer}
            style={{ backgroundColor: tempSlide?.backgroundColor || 'white' }}
            onMouseMove={onDragOrResize}
            onMouseUp={onDragEnd}
        // onClick={() => resetSelectionElement()}
        >

            {!tempSlide ? (
                <div>
                    Создайте свой первый слайд!
                </div>
            ) : (

                tempSlide.content.map((element) => {
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
                                    width: element.size.width,
                                    height: element.size.height,
                                    fontFamily: element.fontFamily,
                                    fontSize: element.fontSize,
                                    cursor: isSelectedElement ? 'grab' : 'pointer',
                                    userSelect: 'none',
                                }}
                                onClick={() => onElementClick(element.id)}
                                onMouseDown={(event) => onDragStart(event, null)}
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
                                onMouseDown={(event) => onDragStart(event, null)}
                            />
                        );
                    }
                    return null;
                })
            )}
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
                    onMouseDown={(event) => onDragStart(event, handle.id)}
                />
            ))}
        </div>
    );
};
