import { Helmet } from 'react-helmet';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import GeneralLayout from '../../layouts/GeneralLayout';
import SnetSnackbar from '../../components/ui/snet-snackbar';
import { useStyles } from './styles';
import ColorCodes from '../../assets/theme/colorCodes';

import MintForm from '../../components/mint-form';

const Voting = () => {
  const [error, setError] = useState({ showError: false, message: '' });
  const [isLoading] = useState(false);
  const closeError = () => {
    setError({ showError: false, message: '' });
  };

  const classes = useStyles();

  return (
    <>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="white" />
      </Backdrop>
      <SnetSnackbar open={error.showError} message={error.message} onClose={closeError} />
      <Helmet>
        <title>SingularityNet Voting</title>
      </Helmet>
      <GeneralLayout>
        {/* <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h3" color={ColorCodes.text}>
            Voting here
          </Typography>
        </Box> */}
        <MintForm/>
      </GeneralLayout>
    </>
  );
};
export default Voting;
