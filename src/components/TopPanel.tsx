import styles from './TopPanel.module.css';
import { renamePresentationTitle } from '../store/renamePresentationTitle';
import { addSlide } from '../store/addSlide.ts'
import { removeSlide } from '../store/removeSlide';
import { addTextElement } from '../store/addTextElement.ts';
import { addImageElement } from '../store/addImageElement.ts';
import { deleteElement } from '../store/deleteElement.ts';
import { dispatch } from '../store/editor';

type TopPanelProps = {
	title: string;
};

const resizeInput = () => {
	const input = document.querySelector('input');
	if (input) {
		input.style.width = input.value.length + 'ch';
	}
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
	function onAddImageElement() {
		dispatch(addImageElement)
	}
	function onDeleteElement() {
		dispatch(deleteElement)
	}
	const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const newValue = event.target.value;
		dispatch(renamePresentationTitle, newValue);
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
					/>
					<div className={styles.line}></div>
					<button onClick={onDeleteElement}>Delete element</button>
					<div className={styles.line}></div>
					<button>Change background</button>
				</div>
				<div className={styles.topPanel}>
					<img className={styles.iconName} src="public\pen-filled-writing-tool.png" alt="Presentation name" />
					<input
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
