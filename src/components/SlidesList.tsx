import { Slide } from '../store/types';
import styles from './SlideList.module.css';

type SlidesListProps = {
    slides: Slide[];
    onSlideSelect: (slide: Slide) => void;
};

const SCALE = 0.125;

export const SlidesList = ({ slides, onSlideSelect }: SlidesListProps) => {
    const handleSlideClick = (slide: Slide) => {
        onSlideSelect(slide);
    };

    return (
        <div className={styles.slideList}>
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={styles.slide}
                    onClick={() => handleSlideClick(slide)}
                >
                    <span className={styles.slideNumber}>{index + 1}</span>
                    <div className={styles.slideContainer} style={{ backgroundColor: slide.backgroundColor }}>
                        {slide.content.map((element) => {
                            if (element.type === "text") {
                                return (
                                    <div
                                        key={element.id}
                                        style={{
                                            position: 'absolute',
                                            left: element.position.x * SCALE,
                                            top: element.position.y * SCALE,
                                            width: element.size.width * SCALE,
                                            height: element.size.height * SCALE,
                                            fontFamily: element.fontFamily,
                                            fontSize: element.fontSize * SCALE
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
                                            height: element.size.height * SCALE
                                        }}
                                    >
                                        <img
                                            src={'/public/' + element.src}
                                            alt="Slide Image"
                                            style={{
                                                width: '100%',
                                                height: '100%'
                                            }}
                                        />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};