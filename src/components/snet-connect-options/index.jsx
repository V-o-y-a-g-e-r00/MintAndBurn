import { Box, Grid, Avatar, ListItemText } from '@mui/material';
import ExtensionList from './extensions-list';
import { supportedWallets, availableBlockchains } from '../../data/constants/constants';
import style from './style';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {addEthereumWallet, addCardanoWallet} from '../../store/slices/wallet/walletSlice';

const SnetConnectOptions = ({ blockchain, onWalletConnect }) => {
    const BLOCKCHAIN_IDENTIFIER = blockchain.name.toUpperCase();
    const dispatch = useDispatch();
    //const showWalletConnector = onWalletConnect;

    const connectEthereumWallet = () => {
        dispatch(addEthereumWallet());
    }

    const connectCardanoWallet = () => {
        dispatch(addCardanoWallet());
    }

    const connectWallet = () => {
        try {
            switch (blockchain.name) {
                case availableBlockchains.ETHEREUM: {
                    connectEthereumWallet();
                    onWalletConnect(false);
                    break;
                }
                case availableBlockchains.CARDANO: {
                    connectCardanoWallet();
                    onWalletConnect(false);
                    break;
                }
                default: {}
            }
        } catch (error) {
            console.log('Error while connecting wallet', error);
            throw error;
        }
    }

    return (
        <Box divider id="snet-blockchains-list-box-1" sx={(style.box, blockchain === 'Ethereum' ? style.ethContainer : style.adaContainer)}>
            <Grid container sx={style.grid} minWidth="0">
                <Grid item sm={4} sx={style.flex}>
                    <Avatar alt={blockchain.name} src={blockchain.logo} />
                    <ListItemText primary={blockchain.name} sx={style.blockchain} />
                </Grid>
            </Grid>
            <Box display="flex" alignItems="center" marginTop={4}>
                <ExtensionList connectWallet={connectWallet} supportedExtensions={supportedWallets[BLOCKCHAIN_IDENTIFIER]} />
            </Box>
        </Box>
    );
};

SnetConnectOptions.propTypes = {
    blockchain: propTypes.object.isRequired,
    onWalletConnect: propTypes.func.isRequired
};

export default SnetConnectOptions;