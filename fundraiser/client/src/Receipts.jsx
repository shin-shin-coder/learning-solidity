import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

const Receipts = () => {
  const location = useLocation();
  const [state, setState] = useState();

  useEffect(() => {
    const { donation, date, fund } = location.state;
    setState({
      donation,
      fundName: fund,
      date: new Date(parseInt(date * 1000)),
    });
  }, [location]);

  if (!state) {
    return null;
  }

  const { donation, date, fundName } = state;

  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Thank you for your donation to {fundName}
      </Typography>
      <div>
        <Typography variant="body1" component="p" color="text.primary">
          Date of Donation: {date.toString()}
        </Typography>
        <Typography variant="body1" component="p" color="text.primary">
          Donation Value: ${donation}
        </Typography>
      </div>
    </Container>
  );
};

export default Receipts;
