import { EthProvider } from './contexts/EthContext';
import { Greeter } from './components/Greeter';
import './App.css';

function App() {
  return (
    <EthProvider>
      <div id="App">
        <Greeter />
      </div>
    </EthProvider>
  );
}

export default App;
