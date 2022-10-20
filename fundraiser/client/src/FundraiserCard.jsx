import { useCallback, useEffect, useState } from 'react';
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
} from '@mui/material';
import useEth from './contexts/EthContext/useEth';

const FundraiserCard = ({ fundraiser }) => {
  const [state, setState] = useState({
    fundName: '',
    description: '',
    totalDonations: 0,
    imageURL: '',
    url: '',
  });

  const {
    state: { web3, fundraiserArtifact },
  } = useEth();

  const init = useCallback(
    async (fund) => {
      try {
        const { abi } = fundraiserArtifact;
        const instance = new web3.eth.Contract(abi, fund);

        const fundName = await instance.methods.name().call();
        const description = await instance.methods.description().call();
        const totalDonations = await instance.methods.totalDonations().call();
        const imageURL = await instance.methods.imageURL().call();
        const url = await instance.methods.url().call();

        setState({
          fundName,
          description,
          totalDonations,
          imageURL,
          url,
        });
      } catch (err) {
        console.error(err);
      }
    },
    [web3, fundraiserArtifact]
  );

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    init(fundraiser);
  }, [init, fundraiser]);

  const { fundName, description, imageURL } = state;

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
          <DialogContentText>
            <img src={imageURL} width="200px" height="130px" alt="Fundraiser" />
            <p>{description}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FundraiserCard;
