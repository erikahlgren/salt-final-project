import React, { Component } from 'react';
import './TestResults.css';

export default class TestResults extends Component {
  render() {
    const passedTestDescriptions = this.props.result.passed;
    const failedTestMessages = this.props.result.failed;
    const passedCounter =  this.props.result.passedCounter;
    const failedCounter =  this.props.result.failedCounter;
    const PassedTestsCounter = () => {
      return (
        <div className="passed">
          <h3>{`Passed: ${passedCounter} out of ${passedCounter + failedCounter} tests`}</h3>
        </div>
      )
    };

      const ResultSummary = () => {
        return (
        <div className="result-summary-container">
          <p className="test-description">{failedTestMessages[0].fullTitle}</p>
            {passedTestDescriptions.map(el => <p className="test-title-passed"><i class="fas fa-check"></i>{el.description}</p>)}
            {failedTestMessages.map(el => <p className="test-title-failed"><i class="fas fa-times"></i>{el.description}</p>)}
        </div>
        )};
      const FailedTestsDetails = () => {
        return <div className="failed">
                {failedTestMessages.map((el, i) => {
                  return <div key={i}>
                          <p>{i+1} &#41; {el.description}</p>
                          <p className="message">   {el.message}</p> 
                          <p className="expected">   + Expected: <span className="yellow-text">{`${el.expected}`}</span></p>
                          <p className="actual">   - Actual: <span className="yellow-text">{`${el.actual}`}</span></p>
                          <br/>
                        </div>
                })
              };
            
            </div>
      };
      return (
      <div className="result-container">
        <PassedTestsCounter />
        <br />
        {(failedCounter + passedCounter === passedCounter) ? (
        <div>
         <div className="progress-container">
          <div className="progressbar">
          <div className="progress-inner">
          </div>
          </div>
          <h4>100%</h4>

        </div>
        </div>) : null}
        {failedCounter && passedCounter ? <ResultSummary /> : null}
        {failedCounter ? ( <FailedTestsDetails />) : null}
      </div>
    )
  }
}


