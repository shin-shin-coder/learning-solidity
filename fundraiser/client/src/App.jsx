import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import { EthProvider } from './contexts/EthContext';
import Home from './Home';
import NewFundraiser from './NewFundraiser';
import './App.css';

function App() {
  return (
    <EthProvider>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Homve</NavLink>
              </li>
              <li>
                <NavLink to="/new">New</NavLink>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/new" exact element={<NewFundraiser />} />
          </Routes>
        </div>
      </BrowserRouter>
    </EthProvider>
  );
}

export default App;
