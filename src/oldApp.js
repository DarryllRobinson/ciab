import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import WorkspaceRoutes from './Utilities/WorkspaceRoutes';

function App() {
  return (
    <Router>
      <WorkspaceRoutes />
    </Router>
  );
}

export default App;
