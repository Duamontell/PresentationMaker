import { useState } from 'react';
import { dispatch } from '../store/editor';
import { Slide } from '../store/types';
import { updateElementPosition } from '../store/updateElementPosition'; // Функция обновления позиции

export function useDragAndDrop(slide: Slide) {
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

    return {
        draggedElementId,
        onDragStart,
        onDrag,
        onDragEnd,
    };
}
