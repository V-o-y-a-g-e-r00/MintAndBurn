import { blockchains } from '../../data/constants/constants'
import SnetDialog from '../snet-dialog';
import SnetTypography from '../snet-typography';
import ConnectOptions from './connect-options';
import propTypes from 'prop-types';

const SnetConnectWallets = ({ isDialogOpen, onDialogClose, onWalletConnect }) => {

  const WalletConnectorByBlockchain = () => {
    return blockchains.map((blockchain) => {
      return (
        <ConnectOptions blockchain={blockchain} key={blockchain.name} onWalletConnect={onWalletConnect}/>
      )
    })
  }
  return (
    <>
      <SnetDialog title="Connect Your Wallets" onDialogClose={onDialogClose} isDialogOpen={isDialogOpen}>
        <WalletConnectorByBlockchain />
        <SnetTypography />
        {/*<SnetButton onClick={onTestClick} name='test' />*/}
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
