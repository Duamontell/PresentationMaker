"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updatePresentationTitle(presentation, newTitle) {
    return Object.assign(Object.assign({}, presentation), { title: newTitle });
}
function addSlide(presentation, newSlide) {
    return Object.assign(Object.assign({}, presentation), { slides: Object.assign(Object.assign({}, presentation.slides), { slides: [...presentation.slides.slides, newSlide] }) });
}
function removeSlide(presentation, slideId) {
    return Object.assign(Object.assign({}, presentation), { slides: Object.assign(Object.assign({}, presentation.slides), { slides: presentation.slides.slides.filter(slide => slide.id !== slideId) }) });
}
function moveSlide(presentation, fromIndex, toIndex) {
    const slides = [...presentation.slides.slides];
    const [movedSlide] = slides.splice(fromIndex, 1);
    slides.splice(toIndex, 0, movedSlide);
    return Object.assign(Object.assign({}, presentation), { slides: Object.assign(Object.assign({}, presentation.slides), { slides }) });
}
function addContentToSlide(slide, content) {
    return Object.assign(Object.assign({}, slide), { content: [...slide.content, content] });
}
function removeContentFromSlide(slide, content) {
    return Object.assign(Object.assign({}, slide), { content: slide.content.filter(item => item !== content) });
}
function moveContent(slide, fromIndex, toIndex) {
    const content = [...slide.content];
    const [movedContent] = content.splice(fromIndex, 1);
    content.splice(toIndex, 0, movedContent);
    return Object.assign(Object.assign({}, slide), { content });
}
function updateTextSize(slide, textIndex, newSize) {
    return Object.assign(Object.assign({}, slide), { content: slide.content.map((item, index) => index === textIndex ? `${item} (size: ${newSize})` : item) });
}
function updateText(slide, textIndex, newText) {
    return Object.assign(Object.assign({}, slide), { content: slide.content.map((item, index) => index === textIndex ? newText : item) });
}
let presentaion1 = {
    id: "1",
    title: "pss",
    author: "string",
    createdDate: new Date,
    updateDate: new Date,
    slides: {
        slides: []
    },
};
presentaion1 = updatePresentationTitle(presentaion1, "ввв");
