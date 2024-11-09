// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import { minPresentation, maxPresentation } from './store/data.ts'

// import { Presentation } from './store/types.ts'

// let presentation = minPresentation;
// presentation = maxPresentation;

// // Рендерим приложение
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App presentation={presentation} />
//   </StrictMode>
// );


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { addEditorChangeHandler, getEditor } from "./store/editor.ts";

const root = createRoot(document.getElementById('root')!)
function render() {
  root.render(
    <StrictMode>
      <App editor={getEditor()} />
    </StrictMode>,
  )
}

addEditorChangeHandler(render)
render()