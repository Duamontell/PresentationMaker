import { Slide } from '../store/types';
import { SelectionType } from '../store/EditorType';
import { dispatch } from '../store/editor';
import { setSelection } from '../store/setSelection';
import styles from './Workspace.module.css';

type WorkspaceProps = {
    slide: Slide;
    selection?: SelectionType | null;
};

export const Workspace = ({ slide }: WorkspaceProps) => {
    function onElementClick(elementId: string) {
        dispatch(setSelection, { selectedElementId: elementId });
    }
    return (
        <div className={styles.workspace}>
            <div className={styles.workspaceContainer} style={{ backgroundColor: slide ? slide.backgroundColor : 'white' }}>
                {slide ? (
                    slide.content.map((element) => {
                        if (element.type === 'text') {
                            return (
                                <div
                                    key={element.id}
                                    style={{
                                        position: 'absolute',
                                        left: element.position.x,
                                        top: element.position.y,
                                        fontFamily: element.fontFamily,
                                        fontSize: element.fontSize,
                                        border: '1px solid',
                                        borderColor: 'transparent'
                                    }}
                                >
                                    {element.content}
                                </div>
                            );
                        } else if (element.type === 'image') {
                            return (
                                <img
                                    key={element.id}
                                    src={'/public/' + element.src}
                                    alt="Slide Image"
                                    style={{
                                        position: 'absolute',
                                        left: element.position.x,
                                        top: element.position.y,
                                        width: element.size.width,
                                        height: element.size.height,
                                        border: '1px solid',
                                        borderColor: 'transparent'
                                    }}
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