import { Slide } from '../store/types';
import { SelectionType } from '../store/EditorType';
import { dispatch } from '../store/editor';
import { setSelection } from '../store/setSelection';
import { updateElementContent } from '../store/updateElementContent';
import styles from './Workspace.module.css';

type WorkspaceProps = {
    slide: Slide;
    selection?: SelectionType | null;
};

export const Workspace = ({ slide, selection }: WorkspaceProps) => {
    function onElementClick(elementId: string) {
        dispatch(setSelection, { selectedElementId: elementId });
    }
    function onTextChange(event: React.FormEvent<HTMLDivElement>, elementId: string) {
        const newText = event.currentTarget.textContent || '';
        dispatch(updateElementContent, { id: elementId, content: newText });
    }

    return (
        <div className={styles.workspaceContainer} style={{ backgroundColor: slide ? slide.backgroundColor : 'white' }}>
            {slide ? (
                slide.content.map((element) => {
                    const isSelectedElement = selection?.selectedElementId === element.id
                    console.log(isSelectedElement)
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
                                    fontFamily: element.fontFamily,
                                    fontSize: element.fontSize
                                }}
                                onClick={() => onElementClick(element.id)}
                                onInput={(event) => onTextChange(event, element.id)}
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
    );
};