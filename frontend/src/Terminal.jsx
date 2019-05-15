import React from 'react';
import TestResults from './TestResults';
import './Terminal.css';

export default function Terminal(props) {
  const { result, submit } = props;
  return (
    <div className="terminal-container">
      <div className="terminal-nav">
        <ul>
          <li>OUTPUT</li>
          <li onClick={submit}>SUBMIT</li>
        </ul>
      </div>
      {result ? <TestResults result={result} /> : null}
    </div>
  );
}
