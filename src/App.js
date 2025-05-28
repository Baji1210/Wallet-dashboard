import { BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css';
function App() {
  return (
    <div className='App'>
    <BrowserRouter>
      <Dashboard/>
    </BrowserRouter>
    </div>
  );
}

export default App;
