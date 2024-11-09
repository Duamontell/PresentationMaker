import { Presentation } from "./types";
import { EditorType } from "./EditorType";

export const minPresentation: Presentation = {
	id: 'presentation-minimal',
	title: 'Minimal Presentation',
	author: 'Author 1',
	createdDate: new Date(),
	updateDate: new Date(),
	slides: []

};

export const maxPresentation: Presentation = {
	id: 'presentation-maximal',
	title: 'Maximal Presentation',
	author: 'Author 2',
	createdDate: new Date('2023-01-01'),
	updateDate: new Date('2023-01-02'),
	slides: [
		{
			id: 'slide-012',
			type: 'slide',
			content: [
				{
					id: "text1",
					type: "text",
					content: "Hello World!",
					fontSize: 16,
					fontFamily: "Arial",
					size: { width: 100, height: 50 },
					position: { x: 10, y: 10 },
				},
				{
					id: "image1",
					type: "image",
					src: "vite.svg",
					size: { width: 300, height: 300 },
					position: { x: 20, y: 50 },
				},
			],
			backgroundColor: 'white'
		},
		{
			id: 'slide-011',
			type: 'slide',
			content: [
				{
					id: "text2",
					type: "text",
					content: "Another Slide!",
					fontSize: 20,
					fontFamily: "Arial",
					size: { width: 150, height: 60 },
					position: { x: 15, y: 15 },
				},
				{
					id: "image2",
					type: "image",
					src: "Screenshot 2023-11-24 231127.png",
					size: { width: 300, height: 300 },
					position: { x: 25, y: 25 },
				},
			],
			backgroundColor: 'red'
		},
		{
			id: 'slide-008',
			type: 'slide',
			content: [
				{
					id: "image1",
					type: "image",
					src: "VoicemeeterBanana.jpg",
					size: { width: 500, height: 300 },
					position: { x: 20, y: 20 },
				},
			],
			backgroundColor: 'white'
		},
		{
			id: 'slide-007',
			type: 'slide',
			content: [
				{
					id: "image1",
					type: "image",
					src: "vite.svg",
					size: { width: 300, height: 300 },
					position: { x: 20, y: 20 },
				},
			],
			backgroundColor: 'white'
		},
		{
			id: 'slide-006',
			type: 'slide',
			content: [
				{
					id: "image1",
					type: "image",
					src: "vite.svg",
					size: { width: 300, height: 300 },
					position: { x: 20, y: 20 },
				},
			],
			backgroundColor: 'white'
		},
		{
			id: 'slide-005',
			type: 'slide',
			content: [
				{
					id: "text1",
					type: "text",
					content: "Hello World!",
					fontSize: 16,
					fontFamily: "Arial",
					size: { width: 100, height: 50 },
					position: { x: 10, y: 10 },
				},
				{
					id: "image1",
					type: "image",
					src: "vite.svg",
					size: { width: 300, height: 300 },
					position: { x: 100, y: 100 },
				},
			],
			backgroundColor: 'white'
		},
		{
			id: 'slide-004',
			type: 'slide',
			content: [
				{
					id: "image1",
					type: "image",
					src: "vite.svg",
					size: { width: 150, height: 300 },
					position: { x: 500, y: 20 },
				},
			],
			backgroundColor: 'white'
		},
		{
			id: 'slide-003',
			type: 'slide',
			content: [
				{
					id: "image1",
					type: "image",
					src: "vite.svg",
					size: { width: 300, height: 300 },
					position: { x: 20, y: 20 },
				},
			],
			backgroundColor: 'white'
		},
		{
			id: 'slide-002',
			type: 'slide',
			content: [
				{
					id: "text1",
					type: "text",
					content: "Hello World!",
					fontSize: 16,
					fontFamily: "Arial",
					size: { width: 100, height: 50 },
					position: { x: 10, y: 10 },
				},
				{
					id: "image1",
					type: "image",
					src: "vite.svg",
					size: { width: 300, height: 300 },
					position: { x: 20, y: 20 },
				},
			],
			backgroundColor: 'white'
		},
	]
};

export const editor: EditorType = {
	presentation: maxPresentation,
	selection: {
		selectedSlideId: maxPresentation.slides[0].id,
		selectionElementId: null
	}
}

