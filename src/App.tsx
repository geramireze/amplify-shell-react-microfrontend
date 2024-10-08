import logo from './logo.svg';
import './App.css';
import React from 'react';

const MicroApp = React.lazy(() => import('microApp1/MicroApp'));
const MicroApp2 = React.lazy(() => import('microApp2/MicroApp'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <MicroApp />
      <MicroApp2 />
    </div>
  );
}

export default App;
