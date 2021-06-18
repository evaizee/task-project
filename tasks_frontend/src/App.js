//import logo from './logo.svg';
import './App.css';
import Hello from './Components/Hello';
import Board from './Components/Board';
import Clock from './Components/Clock';
import { Provider } from "react-redux"
import { createStore } from "redux"
import allReducers from "./Reducers"

let store = createStore(allReducers)

function App() {
  return (
    <Provider store={store}>
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
        <Board />
      </div>
    </Provider>
  );
}

export default App;
