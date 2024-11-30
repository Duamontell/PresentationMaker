import { Slide } from '../store/types';
import { SelectionType } from '../store/EditorType';
import { dispatch } from '../store/editor';
import { setSelection } from '../store/setSelection';
import styles from './SlideList.module.css';

export type SlidesListProps = {
    slides: Slide[];
    selection?: SelectionType | null;
};

const SCALE = 0.16;

export const SlidesList = ({ slides, selection }: SlidesListProps) => {
    function onSlideClick(slideId: string) {
        dispatch(setSelection, { selectedSlideId: slideId });
    }

    return (
        <div className={styles.slideList}>
            {slides.map((slide, index) => {
                const isSelected = selection?.selectedSlideId === slide.id;
                return (
                    <div
                        key={slide.id}
                        className={styles.slide}
                    >
                        <span className={styles.slideNumber}>{index + 1}</span>
                        <div
                            className={`${styles.slideContainer} ${isSelected ? styles.selected : ''}`}
                            style={{ backgroundColor: slide.backgroundColor }}
                            onClick={() => onSlideClick(slide.id)}
                        >
                            {slide.content.map((element) => {
                                if (element.type === "text") {
                                    return (
                                        <div
                                            key={element.id}
                                            className={styles.element}
                                            style={{
                                                position: 'absolute',
                                                left: element.position.x * SCALE,
                                                top: element.position.y * SCALE,
                                                width: element.size.width * SCALE,
                                                height: element.size.height * SCALE,
                                                fontFamily: element.fontFamily,
                                                fontSize: element.fontSize * SCALE,
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
