import logo from './logo.svg';
import * as React from 'react';
import { CountButton } from './test';
import './App.css';
import Button from '@mui/material/Button'; //abby add 9/14

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <LoginButton/>
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
          Learn React
        </a>
      </header>
    </div>
  );
}

export function LoginButton() {
  //const [count, setCount] = useState(0);

  return (
      //<Button variant="contained" onClick={() => {go to dashboard}}>Log In!</Button>
      <Button variant="contained">Log In!</Button>
  );
}

export default App;
