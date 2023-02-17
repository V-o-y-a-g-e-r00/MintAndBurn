import { useState } from 'react';
import NavigationBar from './navigationBar';
import SnetConnectWallets from '../snet-connect-wallets';
import SnetDisplayWallets from '../snet-display-wallets';

const SnetNavigation = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWalletConnecting, setIsWalletConnecting] = useState(true);

  const toggleIsModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  const WalletModal = () => {
    return isWalletConnecting ?
      <SnetConnectWallets
        isDialogOpen={isModalVisible}
        onDialogClose={toggleIsModalVisible}
        onWalletConnect={setIsWalletConnecting}
      /> :
      <SnetDisplayWallets
        isDialogOpen={isModalVisible}
        onDialogClose={toggleIsModalVisible}
        onWalletConnect={setIsWalletConnecting}
      />;
  }

  return (
    <>
      <WalletModal />
      <NavigationBar openModal={toggleIsModalVisible} onWalletConnect={setIsWalletConnecting}/>
    </>
  );
};

export default SnetNavigation;
