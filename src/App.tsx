import { TopPanel } from './components/TopPanel';
import { SlidesList } from './components/SlidesList';
import { Workspace } from './components/Workspace';
import { Presentation, Slide } from './store/types';
import React from 'react';
import styles from './App.module.css';

type AppProps = {
  presentation: Presentation;
};

class App extends React.Component<AppProps, { selectedSlide: Slide }> {
  constructor(props: AppProps) {
    super(props);
    this.state = { selectedSlide: props.presentation.slides.slides[0] };
  }

  handleSlideSelect = (slide: Slide) => {
    this.setState({ selectedSlide: slide });
  };

  render() {
    const slides = this.props.presentation.slides.slides;
    const { selectedSlide } = this.state;
    
    return (
      <>
        <TopPanel title={this.props.presentation.title} />
        <div className={styles.container}>
          <SlidesList 
            slides={slides} 
            onSlideSelect={this.handleSlideSelect} 
          />
          <Workspace slide={selectedSlide} />
        </div>
      </>
    );
  }
}

export default App;