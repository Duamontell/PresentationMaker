import styles from './TopPanel.module.css';
import { importFromFile } from '../store/importFromFile.ts';
import { useAppSelector } from '../hooks/useAppSelector.ts';
import { useAppActions } from '../hooks/useAppActions.ts';
import { HistoryContext } from '../hooks/historyContenx.ts';
import React, { useEffect, useRef } from 'react';
import { exportPresentationToPDF } from '../store/exportPresentationToPDF.ts';


export function TopPanel() {
	const titleName = useAppSelector((editor => editor.presentation.title));
	const slides = useAppSelector((editor) => editor.presentation.slides);

	const {
		addSlide,
		removeSlide,
		addTextElement,
		addImageElement,
		deleteElement,
		changeFontFamily,
		changeFontSize,
		changeFontColor,
		changeBackgroundColor,
		changeBackgroundImage,
		renamePresentationTitle,
		setEditor
	} = useAppActions()

	const history = React.useContext(HistoryContext)

	function onUndo() {
		const newEditor = history.undo()
		if (newEditor) {
			setEditor(newEditor)
		}
	}

	function onRedo() {
		const newEditor = history.redo()
		if (newEditor) {
			setEditor(newEditor)
		}
	}

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey || event.metaKey) {
				switch (event.key) {
					case "z": case "я":
						onUndo();
						break;
					case "y": case "н":
						onRedo();
						break;
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);
	}, []);

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
			fileInput.click();
		}
	};
	const onFileChange = () => {
		const fileInput = document.getElementById('image-create') as HTMLInputElement;
		const file = fileInput?.files?.[0];

		if (file) {
			const reader = new FileReader();

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

	const changeImageBackground = useRef<HTMLInputElement | null>(null);
	const timerRef = useRef<number | null>(null);

	const openDialog = (dialogId: string) => {
		const openDialogs = document.querySelectorAll('dialog[open]');
		openDialogs.forEach((dialog) => {
			(dialog as HTMLDialogElement).close();
		});

		const dialog = document.getElementById(dialogId) as HTMLDialogElement;
		dialog?.show();
	};

	const closeDialog = (dialogId: string) => {
		const dialog = document.getElementById(dialogId) as HTMLDialogElement;
		dialog?.close();
	};

	const onAddBackgroundImage = () => {
		changeImageBackground.current?.click();
	};

	const openColorPicker = (colorPickerId: string) => {
		const colorPicker = document.getElementById(colorPickerId) as HTMLDialogElement;
		colorPicker?.click();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
		const newValue = e.target.value;
		const selectedId = e.target.id;

		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		timerRef.current = setTimeout(() => {
			if (selectedId == 'color-picker-text') {
				changeFontColor(newValue);
			} else if (selectedId == 'color-picker-background') {
				changeBackgroundColor(newValue);
			} else if (selectedId == 'input-font-size') {
				const newFontSize = parseInt(newValue, 10);
				changeFontSize(newFontSize)
			} else if (selectedId == 'font-famaly-select') {
				changeFontFamily(newValue)
			}
		}, 500);
	};

	const handleBackgroundImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) {
					changeBackgroundImage(reader.result as string);
				}
			};
			reader.readAsDataURL(file);
			event.target.value = '';
		}
	};

	const exportFromLocalStorage = () => {
		const editorData = localStorage.getItem("presentation");

		if (editorData) {
			const editor = JSON.parse(editorData);
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
					<button onClick={onUndo}>
						<img className={styles.undoRedoButton} src="undo-left-round.svg" alt="Back changes" />
					</button>
					<div className={styles.line}></div>
					<button onClick={onRedo}>
						<img className={styles.undoRedoButton} src="undo-right-round.svg" alt="revert back changes" />
					</button>
					<div className={styles.line}></div>
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
					<dialog aria-labelledby='Font family' id='dialog-font-family'>
						<select name="fontFamily" id="font-famaly-select" style={{ marginRight: '5px' }} onChange={handleChange}>
							<option value="">Select font family</option>
							<option value="arial">Arial</option>
							<option value="comfortaa">Comfortaa</option>
							<option value="gillSans">Gill Sans</option>
						</select>
						<button onClick={() => closeDialog('dialog-font-family')}>Close</button>
					</dialog>
					<dialog aria-labelledby='Font size' id='dialog-font-size'>
						<div className={styles.dialogWindow}>
							<p style={{
								margin: 'auto',
								marginBottom: '5px',
								fontWeight: '1000',
							}}>
								Enter font size
							</p>
							<input
								type="number"
								id='input-font-size'
								onChange={handleChange}
							/>
							<button onClick={() => closeDialog('dialog-font-size')}>Close</button>
						</div>
					</dialog>
					<dialog aria-labelledby='Edit text' id='dialog-edit-text'>
						<div className={styles.dialogWindow}>
							<button onClick={() => openDialog('dialog-font-family')}>Font family</button>
							<input
								type="file"
								accept="image/*"
								onChange={handleBackgroundImageUpload}
								style={{
									display: 'none'
								}}
							/>
							<button onClick={() => openDialog('dialog-font-size')}>
								Font size
							</button>
							<button onClick={() => openColorPicker('color-picker-text')}>
								<input
									type="color"
									id="color-picker-text"
									style={{
										visibility: 'hidden',
										position: 'absolute'
									}}
									onChange={handleChange}
								/>
								Font color
							</button>
							<button onClick={() => closeDialog('dialog-edit-text')}>Close</button>
						</div>
					</dialog>
					<button onClick={() => openDialog('dialog-edit-text')}>Edit text</button>
					<div className={styles.line}></div>
					<button onClick={deleteElement}>Delete element</button>
					<div className={styles.line}></div>
					<dialog aria-labelledby='Change background' id='dialog-backgraound'>
						<div className={styles.dialogWindow}>
							<button onClick={onAddBackgroundImage}>Upload from PC</button>
							<input
								type="file"
								ref={changeImageBackground}
								accept="image/*"
								onChange={handleBackgroundImageUpload}
								style={{
									display: 'none'
								}}
							/>
							<button onClick={() => openColorPicker('color-picker-background')}>
								<input
									type="color"
									id="color-picker-background"
									style={{
										visibility: 'hidden',
										position: 'absolute'
									}}
									onChange={handleChange}
								/>
								Select color
							</button>
							<button onClick={() => closeDialog('dialog-backgraound')}>Close</button>
						</div>
					</dialog>
					<button onClick={() => openDialog('dialog-backgraound')}>Change background</button>
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
					<input
						id='save-button'
						type="file"
						style={{
							display: 'none'
						}}
						onChange={(event) => importFromFile(event, setEditor)}
					/>
					<button onClick={saveButton}>Open</button>
					<button onClick={() => exportPresentationToPDF(slides, titleName)}>Export to PDF</button>
				</div>
			</header>
		</>
	);
};
