import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { minPresentation, maxPresentation } from './store/data.ts'

// import { EditorType } from './store/types.ts'
import { Presentation } from './store/types.ts'

let presentation = minPresentation;
presentation = maxPresentation;

// Рендерим приложение
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App presentation={presentation} />
  </StrictMode>
);