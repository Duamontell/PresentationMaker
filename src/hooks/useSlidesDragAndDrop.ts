import { useState } from 'react';
import { Slide } from '../store/types';
import { dispatch } from '../store/editor';
import { updateSlidesOrder } from '../store/updateSlidesOrder';

export function useSlidesDragAndDrop(slides: Slide[]) {
	const [draggedSlideId, setDraggedSlideId] = useState<string | null>(null);

	function onDragStart(event: React.DragEvent, slideId: string) {
		setDraggedSlideId(slideId);
		event.dataTransfer.effectAllowed = 'move';
	}

	function onDragOver(event: React.DragEvent) {
		event.preventDefault();
	}

	function onDrop(_: React.DragEvent, targetSlideId: string) {

		const draggedIndex = slides.findIndex((slide) => slide.id === draggedSlideId);
		const targetIndex = slides.findIndex((slide) => slide.id === targetSlideId);

		if (draggedIndex !== targetIndex) {
			const updatedSlides = [...slides];
			const [draggedSlide] = updatedSlides.splice(draggedIndex, 1);
			updatedSlides.splice(targetIndex, 0, draggedSlide);

			dispatch(updateSlidesOrder, updatedSlides);
		}

		setDraggedSlideId(null);
	}

	function onDragEnd() {
		setDraggedSlideId(null);
	}

	return {
		onDragStart,
		onDragOver,
		onDrop,
		onDragEnd,
	};
}
