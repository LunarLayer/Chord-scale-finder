import React from 'react';

import MusicContext from './context/MusicContext';
import BrowserContext from './context/CSFContext';

import Navbar from './components/Navbar';
import Toolbar from './components/Toolbar';
import Display from './components/Display';

function App() {
  return (
    <BrowserContext>
      <MusicContext>
        <Navbar />
        <Toolbar />
        <Display />
      </MusicContext>
    </BrowserContext>
  );
};

export default App;
