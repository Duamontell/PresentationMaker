import { useState } from 'react';
import { dispatch } from '../store/editor';
import { Slide, Element } from '../store/types';
import { updateElementSize } from '../store/updateElementSize';

export function useResize(slide: Slide) {
    const [resizingElementId, setResizingElementId] = useState<string | null>(null);
    const [resizingDirection, setResizingDirection] = useState<string | null>(null);

    function onResizeStart(event: React.MouseEvent, elementId: string, direction: string) {
        event.stopPropagation();
        setResizingElementId(elementId);
        setResizingDirection(direction);

        const stopResize = () => {
            setResizingElementId(null);
            setResizingDirection(null);
            window.removeEventListener('mousemove', handleResizeMove);
            window.removeEventListener('mouseup', stopResize);
        };

        const handleResizeMove = (resizeEvent: MouseEvent) => {
            const element = slide.content.find((el: Element) => el.id === resizingElementId);
            if (!element) return;

            const deltaX = resizeEvent.movementX;
            const deltaY = resizeEvent.movementY;

            const newSize = { ...element.size };

            if (direction.includes('right')) newSize.width += deltaX;
            if (direction.includes('left')) newSize.width -= deltaX;
            if (direction.includes('bottom')) newSize.height += deltaY;
            if (direction.includes('top')) newSize.height -= deltaY;

            // Минимальные размеры
            newSize.width = Math.max(20, newSize.width);
            newSize.height = Math.max(20, newSize.height);

            dispatch(updateElementSize, { id: resizingElementId!, size: newSize });
        };

        window.addEventListener('mousemove', handleResizeMove);
        window.addEventListener('mouseup', stopResize);
    }

    return {
        onResizeStart,
    };
}