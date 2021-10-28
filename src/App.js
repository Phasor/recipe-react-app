import Counter from "./Counter";
import CounterHooks from "./CounterHooks";
import React, { useState } from 'react';

//initialise a context outside of function
export const ThemeContext = React.createContext();

function App() {

  //we need to use State, set by context so that when context changes, state changes > re-render
  const [buttonSize, setButtonSize] = useState('10px')
  const [buttonColor, setButtonColor] = useState('red')

  return (
    //we need to wrap everything we want to have access to the Context in a Provider tag
    //in context provider tag we must pass through a value equal to our state variable so it can change
    <ThemeContext.Provider value={{ fontSize: buttonSize, backgroundColor: buttonColor }}>
      Counter
      < Counter initialCount={0} />
      <br />
      CounterHooks
      < CounterHooks initialCount={0} />
      <br />

      <button onClick={() => setButtonSize(prevSize => {
        return prevSize === '10px' ? '30px' : '10px'
      })}>Toggle Button Size</button>

      <br />
      <br />

      <button onClick={() => setButtonColor(prevColor => {
        return prevColor === 'red' ? 'yellow' : 'red'
      })}>Toggle Color</button>

    </ThemeContext.Provider >
  )
}
export default App;
