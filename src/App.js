/* eslint-disable no-eval */
import { useState } from 'react';

function App() {

  //calculator function
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const options = ["/", "*", "+", "-"];

  const updateCalculation = (value) => {
    if (options.includes(value) && (!calc || options.includes(calc.slice(-1)))) {
      return;
    }
    const result = calc + value;
    switch (value) {
      case "=":
        setResult(`${eval(result)}`);
        break;
      case "DEL":
        const extracted = calc.substring(0, calc.length - 1);
        setCalc(extracted);
        setResult(`${eval(extracted)}`);
        break;
      case "CLR":
        setCalc("");
        setResult("");
        break;
      default:
        setCalc(result);
        setResult(`${eval(result)}`);
        break;
    }
  }

  //render buttons
  const getButtons = () => {
    const buttons = ['(', ')', 'DEL', '/']
      .concat(Array(3).fill().map((_, i) => `${i + 7}`)).concat('*')
      .concat(Array(3).fill().map((_, i) => `${i + 4}`)).concat('+')
      .concat(Array(3).fill().map((_, i) => `${i + 1}`)).concat('-')
      .concat('CLR', '0', '.', '=');

    return buttons.map((label, index) => (
      <button key={index} onClick={() => updateCalculation(label)}>{label}</button>)
    );
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="solution">{result ? <span>({result})</span> : ""}</div>
        <div className="display">{calc || "0"}</div>
        <div className="keyboard">{getButtons()}</div>
      </div>
    </div>
  );
}

export default App;
