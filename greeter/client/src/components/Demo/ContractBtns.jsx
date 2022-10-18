import { useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';

function ContractBtns({ setValue }) {
  const {
    state: { contract, accounts },
  } = useEth();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const read = async () => {
    const value = await contract.methods.greet().call({ from: accounts[0] });
    setValue(value);
  };

  const write = async (e) => {
    if (e.target.tagName === 'INPUT') {
      return;
    }
    if (inputValue === '') {
      alert('Please enter a value to write.');
      return;
    }
    await contract.methods.setGreeting(inputValue).send({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <button onClick={read}>read()</button>

      <div onClick={write} className="input-btn">
        write(
        <input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />
        )
      </div>
    </div>
  );
}

export default ContractBtns;
