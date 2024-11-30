// import { useState } from 'react';
// import { dispatch } from '../store/editor';
// import { Slide } from '../store/types';
// import { updateElementPosition } from '../store/updateElementPosition'; // Функция обновления позиции

// export function useDragAndDrop(slide: Slide) {
//     const [draggedElementId, setDraggedElementId] = useState<string | null>(null);
//     const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

//     function onDragStart(event: React.MouseEvent, elementId: string) {
//         setDraggedElementId(elementId);
//         setDragStart({ x: event.clientX, y: event.clientY });
//     }

//     function onDrag(event: React.MouseEvent) {
//         if (!draggedElementId || !dragStart) return;

//         const deltaX = event.clientX - dragStart.x;
//         const deltaY = event.clientY - dragStart.y;

//         const element = slide.content.find((el: { id: string }) => el.id === draggedElementId);
//         if (element) {
//             const newPosition = {
//                 x: element.position.x + deltaX,
//                 y: element.position.y + deltaY,
//             };
//             dispatch(updateElementPosition, { id: draggedElementId, position: newPosition });
//         }

//         setDragStart({ x: event.clientX, y: event.clientY });
//     }

//     function onDragEnd() {
//         setDraggedElementId(null);
//         setDragStart(null);
//     }

//     return {
//         draggedElementId,
//         onDragStart,
//         onDrag,
//         onDragEnd,
//     };
// }


import { useState } from 'react';
import { dispatch } from '../store/editor';
import { Slide } from '../store/types';
import { updateElementPosition } from '../store/updateElementPosition';

export function useDragAndDrop(slide: Slide, selectedElementId: string | null) {
    const [draggedElementId, setDraggedElementId] = useState<string | null>(null);
    const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

    function onDragStart(event: React.MouseEvent, elementId: string) {
        setDraggedElementId(elementId);
        setDragStart({ x: event.clientX, y: event.clientY });
    }

    function onDrag(event: React.MouseEvent) {
        if (!draggedElementId || !dragStart) return;

        const deltaX = event.clientX - dragStart.x;
        const deltaY = event.clientY - dragStart.y;

        const element = slide.content.find((el: { id: string }) => el.id === draggedElementId);
        if (element) {
            const newPosition = {
                x: element.position.x + deltaX,
                y: element.position.y + deltaY,
            };
            dispatch(updateElementPosition, { id: draggedElementId, position: newPosition });
        }

        setDragStart({ x: event.clientX, y: event.clientY });
    }

    function onDragEnd() {
        setDraggedElementId(null);
        setDragStart(null);
    }

    function getResizeHandles() {
        if (!selectedElementId) return [];

        const element = slide.content.find((el) => el.id === selectedElementId);
        if (!element) return [];

        const { x, y } = element.position;
        const { width, height } = element.size;

        // 8 точек: 4 по углам и 4 по серединам сторон
        return [
            { x: x + 1, y: y + 1 }, // верхний левый
            { x: x + width + 3, y: y + 1 }, // верхний правый
            { x: x + 1, y: y + height + 2 }, // нижний левый
            { x: x + width + 3, y: y + height + 3 }, // нижний правый
            { x: x + width / 2, y: y + 1 }, // середина верхней стороны
            { x: x + width + 3, y: y + height / 2 }, // середина правой стороны
            { x: x + width / 2, y: y + height + 3 }, // середина нижней стороны
            { x: x + 1, y: y + height / 2 }, // середина левой стороны
        ];
    }

    return {
        draggedElementId,
        onDragStart,
        onDrag,
        onDragEnd,
        getResizeHandles,
    };
}

