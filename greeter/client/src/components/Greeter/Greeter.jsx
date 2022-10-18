import { useState, useCallback, useEffect } from 'react';
import useEth from '../../contexts/EthContext/useEth';

export const Greeter = () => {
  const {
    state: { contract, accounts },
  } = useEth();

  const [greeting, setGreeting] = useState('');

  const handleGreetingChange = (e) => {
    setGreeting(e.target.value);
  };

  const runExample = useCallback(async () => {
    if (contract && accounts) {
      const value = await contract.methods.greet().call({ from: accounts[0] });
      setGreeting(value);
    }
  }, [contract, accounts]);

  const formSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      await contract.methods.setGreeting(greeting).send({ from: accounts[0] });
    },
    [greeting, contract, accounts]
  );

  useEffect(() => {
    runExample();
  }, [runExample]);

  return (
    <div>
      <h1>Greeter</h1>
      {greeting}
      <form onSubmit={formSubmitHandler}>
        <label>
          New Greeting
          <input
            id="greeting"
            name="greeting"
            type="text"
            onChange={handleGreetingChange}
            value={greeting}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
