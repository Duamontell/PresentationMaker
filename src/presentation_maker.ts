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

type Slide = {
    id: string;
    title: string;
    content: (TextElement | ImageElement)[]; // создать типы элементов
    backgroundColor: string;
};

type TextElement = {
    id: string;
    type: 'text';
    content: string;
    fontSize: number;
    fontFamily: string;
};

type ImageElement = {
    id: string;
    type: 'image';
    src: string;
    width: number;
    height: number;
};

type Selection = {
    SelectedSlideId: string[]; // выбранные элементы
}

// Изменение названия презентации
function updatePresentationTitle(presentation: Presentation, newTitle: string): Presentation {
    return {
        ...presentation,
        title: newTitle,
        updateDate: new Date()
    };
}

// Добавление слайда
function addSlide(presentation: Presentation, newSlide: Slide): Presentation {
    return {
        ...presentation,
        slides: {
            slides: [...presentation.slides.slides, newSlide]
        },
        updateDate: new Date()
    };
}

// Удаление слайда
function removeSlide(presentation: Presentation, slideId: string): Presentation {
    return {
        ...presentation,
        slides: {
            slides: presentation.slides.slides.filter(slide => slide.id !== slideId)
        },
        updateDate: new Date()
    };
}

// Изменение позиции слайда
function moveSlide(presentation: Presentation, fromIndex: number, toIndex: number): Presentation {
    const slides = [...presentation.slides.slides];
    const [movedSlide] = slides.splice(fromIndex, 1);
    slides.splice(toIndex, 0, movedSlide);

    return {
        ...presentation,
        slides: {
            slides
        },
        updateDate: new Date()
    };
}

// Добавление текста
function addTextToSlide(presentation: Presentation, slideId: string, newText: TextElement): Presentation {
    return {
        ...presentation,
        slides: {
            slides: presentation.slides.slides.map(slide =>
                slide.id === slideId
                    ? { ...slide, content: [...slide.content, newText] }
                    : slide
            )
        },
        updateDate: new Date()
    };
}

// Удаление текста
function removeTextFromSlide(presentation: Presentation, slideId: string, textId: string): Presentation {
    return {
        ...presentation,
        slides: {
            slides: presentation.slides.slides.map(slide =>
                slide.id === slideId
                    ? { ...slide, content: slide.content.filter(item => item.type !== 'text' || item.id !== textId) }
                    : slide
            )
        },
        updateDate: new Date()
    };
}

// Изменение позиции текста
function moveTextPosition(presentation: Presentation, slideId: string, textId: string, newIndex: number): Presentation {
    return {
        ...presentation,
        slides: {
            slides: presentation.slides.slides.map(slide => {
                if (slide.id === slideId) {
                    const content = [...slide.content];
                    const textIndex = content.findIndex(item => item.type === 'text' && item.id === textId);
                    if (textIndex > -1) {
                        const [movedText] = content.splice(textIndex, 1);
                        content.splice(newIndex, 0, movedText);
                    }
                    return { ...slide, content };
                }
                return slide;
            })
        },
        updateDate: new Date()
    };
}

// Изменение размера текста
function updateTextSize(presentation: Presentation, slideId: string, textId: string, newSize: number): Presentation {
    return {
        ...presentation,
        slides: {
            slides: presentation.slides.slides.map(slide => {
                if (slide.id === slideId) {
                    const updatedContent = slide.content.map(item =>
                        item.type === 'text' && item.id === textId
                            ? { ...item, fontSize: newSize }
                            : item
                    );
                    return { ...slide, content: updatedContent };
                }
                return slide;
            })
        },
        updateDate: new Date()
    };
}

// Изменение текста
function updateTextContent(presentation: Presentation, slideId: string, textId: string, newContent: string): Presentation {
    return {
        ...presentation,
        slides: {
            slides: presentation.slides.slides.map(slide => {
                if (slide.id === slideId) {
                    const updatedContent = slide.content.map(item =>
                        item.type === 'text' && item.id === textId
                            ? { ...item, content: newContent }
                            : item
                    );
                    return { ...slide, content: updatedContent };
                }
                return slide;
            })
        },
        updateDate: new Date()
    };
}

// Изменение семейства шрифтов у текста
function updateFontFamily(presentation: Presentation, slideId: string, textId: string, newFontFamily: string): Presentation {
    return {
        ...presentation,
        slides: {
            slides: presentation.slides.slides.map(slide => {
                if (slide.id === slideId) {
                    const updatedContent = slide.content.map(item =>
                        item.type === 'text' && item.id === textId
                            ? { ...item, fontFamily: newFontFamily }
                            : item
                    );
                    return { ...slide, content: updatedContent };
                }
                return slide;
            })
        },
        updateDate: new Date()
    };
}

// Изменение фона слайда
function updateSlideBackground(presentation: Presentation, slideId: string, newBackgroundColor: string): Presentation {
    return {
        ...presentation,
        slides: {
            slides: presentation.slides.slides.map(slide =>
                slide.id === slideId ? { ...slide, backgroundColor: newBackgroundColor } : slide
            )
        },
        updateDate: new Date()
    };
}

// Добавление картинки на слайд
function addImageToSlide(presentation: Presentation, slideId: string, newImage: ImageElement): Presentation {
    return {
        ...presentation,
        slides: {
            slides: presentation.slides.slides.map(slide =>
                slide.id === slideId
                    ? { ...slide, content: [...slide.content, newImage] }
                    : slide
            )
        },
        updateDate: new Date()
    };
}

