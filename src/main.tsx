import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { addEditorChangeHandler, getEditor } from "./store/editor.ts";
import { Provider } from 'react-redux'
import { store } from './store/redux/store.ts';

const root = createRoot(document.getElementById('root')!)
// function render() {
  root.render(
    <StrictMode>
      <Provider store={store}>
        {/* <App editor={getEditor()} /> */}
        <App/>
      </Provider>
    </StrictMode>
  )
// }

// addEditorChangeHandler(render)
// render()