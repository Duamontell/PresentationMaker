// import { Slide } from '../store/types';
// import styles from './Workspace.module.css'

// type WorkspaceProps = {
// 	slide: Slide;
// 	selectionSlideId: Selection;
// };

// export const Workspace = ({ slide }: WorkspaceProps) => {
// 	return (
// 		<div className={styles.workspace}>
// 			<div className={styles.workspaceContainer}>

// 			</div>
// 		</div>

// 	);
// };




// import { Slide } from '../store/types';
// import styles from './Workspace.module.css';

// type WorkspaceProps = {
//     slide: Slide | null; // Используем null для случая, когда слайд не выбран
// };

// export const Workspace = ({ slide }: WorkspaceProps) => {
//     return (
//         <div className={styles.workspace}>
//             <div className={styles.workspaceContainer} style={{ backgroundColor: slide ? slide.backgroundColor : 'white' }}>
//                 {slide ? (
//                     slide.content.map((element) => {
//                         if (element.type === 'text') {
//                             return (
//                                 <div
//                                     key={element.id}
//                                     style={{
//                                         position: 'absolute',
//                                         left: element.position.x,
//                                         top: element.position.y,
//                                         fontFamily: element.fontFamily,
//                                         fontSize: element.fontSize
//                                     }}
//                                 >
//                                     {element.content}
//                                 </div>
//                             );
//                         } else if (element.type === 'image') {
//                             return (
//                                 <img
//                                     key={element.id}
//                                     src={'/public/' + element.src}
//                                     alt="Slide Image"
//                                     style={{
//                                         position: 'absolute',
//                                         left: element.position.x,
//                                         top: element.position.y,
//                                         width: element.size.width,
//                                         height: element.size.height
//                                     }}
//                                 />
//                             );
//                         }
//                         return null;
//                     })
//                 ) : (
//                     <div></div> 
//                 )}
//             </div>
//         </div>
//     );
// };



// ВТОРАЯ ВЕРСИЯ
import { Slide } from '../store/types';
import styles from './Workspace.module.css';

type WorkspaceProps = {
    slide: Slide | null; // Используем null для случая, когда слайд не выбран
};

export const Workspace = ({ slide }: WorkspaceProps) => {
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
                                        fontSize: element.fontSize
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
                                        height: element.size.height
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