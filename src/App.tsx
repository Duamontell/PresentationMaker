// // import { EditorType } from "./store/EditorType.ts";
// // import { TopPanel } from './components/TopPanel';
// // import { SlidesList } from './components/SlidesList';
// // import { Workspace } from './components/Workspace';
// // import { useEffect } from "react";
// // import styles from './App.module.css';

// // type AppProps = {
// //   editor: EditorType,
// // }

// // function App({ editor }: AppProps) {
// //   useEffect(() => {
// //     localStorage.setItem("presentation", JSON.stringify(editor));
// //   }, [editor]);

// //   useEffect(() => {
// //     const disableZoom = (event: WheelEvent) => {
// //       if (event.ctrlKey) {
// //         event.preventDefault();
// //       }
// //     };

// //     window.addEventListener('wheel', disableZoom, { passive: false });
// //   }, []);

// //   const selectedSlide = editor.selection
// //     ? editor.presentation.slides.find(slide => slide.id === editor.selection?.selectedSlideId) || editor.presentation.slides[0]
// //     : editor.presentation.slides[0];
// //   console.dir(editor);

// //   return (
// //     <>
// //       <TopPanel title={editor.presentation.title}></TopPanel>
// //       <div className={styles.container}>
// //         <SlidesList slides={editor.presentation.slides} selection={editor.selection}></SlidesList>
// //         <Workspace slide={selectedSlide} selection={editor.selection}></Workspace>
// //       </div>
// //     </>
// //   )
// // }

// // export default App

// import { EditorType } from "./store/EditorType.ts";
// import { TopPanel } from './components/TopPanel';
// import { SlidesList } from './components/SlidesList';
// import { Workspace } from './components/Workspace';
// import { useEffect } from "react";
// import styles from './App.module.css';

// type AppProps = {
//   editor: EditorType,
// }

// function App({ editor }: AppProps) {
//   useEffect(() => {
//     localStorage.setItem("presentation", JSON.stringify(editor));
//   }, [editor]);

//   useEffect(() => {
//     const disableZoom = (event: WheelEvent) => {
//       if (event.ctrlKey) {
//         event.preventDefault();
//       }
//     };

//     window.addEventListener('wheel', disableZoom, { passive: false });
//   }, []);

//   const selectedSlide = editor.selection
//     ? editor.presentation.slides.find(slide => slide.id === editor.selection?.selectedSlideId) || editor.presentation.slides[0]
//     : editor.presentation.slides[0];
//   console.dir(editor);

//   return (
//     <>
//       <TopPanel title={editor.presentation.title}></TopPanel>
//       <div className={styles.container}>
//         <SlidesList></SlidesList>
//         <Workspace></Workspace>
//       </div>
//     </>
//   )
// }

// export default App

// import { EditorType } from "./store/EditorType.ts";
// import { TopPanel } from './components/TopPanel';
// import { SlidesList } from './components/SlidesList';
// import { Workspace } from './components/Workspace';
// import { useEffect } from "react";
// import styles from './App.module.css';

// type AppProps = {
//   editor: EditorType,
// }

// function App({ editor }: AppProps) {
//   useEffect(() => {
//     localStorage.setItem("presentation", JSON.stringify(editor));
//   }, [editor]);

//   useEffect(() => {
//     const disableZoom = (event: WheelEvent) => {
//       if (event.ctrlKey) {
//         event.preventDefault();
//       }
//     };

//     window.addEventListener('wheel', disableZoom, { passive: false });
//   }, []);

//   const selectedSlide = editor.selection
//     ? editor.presentation.slides.find(slide => slide.id === editor.selection?.selectedSlideId) || editor.presentation.slides[0]
//     : editor.presentation.slides[0];
//   console.dir(editor);

//   return (
//     <>
//       <TopPanel title={editor.presentation.title}></TopPanel>
//       <div className={styles.container}>
//         <SlidesList slides={editor.presentation.slides} selection={editor.selection}></SlidesList>
//         <Workspace slide={selectedSlide} selection={editor.selection}></Workspace>
//       </div>
//     </>
//   )
// }

// export default App

import { EditorType } from "./store/EditorType.ts";
import { TopPanel } from './components/TopPanel';
import { SlidesList } from './components/SlidesList';
import { Workspace } from './components/Workspace';
import { useEffect } from "react";
import styles from './App.module.css';

type AppProps = {
  editor: EditorType,
}

function App() {
  // useEffect(() => {
  //   localStorage.setItem("presentation", JSON.stringify(editor));
  // }, [editor]);

  useEffect(() => {
    const disableZoom = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', disableZoom, { passive: false });
  }, []);

  // const selectedSlide = editor.selection
  //   ? editor.presentation.slides.find(slide => slide.id === editor.selection?.selectedSlideId) || editor.presentation.slides[0]
  //   : editor.presentation.slides[0];
  // console.dir(editor);

  return (
    <>
      <TopPanel></TopPanel>
      <div className={styles.container}>
        <SlidesList></SlidesList>
        <Workspace></Workspace>
      </div>
    </>
  )
}

export default App