import { EthProvider } from './contexts/EthContext';
import { Sample } from './components/Sample';
import './App.css';

function App() {
  return (
    <EthProvider>
      <div id="App">
        <Sample />
      </div>
    </EthProvider>
  );
}

export default App;
