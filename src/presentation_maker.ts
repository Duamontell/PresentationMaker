type Presentation = {
    id: string;
    title: string;
    author: string;
    createdDate: Date;
    updateDate: Date;
    slides: SlideCollection;
}

type SlideCollection = {
    slides: Slide[];
};

type Selection = {
    SelectedSlideId: string; // выбранные элементы
}

type Slide = {
    id: string;
    title: string;
    content: string[]; // создать типы элементов
    backgroundColor: string;
};

function updatePresentationTitle(presentation: Presentation, newTitle: string): Presentation {
    return {
        ...presentation,
        title: newTitle
    };
}

function addSlide(presentation: Presentation, newSlide: Slide): Presentation {
    return {
        ...presentation,
        slides: {
            ...presentation.slides,
            slides: [...presentation.slides.slides, newSlide]
        }
    };
}

function removeSlide(presentation: Presentation, slideId: string): Presentation {
    return {
        ...presentation,
        slides: {
            ...presentation.slides,
            slides: presentation.slides.slides.filter(slide => slide.id !== slideId)
        }
    };
}

function moveSlide(presentation: Presentation, fromIndex: number, toIndex: number): Presentation {
    const slides = [...presentation.slides.slides];
    const [movedSlide] = slides.splice(fromIndex, 1);
    slides.splice(toIndex, 0, movedSlide);

    return {
        ...presentation,
        slides: {
            ...presentation.slides,
            slides
        }
    };
}

function addContentToSlide(slide: Slide, content: string): Slide {
    return {
        ...slide,
        content: [...slide.content, content]
    };
}

function removeContentFromSlide(slide: Slide, content: string): Slide {
    return {
        ...slide,
        content: slide.content.filter(item => item !== content)
    };
}

function moveContent(slide: Slide, fromIndex: number, toIndex: number): Slide {
    const content = [...slide.content];
    const [movedContent] = content.splice(fromIndex, 1);
    content.splice(toIndex, 0, movedContent);

    return {
        ...slide,
        content
    };
}

function updateTextSize(slide: Slide, textIndex: number, newSize: string): Slide {
    return {
        ...slide,
        content: slide.content.map((item, index) =>
            index === textIndex ? `${item} (size: ${newSize})` : item
        )
    };
}

function updateText(slide: Slide, textIndex: number, newText: string): Slide {
    return {
        ...slide,
        content: slide.content.map((item, index) =>
            index === textIndex ? newText : item
        )
    };
}