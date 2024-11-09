import styles from './TopPanel.module.css';

type TopPanelProps = {
	title: string;
};

export const TopPanel = ({ title }: TopPanelProps) => {
	return (
		<>
			<header className={styles.header}>
				<img src='/public/vite.svg'></img>
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
					<h1 className={styles.presentationName}>Name: {title}</h1>
					<div className={styles.line}></div>
					<button>Save</button>
					<div className={styles.line}></div>
					<button>Open</button>
				</div>
			</header>
		</>
	);
};
