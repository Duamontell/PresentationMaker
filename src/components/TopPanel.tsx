import { renamePresentationTitle } from '../store/renamePresentationTitle';
import { addSlide } from '../store/addSlide.ts'
import { removeSlide } from '../store/removeSlide';
import { addTextElement } from '../store/addTextElement.ts';
import { addImageElement } from '../store/addImageElement.ts';
import { deleteElement } from '../store/deleteElement.ts';
import { changeBackgroundColor } from '../store/changeBackgroundColor.ts';
import { dispatch } from '../store/editor';
import styles from './TopPanel.module.css';

type TopPanelProps = {
	title: string;
};

export const TopPanel = ({ title }: TopPanelProps) => {
	function onAddSlide() {
		dispatch(addSlide)
	}
	function onRemoveSlide() {
		dispatch(removeSlide)
	}
	function onAddTextElement() {
		dispatch(addTextElement)
	}
	// function onAddImageElement() {
	// 	const fileInput = document.getElementById('image-create') as HTMLInputElement;
	// 	if (fileInput) {
	// 		fileInput.click(); // Открывает диалоговое окно выбора файла
	// 	}
	// }
	function onDeleteElement() {
		dispatch(deleteElement)
	}
	function onChangeBackgroundColor() {
		dispatch(changeBackgroundColor, "rgb(105, 28, 116)")
	}
	const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const newValue = event.target.value;
		dispatch(renamePresentationTitle, newValue);
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
			const imageUrl = URL.createObjectURL(file);
			dispatch(addImageElement, imageUrl); // Передаем `imageUrl` в функцию
		}
	};

	return (
		<>
			<header className={styles.header}>
				<div className={styles.topPanel}>
					<img className={styles.logo} src="/src/assets/logo.png"></img>
					<button onClick={onAddSlide}>Add Slide</button>
					<button onClick={onRemoveSlide}>Delete Slide</button>
				</div>
				<div className={styles.topPanel}>
					<button onClick={onAddTextElement}>Add text</button>
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
					<button onClick={onDeleteElement}>Delete element</button>
					<div className={styles.line}></div>
					<button onClick={onChangeBackgroundColor}>Change background</button>
				</div>
				<div className={styles.topPanel}>
					<img className={styles.iconName} src="pen-filled-writing-tool.png" alt="Presentation name" />
					<input
						id='name-change'
						className={styles.presentationName}
						value={title}
						placeholder='Name'
						onChange={onTitleChange}
						onInput={resizeInput}
						maxLength={20}
					/>
					<div className={styles.line}></div>
					<button>Save</button>
					<div className={styles.line}></div>
					<button>Open</button>
				</div>
			</header>
		</>
	);
};
