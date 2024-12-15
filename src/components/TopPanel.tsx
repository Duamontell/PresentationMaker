// import styles from './TopPanel.module.css';
// import { renamePresentationTitle } from '../store/renamePresentationTitle';
// import { removeSlide } from '../store/removeSlide';
// import { addTextElement } from '../store/addTextElement.ts';
// import { addImageElement } from '../store/addImageElement.ts';
// import { deleteElement } from '../store/deleteElement.ts';
// import { changeBackgroundColor } from '../store/changeBackgroundColor.ts';
// import { dispatch } from '../store/editor';
// import { importFromFile } from '../store/importFromFile.ts';
// import { useAppSelector } from '../hooks/useAppSelector.ts';
// import { useAppActions } from '../hooks/useAppActions.ts';

// type TopPanelProps = {
// 	title: string;
// };

// export const TopPanel = ({ title }: TopPanelProps) => {
// 	const { addSlide } = useAppActions()

// 	function onAddSlide() {
// 		addSlide
// 	}
// 	function onRemoveSlide() {
// 		dispatch(removeSlide)	
// 	}
// 	function onAddTextElement() {
// 		dispatch(addTextElement)
// 	}
// 	function onDeleteElement() {
// 		dispatch(deleteElement)
// 	}
// 	function onChangeBackgroundColor() {
// 		dispatch(changeBackgroundColor, "rgb(105, 28, 116)")
// 	}
// 	const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
// 		const newValue = event.target.value;
// 		dispatch(renamePresentationTitle, newValue);
// 	};
// 	const resizeInput = () => {
// 		const input = document.getElementById('name-change') as HTMLInputElement;
// 		if (input) {
// 			input.style.width = input.value.length + 'ch';
// 		}
// 	};
// 	const onAddImageElement = () => {
// 		const fileInput = document.getElementById('image-create') as HTMLInputElement;
// 		if (fileInput) {
// 			fileInput.click(); // Инициирует открытие окна выбора файла
// 		}
// 	};
// 	const onFileChange = () => {
// 		const fileInput = document.getElementById('image-create') as HTMLInputElement;
// 		const file = fileInput?.files?.[0];
// 		if (file) {
// 			const reader = new FileReader();
// 			console.log(reader.result as string);

// 			reader.onload = () => {
// 				if (reader.result) {
// 					const imageSrc = reader.result as string
// 					dispatch(addImageElement, imageSrc);
// 				}

// 			}

// 			reader.readAsDataURL(file);
// 		}
// 		fileInput.value = '';

// 	};

// 	const exportFromLocalStorage = () => {
// 		const editorData = localStorage.getItem("presentation");  // Строка в формате JSON

// 		if (editorData) {
// 			const editor = JSON.parse(editorData); // JS объект
// 			const jsonString = JSON.stringify(editor);

// 			const blob = new Blob([jsonString], { type: 'application/json' });
// 			const url = URL.createObjectURL(blob);
// 			const a = document.createElement('a');
// 			a.href = url;
// 			a.download = 'presentation.json';
// 			a.click();
// 			URL.revokeObjectURL(url);
// 		}
// 	};

// 	const saveButton = () => {
// 		const fileInput = document.getElementById('save-button') as HTMLInputElement;
// 		if (fileInput) {
// 			fileInput.click(); // Инициирует открытие окна выбора файла
// 		}
// 	}

// 	return (
// 		<>
// 			<header className={styles.header}>
// 				<div className={styles.topPanel}>
// 					<img className={styles.logo} src="/src/assets/logo.png"></img>
// 					<button onClick={addSlide}>Add Slide</button>
// 					<button onClick={onRemoveSlide}>Delete Slide</button>
// 				</div>
// 				<div className={styles.topPanel}>
// 					<button onClick={onAddTextElement}>Add text</button>
// 					<div className={styles.line}></div>
// 					<button onClick={onAddImageElement}>Add image</button>
// 					<input
// 						id='image-create'
// 						type="file"
// 						accept='image/*'
// 						style={{
// 							display: 'none'
// 						}}
// 						onChange={onFileChange}
// 					/>
// 					<div className={styles.line}></div>
// 					<button onClick={onDeleteElement}>Delete element</button>
// 					<div className={styles.line}></div>
// 					<button onClick={onChangeBackgroundColor}>Change background</button>
// 				</div>
// 				<div className={styles.topPanel}>
// 					<img className={styles.iconName} src="pen-filled-writing-tool.png" alt="Presentation name" />
// 					<input
// 						id='name-change'
// 						className={styles.presentationName}
// 						value={title}
// 						placeholder='Name'
// 						onChange={onTitleChange}
// 						onInput={resizeInput}
// 						maxLength={20}
// 					/>
// 					<div className={styles.line}></div>
// 					<button onClick={exportFromLocalStorage}>Save</button>
// 					<div className={styles.line}></div>
// 					<button onClick={saveButton}>Open</button>
// 					<input
// 						id='save-button'
// 						type="file"
// 						style={{
// 							display: 'none'
// 						}}
// 						onChange={importFromFile} />
// 				</div>
// 			</header>
// 		</>
// 	);
// };

