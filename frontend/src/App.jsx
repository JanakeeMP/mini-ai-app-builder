import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RequirementForm from './components/RequirementForm';
import ExtractedInfo from './components/ExtractedInfo';
import MockUI from './components/MockUI';

function App() {
  const [extracted, setExtracted] = useState(null);

  // Reset state to show RequirementForm again
  const handleGoHome = () => {
    setExtracted(null);
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light mb-4">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <span
              className="navbar-brand mb-0 h1"
              style={{
                cursor: 'pointer',
                fontSize: '1.8rem',
                color: '#310dfdff',
                fontWeight: 'bold'
              }}
              onClick={handleGoHome}>Mini AI App Builder</span>
            {extracted && (
              <button className="btn btn-outline-primary" onClick={handleGoHome}>
                Home
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="container">
        {!extracted && <RequirementForm onExtract={(data) => setExtracted(data)} />}
        {extracted && (
          <>
            <ExtractedInfo extracted={extracted} />
            <MockUI extracted={extracted} />
          </>
        )}
      </div>
    </>
  );
}

export default App

