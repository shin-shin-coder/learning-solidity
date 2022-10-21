import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

const Receipts = () => {
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <Typography variant="h1">Receipts</Typography>
    </Container>
  );
};

export default Receipts;