import styles from './TopPanel.module.css';
import { importFromFile } from '../store/importFromFile.ts';
import { useAppSelector } from '../hooks/useAppSelector.ts';
import { useAppActions } from '../hooks/useAppActions.ts';


export function TopPanel() {
	const titleName = useAppSelector((editor => editor.presentation.title))
	const { addSlide,
		removeSlide,
		addTextElement,
		addImageElement,
		deleteElement,
		changeBackgroundColor,
		renamePresentationTitle,
		setEditor
	} = useAppActions()

	const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const newValue = event.target.value;
		renamePresentationTitle(newValue);
	};
	const resizeInput = () => {
		const input = document.getElementById('name-change') as HTMLInputElement;
		if (input) {
			input.style.width = input.value.length + 'ch';
		}
	};
	const onAddImageElement = () => {
		const fileInput = document.getElementById('image-create') as HTMLInputElement;
		if (fileInput) {
			fileInput.click(); // Инициирует открытие окна выбора файла
		}
	};
	const onFileChange = () => {
		const fileInput = document.getElementById('image-create') as HTMLInputElement;
		const file = fileInput?.files?.[0];

		if (file) {
			const reader = new FileReader();
			console.log(reader.result as string);

			reader.onload = () => {
				if (reader.result) {
					const imageSrc = reader.result as string
					addImageElement(imageSrc)
				}

			}

			reader.readAsDataURL(file);
		}

		fileInput.value = '';
	};

	const exportFromLocalStorage = () => {
		const editorData = localStorage.getItem("presentation");  // Строка в формате JSON

		if (editorData) {
			const editor = JSON.parse(editorData); // JS объект
			const jsonString = JSON.stringify(editor);

			const blob = new Blob([jsonString], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'presentation.json';
			a.click();
			URL.revokeObjectURL(url);
		}
	};

	const saveButton = () => {
		const fileInput = document.getElementById('save-button') as HTMLInputElement;
		if (fileInput) {
			fileInput.click();
		}
	}

	return (
		<>
			<header className={styles.header}>
				<div className={styles.topPanel}>
					<img className={styles.logo} src="/src/assets/logo.png"></img>
					<button onClick={addSlide}>Add Slide</button>
					<button onClick={removeSlide}>Delete Slide</button>
				</div>
				<div className={styles.topPanel}>
					<button onClick={addTextElement}>Add text</button>
					<div className={styles.line}></div>
					<button onClick={onAddImageElement}>Add image</button>
					<input
						id='image-create'
						type="file"
						accept='image/*'
						style={{
							display: 'none'
						}}
						onChange={onFileChange}
					/>
					<div className={styles.line}></div>
					<button onClick={deleteElement}>Delete element</button>
					<div className={styles.line}></div>
					<button onClick={() => changeBackgroundColor("rgb(105, 28, 116)")}>Change background</button>
				</div>
				<div className={styles.topPanel}>
					<img className={styles.iconName} src="pen-filled-writing-tool.png" alt="Presentation name" />
					<input
						id='name-change'
						className={styles.presentationName}
						value={titleName}
						placeholder='Name'
						onChange={onTitleChange}
						onInput={resizeInput}
						maxLength={20}
					/>
					<div className={styles.line}></div>
					<button onClick={exportFromLocalStorage}>Save</button>
					<div className={styles.line}></div>
					<button onClick={saveButton}>Open</button>
					<input
						id='save-button'
						type="file"
						style={{
							display: 'none'
						}}
						onChange={(event) => importFromFile(event, setEditor)}
					/>
				</div>
			</header>
		</>
	);
};
