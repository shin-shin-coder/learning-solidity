import useEth from '../contexts/EthContext/useEth';

export const Sample = () => {
  const {
    state: { contract, accounts },
  } = useEth();

  const read = async () => {
    const funds = await contract.methods
      .fundraisers(10, 5)
      .call({ from: accounts[0] });
    console.log(funds);
  };

  return (
    <div className="btns">
      <button onClick={read}>read()</button>
    </div>
  );
};
