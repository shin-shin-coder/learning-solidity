import { useState } from 'react';
import { Container, Stack, TextField, Typography, Box } from '@mui/material';

const NewFundraiser = () => {
  const [name, setFundraiserName] = useState('');

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Typography variant="h2">Create a New Fundraiser</Typography>
      <Box variant="form" sx={{ margin: '24px 0' }}>
        <Stack spacing={3}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(e) => setFundraiserName(e.target.value)}
            value={name}
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default NewFundraiser;
