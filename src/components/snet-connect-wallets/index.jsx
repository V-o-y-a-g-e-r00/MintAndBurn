import { useState } from 'react';
import SnetDialog from '../snet-dialog';
import SnetSnackbar from '../ui/snet-snackbar';
import SnetTypography from '../snet-typography';
import SnetConnectOptions from '../snet-connect-options';
import { blockchains } from '../../data/constants/constants'
import propTypes from 'prop-types';

const SnetConnectWallets = ({ isDialogOpen, onDialogClose, onWalletConnect }) => {

  const [error, setError] = useState({ showError: false, message: '' });
  const closeError = () => {
    setError({ showError: false, message: '' });
  };

  const WalletConnectorByBlockchain = () => {
    return blockchains.map((blockchain) => {
      return (
        <SnetConnectOptions blockchain={blockchain} key={blockchain.name} onWalletConnect={onWalletConnect}/>
      )
    })
  }

  return (
    <>
      <SnetSnackbar open={error.showError} message={error.message} onClose={closeError} />
      <SnetDialog title="Connect Your Wallets" onDialogClose={onDialogClose} isDialogOpen={isDialogOpen}>
        <WalletConnectorByBlockchain />
        <SnetTypography />
      </SnetDialog>
    </>
  );
};

SnetConnectWallets.propTypes = {
  isDialogOpen: propTypes.bool.isRequired,
  onDialogClose: propTypes.func.isRequired,
  onWalletConnect: propTypes.func.isRequired
};

export default SnetConnectWallets;
