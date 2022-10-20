import { useState, useCallback, useEffect } from 'react';
import useEth from './contexts/EthContext/useEth';
import { Container, Typography, Box } from '@mui/material';
import FundraiserCard from './FundraiserCard';

const Home = () => {
  const {
    state: { fundraiserFactoryContract, accounts },
  } = useEth();

  const [funds, setFunds] = useState([]);

  const init = useCallback(async () => {
    const response = await fundraiserFactoryContract.methods
      .fundraisers(10, 0)
      .call({ from: accounts[0] });
    setFunds(response);
  }, [fundraiserFactoryContract, accounts]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <Typography variant="h2">Home</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {funds.map((fundraiser, i) => (
          <FundraiserCard key={i} fundraiser={fundraiser} />
        ))}
      </Box>
    </Container>
  );
};

export default Home;
