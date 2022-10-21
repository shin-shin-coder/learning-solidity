import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cc from 'cryptocompare';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  Input,
  InputAdornment,
  FormHelperText,
  Box,
} from '@mui/material';
import useEth from './contexts/EthContext/useEth';
import { useMemo } from 'react';

const FundraiserCard = ({ fundraiser }) => {
  const {
    state: { web3, fundraiserArtifact, accounts },
  } = useEth();

  const [contract, setContract] = useState();

  const [state, setState] = useState({
    fundName: '',
    description: '',
    totalDonations: 0,
    imageURL: '',
    url: '',
  });

  const [exchangeRate, setExchangeRate] = useState(null);

  const [userDonations, setUserDonations] = useState(null);

  const donationList = useMemo(() => {
    if (!userDonations) {
      return null;
    }

    const totalDonations = userDonations.values.length;
    const result = [];
    for (let i = 0; i < totalDonations; i++) {
      const ethAmount = web3.utils.fromWei(userDonations.values[i]);
      const userDonation = exchangeRate * ethAmount;

      const donationDate = userDonations.dates[i];
      result.push({
        donationAmount: userDonation.toFixed(2),
        date: donationDate,
      });
    }
    return result;
  }, [web3, exchangeRate, userDonations]);

  const [isOwner, setIsOwner] = useState(false);

  const withdrawalFunds = useCallback(async () => {
    await contract.methods.withdraw().send({ from: accounts[0] });
    window.alert('Funds Withdrawn!');
    setOpen(false);
  }, [contract, accounts]);

  const init = useCallback(
    async (fund) => {
      try {
        const { abi } = fundraiserArtifact;
        const instance = new web3.eth.Contract(abi, fund);
        setContract(instance);

        const exRate = await cc.price('ETH', ['USD']);
        setExchangeRate(exRate.USD);

        const fundName = await instance.methods.name().call();
        const description = await instance.methods.description().call();
        const imageURL = await instance.methods.imageURL().call();
        const url = await instance.methods.url().call();

        const totalDonations = await instance.methods.totalDonations().call();
        const eth = web3.utils.fromWei(totalDonations, 'ether');
        const dollarDonationAmount = exRate.USD * eth;

        setState({
          fundName,
          description,
          imageURL,
          url,
          totalDonations: dollarDonationAmount,
        });

        const userDonations = await instance.methods
          .myDonations()
          .call({ from: accounts[0] });
        setUserDonations(userDonations);

        const user = accounts[0];
        const owner = await instance.methods.owner().call();
        if (owner === user) {
          setIsOwner(true);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [web3, fundraiserArtifact, accounts]
  );

  const [open, setOpen] = useState(false);

  const [donateAmount, setDonateAmount] = useState(0);

  const ethAmount = useMemo(
    () => donateAmount / exchangeRate || 0,
    [donateAmount, exchangeRate]
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const submitFunds = useCallback(async () => {
    const ethTotal = donateAmount / exchangeRate;
    const donation = web3.utils.toWei(ethTotal.toString());
    await contract.methods.donate().send({
      from: accounts[0],
      value: donation,
      gas: 150000,
    });
    handleClose();
  }, [web3, donateAmount, contract, accounts, exchangeRate, handleClose]);

  useEffect(() => {
    init(fundraiser);
  }, [init, fundraiser]);

  const { fundName, description, imageURL, totalDonations } = state;

  return (
    <div>
      <Card sx={{ width: 345, margin: '0 16px 16px 0' }}>
        <CardMedia
          component="img"
          alt="Fundraiser Image"
          height="140"
          image={imageURL}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {fundName}
          </Typography>
          <Typography variant="body2" component="p" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" component="p" color="text.secondary">
            Total Donations: ${totalDonations}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={handleOpen}>
            View More
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Donate to {fundName}</DialogTitle>
        <DialogContent>
          <img src={imageURL} width="200px" height="130px" alt="Fundraiser" />
          <DialogContentText>{description}</DialogContentText>
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <Input
              placeholder="0.00"
              type="number"
              aria-label="Donate Amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              value={donateAmount}
              onChange={(e) => setDonateAmount(e.target.value)}
            />
            <FormHelperText sx={{ ml: 0 }}>Eth: {ethAmount}</FormHelperText>
          </FormControl>
          <Button onClick={submitFunds} variant="contained" color="primary">
            Donate
          </Button>
          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography gutterBottom variant="h6" component="h6">
              My Donations
            </Typography>
            {donationList &&
              donationList.map((donation, i) => {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 1,
                      mb: 2,
                    }}
                    key={i}
                  >
                    <Typography
                      variant="body1"
                      component="p"
                      color="text.secondary"
                    >
                      ${donation.donationAmount}
                    </Typography>
                    <Button
                      component={Link}
                      to="/receipts"
                      state={{
                        fund: fundName,
                        donation: donation.donationAmount,
                        date: donation.date,
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Request Receipt
                    </Button>
                  </Box>
                );
              })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {isOwner && (
            <Button
              onClick={withdrawalFunds}
              color="primary"
              variant="contained"
            >
              Withdrawal
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FundraiserCard;
