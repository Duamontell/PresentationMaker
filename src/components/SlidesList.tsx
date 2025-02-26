import styles from './SlideList.module.css';
import { useSlidesDragAndDrop } from '../hooks/useSlidesDragAndDrop';
import { useAppActions } from '../hooks/useAppActions';
import { useAppSelector } from '../hooks/useAppSelector';


const SCALE = 0.2;

export function SlidesList() {

    const slides = useAppSelector((editor => editor.presentation.slides));
    const selection = useAppSelector((editor => editor.selection));
    const selectedSlides = selection?.selectedSlideId || [];

    const { setSelection } = useAppActions()

    function onSlideClick(slideId: string, event: React.MouseEvent) {
        const isCtrlPressed = event.ctrlKey || event.metaKey;

        if (isCtrlPressed) {
            const newSelectedSlides = selectedSlides.includes(slideId)
                ? selectedSlides.filter((id) => id !== slideId)
                : [...selectedSlides, slideId];
            setSelection({
                selectedSlideId: newSelectedSlides,
                selectedElementId: null,
            });
        } else {
            setSelection({
                selectedSlideId: [slideId],
                selectedElementId: null,
            });
        }
    }

    const { onDragStart, onDragOver, onDrop, onDragEnd } = useSlidesDragAndDrop(slides);

    return (
        <div className={styles.slideList}>
            {slides.map((slide, index) => {
                const isSelected = selectedSlides.includes(slide.id);
                return (
                    <div
                        key={slide.id}
                        className={styles.slide}
                        draggable
                        onDragStart={(event) => onDragStart(event, slide.id)}
                        onDragOver={onDragOver}
                        onDrop={(event) => onDrop(event, slide.id)}
                        onDragEnd={onDragEnd}
                    >
                        <span className={styles.slideNumber}>{index + 1}</span>
                        <div
                            className={`${styles.slideContainer} ${isSelected ? styles.selected : ''}`}
                            style={{
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: slide?.backgroundColor || 'white',
                                backgroundImage: slide?.backgroundImage
                                    ? `url(${slide.backgroundImage})`
                                    : undefined
                            }}
                            onClick={(event) => onSlideClick(slide.id, event)}
                        >
                            {slide.content.map((element) => {
                                if (element.type === "text") {
                                    return (
                                        <div
                                            key={element.id}
                                            className={styles.element}
                                            style={{
                                                position: 'absolute',
                                                width: element.size.width * SCALE,
                                                height: element.size.height * SCALE,
                                                left: element.position.x * SCALE,
                                                top: element.position.y * SCALE,
                                                fontFamily: element.fontFamily,
                                                fontSize: element.fontSize * SCALE,
                                                color: element.fontColor,
                                                wordWrap: 'break-word'
                                            }}
                                        >
                                            {element.content}
                                        </div>
                                    );
                                } else if (element.type === "image") {
                                    return (
                                        <div
                                            key={element.id}
                                            style={{
                                                position: 'absolute',
                                                left: element.position.x * SCALE,
                                                top: element.position.y * SCALE,
                                                width: element.size.width * SCALE,
                                                height: element.size.height * SCALE,
                                                pointerEvents: 'none'
                                            }}
                                        >
                                            <img
                                                src={element.src}
                                                alt="Slide Image"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                            />
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};