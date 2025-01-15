import styles from './App.module.css';
import { TopPanel } from './components/TopPanel';
import { SlidesList } from './components/SlidesList';
import { Workspace } from './components/Workspace';
import { HistoryType } from './store/history/history';
import { HistoryContext } from './hooks/historyContenx';

type AppProps = {
  history: HistoryType
};

function App({ history }: AppProps) {
  return (
    <HistoryContext.Provider value={history}>
      <TopPanel></TopPanel>
      <div className={styles.container}>
        <SlidesList></SlidesList>
        <Workspace></Workspace>
      </div>
    </HistoryContext.Provider>
  )
}

export default App