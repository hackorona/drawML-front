import React from 'react';
import Board from './components/Board';
import Setup from './components/Setup';

import { AppContextProvider } from './context/AppContext';
import AppContext from './context/AppContext';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <AppContext.Consumer>
          {
            context => (
              context.socket ? <Board /> : <Setup />
            )
          }

        </AppContext.Consumer>

      </AppContextProvider>

      
    </div>
  );
}

export default App;
