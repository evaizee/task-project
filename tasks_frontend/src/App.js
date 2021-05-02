//import logo from './logo.svg';
import './App.css';
import Hello from './Components/Hello';
import Dragable from './Components/Dragable';
import Clock from './Components/Clock';

function App() {
  return (
    <div className="App" id="app-root">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React from Now
        </a>
      </header> */}
      <Hello message="my old friend" />
      <Clock />
      <Dragable />
    </div>
  );
}

export default App;
