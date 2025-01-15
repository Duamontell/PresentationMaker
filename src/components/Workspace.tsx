import styles from './Workspace.module.css';
import { Slide } from '../store/types';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppActions } from '../hooks/useAppActions';


export function Workspace() {
    const slides = useAppSelector((editor => editor.presentation.slides));
    const selection = useAppSelector((editor => editor.selection));
    const slide: Slide = slides.find(slide => slide.id === selection?.selectedSlideId?.[0]) || slides[0];

    const { setSelection, updateElementContent } = useAppActions()

    const {
        tempSlide,
        onDragStart,
        onDragOrResize,
        onDragEnd,
        getResizeHandles,
    } = useDragAndDrop(slide, selection?.selectedElementId || null);

    // const elementRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    function onElementClick(elementId: string) {
        setSelection({
            selectedElementId: elementId,
            selectedSlideId: [slide.id],
        })
    }

    function onTextChange(event: React.FormEvent<HTMLDivElement>, elementId: string) {
        const newText = event.currentTarget.textContent || '';
        updateElementContent(elementId, newText);
    }

    const resizeHandles = getResizeHandles();

    return (
        <div className={styles.workspace}>
            <div
                className={styles.workspaceContainer}
                style={{
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: tempSlide?.backgroundColor || 'white',
                    backgroundImage: tempSlide?.backgroundImage
                        ? `url(${tempSlide.backgroundImage})`
                        : undefined
                }}
                onMouseMove={onDragOrResize}
                onMouseUp={onDragEnd}
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
                                    style={{
                                        position: 'absolute',
                                        left: element.position.x,
                                        top: element.position.y,
                                        width: element.size.width,
                                        height: element.size.height,
                                        color: element.fontColor,
                                        fontFamily: element.fontFamily,
                                        fontSize: element.fontSize,
                                        cursor: isSelectedElement ? 'grab' : 'pointer',
                                        userSelect: 'none',
                                    }}
                                    onClick={() => onElementClick(element.id)}
                                    onMouseDown={(event) => onDragStart(event, null)}
                                    // onInput={(event) => onTextChange(event, element.id)}
                                    onBlur={(event) => onTextChange(event, element.id)}
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
        </div>
    );
};