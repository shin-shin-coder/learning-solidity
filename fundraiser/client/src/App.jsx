import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { EthProvider } from './contexts/EthContext';
import Home from './Home';
import NewFundraiser from './NewFundraiser';
import Receipts from './Receipts';
import './App.css';

function App() {
  return (
    <EthProvider>
      <BrowserRouter>
        <div>
          <AppBar position="static" color="inherit">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </Typography>
              <NavLink to="/new" className="nav-link">
                New
              </NavLink>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/new" exact element={<NewFundraiser />} />
            <Route path="/receipts" exact element={<Receipts />} />
          </Routes>
        </div>
      </BrowserRouter>
    </EthProvider>
  );
}

export default App;
