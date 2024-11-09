import styles from './TopPanel.module.css';
import { renamePresentationTitle } from '../store/renamePresentationTitle';
import { dispatch } from '../store/editor';

type TopPanelProps = {
	title: string;
};

export const TopPanel = ({ title }: TopPanelProps) => {
	const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const newValue = event.target.value;
		dispatch(renamePresentationTitle, newValue);
	};

	return (
		<>
			<header className={styles.header}>
				<div className={styles.topPanel}>
					<img className={styles.logo} src="/src/assets/logo.png"></img>
					<button>Add Slide</button>
					<button>Delete Slide</button>
				</div>
				<div className={styles.topPanel}>
					<button>Add text</button>
					<div className={styles.line}></div>
					<button>Add image</button>
					<div className={styles.line}></div>
					<button>Delete element</button>
					<div className={styles.line}></div>
					<button>Change background</button>
				</div>
				<div className={styles.topPanel}>
					<input
						className={styles.presentationName}
						value={title}
						onKeyUp={() => "this.style.width = ;"}
						onChange={onTitleChange}
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
