//import logo from './logo.svg';
import './App.css';
import Board from './Components/Board';
import Clock from './Components/Clock';
import { Provider } from "react-redux"
import store from './store';
//import { createStore } from "redux"
//import allReducers from "./Reducers"

//let store = createStore(allReducers)

function App() {
  return (
    <Provider store={store}>
      <div className="App" id="app-root">
        <Clock />
        <Board />
      </div>
    </Provider>
  );
}

export default App;