// Удаление картинки с слайда
function removeImageFromSlide(presentation: Presentation, slideId: string, imageId: string): Presentation {
    return {
        ...presentation,
        slides: {
            slides: presentation.slides.slides.map(slide =>
                slide.id === slideId
                    ? { ...slide, content: slide.content.filter(item => item.type !== 'image' || item.id !== imageId) }
                    : slide
            )
        },
        updateDate: new Date()
    };
}

// Изменение позиции картинки
function moveImagePosition(presentation: Presentation, slideId: string, imageId: string, newIndex: number): Presentation {
    return {
        ...presentation,
        slides: {
            slides: presentation.slides.slides.map(slide => {
                if (slide.id === slideId) {
                    const content = [...slide.content];
                    const imageIndex = content.findIndex(item => item.type === 'image' && item.id === imageId);
                    if (imageIndex > -1) {
                        const [movedImage] = content.splice(imageIndex, 1);
                        content.splice(newIndex, 0, movedImage);
                    }
                    return { ...slide, content };
                }
                return slide;
            })
        },
        updateDate: new Date()
    };
}

// Изменение размера картинки
function updateImageSize(presentation: Presentation, slideId: string, imageId: string, newWidth: number, newHeight: number): Presentation {
    return {
        ...presentation,
        slides: {
            slides: presentation.slides.slides.map(slide => {
                if (slide.id === slideId) {
                    const updatedContent = slide.content.map(item =>
                        item.type === 'image' && item.id === imageId
                            ? { ...item, width: newWidth, height: newHeight }
                            : item
                    );
                    return { ...slide, content: updatedContent };
                }
                return slide;
            })
        },
        updateDate: new Date()
    };
}




// Минимальные данные
const minimalPresentation: Presentation = {
    id: 'presentation-minimal',
    title: 'Minimal Presentation',
    author: 'Author 1',
    createdDate: new Date(),
    updateDate: new Date(),
    slides: {
        slides: []
    }
};

// Максимальные данные
const maximalPresentation: Presentation = {
    id: 'presentation-maximal',
    title: 'Maximal Presentation',
    author: 'Author 2',
    createdDate: new Date('2023-01-01'),
    updateDate: new Date('2023-01-02'),
    slides: {
        slides: [
            {
                id: 'slide-001',
                title: 'Slide 1',
                content: [
                    { id: 'text1', type: 'text', content: 'Hello World!', fontSize: 16, fontFamily: 'Arial' },
                    { id: 'image1', type: 'image', src: 'image-url-1.jpg', width: 300, height: 200 }
                ],
                backgroundColor: 'white'
            },
            {
                id: 'slide-002',
                title: 'Slide 2',
                content: [
                    { id: 'text2', type: 'text', content: 'Another Slide!', fontSize: 20, fontFamily: 'Verdana' },
                    { id: 'image2', type: 'image', src: 'image-url-2.jpg', width: 400, height: 300 }
                ],
                backgroundColor: 'lightgrey'
            }
        ]
    }
};

// Тестирование функций
function testFunctions() {
    console.log("Testing with minimal data:");
    let presentation = minimalPresentation;

    // Изменение названия презентации
    presentation = updatePresentationTitle(presentation, 'Updated Minimal Title');
    console.log(presentation);

    // Добавление слайда
    const newSlide: Slide = {
        id: 'slide-003',
        title: 'New Slide',
        content: [],
        backgroundColor: 'blue'
    };
    presentation = addSlide(presentation, newSlide);
    console.log(presentation);

    // Удаление слайда
    presentation = removeSlide(presentation, 'slide-003');
    console.log(presentation);

    // Проверяем функции с максимальными данными
    console.log("Testing with maximal data:");
    presentation = maximalPresentation;

    // Изменение названия презентации
    presentation = updatePresentationTitle(presentation, 'Updated Maximal Title');
    console.log(presentation);

    // Добавление нового слайда
    const anotherSlide: Slide = {
        id: 'slide-003',
        title: 'Another New Slide',
        content: [],
        backgroundColor: 'green'
    };
    presentation = addSlide(presentation, anotherSlide);
    console.log(presentation);

    // Удаление слайда
    presentation = removeSlide(presentation, 'slide-002');
    console.log(presentation);

    // Обновление текста на слайде
    const newText: TextElement = { id: 'text3', type: 'text', content: 'New Text Element', fontSize: 18, fontFamily: 'Tahoma' };
    presentation = addTextToSlide(presentation, 'slide-001', newText);
    console.log(presentation);

    // Изменение текста
    presentation = updateTextContent(presentation, 'slide-001', 'text3', 'Updated Text Element');
    console.log(presentation);

    // Изменение размера текста
    presentation = updateTextSize(presentation, 'slide-001', 'text3', 22);
    console.log(presentation);

    // Изменение семейства шрифтов
    presentation = updateFontFamily(presentation, 'slide-001', 'text3', 'Helvetica');
    console.log(presentation);

    // Добавление изображения
    const newImage: ImageElement = { id: 'image3', type: 'image', src: 'image-url-3.jpg', width: 500, height: 400 };
    presentation = addImageToSlide(presentation, 'slide-001', newImage);
    console.log(presentation);

    // Изменение размера картинки
    presentation = updateImageSize(presentation, 'slide-001', 'image3', 600, 500);
    console.log(presentation);

    // Удаление текста
    presentation = removeTextFromSlide(presentation, 'slide-001', 'text3');
    console.log(presentation);

    // Изменение фона слайда
    presentation = updateSlideBackground(presentation, 'slide-001', 'yellow');
    console.log(presentation);
}

// Запуск тестов
testFunctions();
