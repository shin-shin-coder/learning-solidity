import { useState, useCallback } from 'react';
import {
  Container,
  Stack,
  TextField,
  Typography,
  Box,
  Button,
} from '@mui/material';
import useEth from './contexts/EthContext/useEth';

const NewFundraiser = () => {
  const {
    state: { fundraiserFactoryContract, accounts },
  } = useEth();

  const [name, setFundraiserName] = useState('');
  const [url, setFundraiserWebsite] = useState('');
  const [description, setFundraiserDescription] = useState('');
  const [imageUrl, setImage] = useState('');
  const [beneficiary, setAddress] = useState('');
  const [custodian, setCustodian] = useState('');

  const handleSubmit = useCallback(async () => {
    await fundraiserFactoryContract.methods
      .createFundraiser(name, url, imageUrl, description, beneficiary)
      .send({ from: accounts[0] });
  }, [
    fundraiserFactoryContract,
    accounts,
    name,
    url,
    imageUrl,
    description,
    beneficiary,
  ]);

  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <Typography variant="h2">Create a New Fundraiser</Typography>
      <Box variant="form" sx={{ m: '24px 0' }}>
        <Stack spacing={3}>
          <TextField
            label="Fundraiser Name"
            variant="outlined"
            onChange={(e) => setFundraiserName(e.target.value)}
            value={name}
          />
          <TextField
            label="Fundraiser Website"
            variant="outlined"
            onChange={(e) => setFundraiserWebsite(e.target.value)}
            value={url}
          />
          <TextField
            label="Fundraiser Description"
            variant="outlined"
            onChange={(e) => setFundraiserDescription(e.target.value)}
            value={description}
          />
          <TextField
            label="Fundraiser Image"
            variant="outlined"
            onChange={(e) => setImage(e.target.value)}
            value={imageUrl}
          />
          <TextField
            label="Fundraiser Ethereum Address"
            variant="outlined"
            onChange={(e) => setAddress(e.target.value)}
            value={beneficiary}
          />
          <TextField
            label="Fundraiser Custodian"
            variant="outlined"
            onChange={(e) => setCustodian(e.target.value)}
            value={custodian}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default NewFundraiser;
