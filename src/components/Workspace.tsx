import { Slide } from '../store/types';
import { SelectionType } from '../store/EditorType';
import { dispatch } from '../store/editor';
import { setSelection } from '../store/setSelection';
import styles from './Workspace.module.css';

type WorkspaceProps = {
    slide: Slide;
    selection?: SelectionType | null;
};

export const Workspace = ({ slide, selection }: WorkspaceProps) => {
    function onElementClick(elementId: string) {
        dispatch(setSelection, { selectedElementId: elementId });
        console.log("Dispatch ID:", elementId);
    }

    return (
        <div className={styles.workspace}>
            <div className={styles.workspaceContainer} style={{ backgroundColor: slide ? slide.backgroundColor : 'white' }}>
                {slide ? (
                    slide.content.map((element) => {
                        const isSelectedElement = selection?.selectedElementId === element.id
                        console.log(isSelectedElement)
                        if (element.type === 'text') {
                            return (
                                <div
                                    className={`${styles.element} ${isSelectedElement ? styles.selected : ''}`}
                                    key={element.id}
                                    style={{
                                        position: 'absolute',
                                        left: element.position.x,
                                        top: element.position.y,
                                        fontFamily: element.fontFamily,
                                        fontSize: element.fontSize
                                    }}
                                    onClick={() => onElementClick(element.id)}
                                >
                                    {element.content}
                                </div>
                            );

                        } else if (element.type === 'image') {
                            return (
                                <img
                                    className={`${styles.element} ${isSelectedElement ? styles.selected : ''}`}
                                    key={element.id}
                                    src={element.src}
                                    alt="Slide Image"
                                    style={{
                                        position: 'absolute',
                                        left: element.position.x,
                                        top: element.position.y,
                                        width: element.size.width,
                                        height: element.size.height
                                    }}
                                    onClick={() => onElementClick(element.id)}
                                />
                            );
                        }
                        return null;
                    })
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};