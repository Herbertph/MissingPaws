// App.jsx
import { BrowserRouter } from 'react-router-dom';
import AppContent from './AppContent';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <AppContent />
      </div>
    </BrowserRouter>
  );
}

export default App;