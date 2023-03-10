import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import { showErrorNotification } from '../../../../store/slices/notifications/notificationsSlice';
import { availableBlockchains, blockchains } from '../../../../data/constants/constants'
import {
    clearAllWallets,
    setCurrentAddress
} from '../../../../store/slices/wallet/walletSlice';
import {removeAndGetCollection, removeWalletFromCollection} from "../../../../store/slices/wallet/walletActions";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CopyOrEditIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import style from './style';
import propTypes from 'prop-types';
import {getSignedWallet, isWalletActive} from "../../../../utils/wallet";
import {getWalletsCollection} from "../../../../utils/HTTPrequests";
// import {getWalletsCollection} from "../../../../utils/HTTPrequests";
import { setIsLoading } from '../../../../store/slices/application/appSlice';

const WalletAddressInfo = ({ blockchain, walletObj, isCollectionLocked, extension, onDialogClose }) => {
    const dispatch = useDispatch();
    const wallet = walletObj;
    const walletAddress = walletObj.address;
    const [copyButtonText, setCopyButtonText] = useState('Copy');
    const currentWallet = useSelector(state => state.wallets.currentWallet);
    const walletsCount = useSelector(state => state.wallets.walletsCount);

    const currentStatusContent = {
        CURRENT: 'Current',
        NOTCURRENT: 'Set current'
    };

    const onClickCopy = () => {
        onCopyAddress(walletAddress);
        setCopyButtonText('Copied');
        setTimeout(() => {
            setCopyButtonText('Copy');
        }, 3000);
    };

    const onCopyAddress = (address) => {
        navigator.clipboard.writeText(address);
    };

    const isCardanoBlockchain = () => {
        return blockchain.name === blockchains[1].name;
    }

    const addEllipsisInBetweenString = (str) => {
        if (isCardanoBlockchain()) {
            return `${str.substr(0, 25)}...${str.substr(str.length - 25)}`;
        }
        return str;
    };

    const isAvailableToDisconnectCurrent = () => {
        return walletsCount === 1;
    }

    const onDisconnect = async () => {
        dispatch(setIsLoading(true));
        if (!isAvailableToDisconnectCurrent()) {
            if (isWalletCurrent(wallet)) {
                dispatch(showErrorNotification({ message: "You are not allowed to disconnect CURRENT wallet if there are other wallets. Please, set CURRENT status to another wallet or diconnect any other wallets if you want to disconnect this one."}));
            } else {
                await dispatch(removeAndGetCollection(wallet));
                // isCardanoBlockchain() ? dispatch(removeCardanoWallet(wallet)) : dispatch(removeEthereumWallet(wallet));
            }
        }
        else {
            try {
                const current_wallet = {
                    address: currentWallet.address,
                    signature: currentWallet.signature,
                    key: currentWallet.key,
                    extension: currentWallet.extension
                }
                const remove_wallet = {
                    address: currentWallet.address,
                    // signature: currentWallet.signature,
                    // key: currentWallet.key,
                    // extension: currentWallet.extension
                }
                const removeFromCollectionResponse = (await dispatch(removeWalletFromCollection({current_wallet, remove_wallet}))).payload;
                if (removeFromCollectionResponse.status === 'success') {
                    await dispatch(clearAllWallets());
                }
                else {
                    throw new Error(removeFromCollectionResponse?.error?.message)
                }
            } catch (err) {
                console.log("ERROR", err);
                if (err.code === "ERR_NETWORK") {
                    dispatch(showErrorNotification({
                        message: "Some problems with network. Please try again later."
                    }));
                }
                else {
                    dispatch(showErrorNotification({
                        message: err.message
                    }));
                }
            }

        }
        dispatch(setIsLoading(false));
    }

    const isWalletCurrent = (wallet) => {
        return wallet.address === currentWallet.address;
    }

    const DisconnectWalletButton = () => {
        return !isCollectionLocked ? (
            <Button
                onClick={onDisconnect}
                variant="text"
                sx={[style.disconnectBtn, style.buttonWalletAddress]}
                startIcon={<LogoutIcon />}
            >
                Disconnect
            </Button>
        ) : null;
    }

    const WalletAddressBlock = () => {
        return (
            <Typography variant="caption" color="text.primary" fontSize="16px">
                {addEllipsisInBetweenString(walletAddress)}
            </Typography>
        );
    }

    const CopyAddressButton = () => {
        return (
            <Button
                sx={style.buttonWalletAddress}
                padding="0"
                variant="text"
                onClick={onClickCopy}
                startIcon={<CopyOrEditIcon />}
            >
                {copyButtonText}
            </Button>
        )
    }

    const isExtensionAvailable = (blockchain, wallet) => {
        try {
            switch (blockchain) {
                case availableBlockchains.ETHEREUM: {
                    const ethereumExtension = window?.ethereum?.isMetaMask;
                    if(ethereumExtension) return true;
                    break;
                }
                case availableBlockchains.CARDANO: {
                    const cardanoExtension = window?.cardano[wallet];
                    if(cardanoExtension) return true;
                    break;
                }
                default: {
                    dispatch(showErrorNotification({ message: 'Can not execute an extension check'}));
                }
            }
            return false
        }
        catch (error) {
            return false
        }

    }

    const onclickSetCurrent = async () => {
        if(isWalletCurrent(wallet)) {
            return;
        }
        if (!isExtensionAvailable(blockchain.name, extension.identifier)) {
            dispatch(showErrorNotification({ message: 'Cannot set this address as CURRENT. ' + extension.wallet + ' extension is not found!' }));
            return;
        }
        dispatch(setIsLoading(true));
        try{
            const signedWallet = await getSignedWallet({...wallet, blockchain: blockchain.name}, "action confirmation");
            await dispatch(setCurrentAddress(signedWallet));
        }
        catch(error){
            console.error(error);
            dispatch(showErrorNotification({ message: error?.message }));
        }
        dispatch(setIsLoading(false));
    }

    const SetCurrentAddress = () => {
        const status = isWalletCurrent(wallet) ? currentStatusContent.CURRENT : currentStatusContent.NOTCURRENT;
        return (
            <Button
                sx={[style.buttonWalletAddress, style.currentButton, status === currentStatusContent.CURRENT ? style.currentBold : null]}
                padding="0"
                variant="text"
                onClick={onclickSetCurrent}
            >
                {status}
            </Button>
        )
    }

    return (
        <Box sx={style.flexBox}>
            <Box sx={style.flexNoShrinkBox}>
                <Tooltip title={extension.wallet}>
                    <img alt={extension.wallet} src={extension.logo} />
                </Tooltip>
            </Box>
            <Box sx={style.addressInfo}>
                <Stack direction="row" alignItems="center">
                    <WalletIcon sx={style.icon} color="grey" />
                    <WalletAddressBlock />
                </Stack>
                <Stack direction="row" sx={style.btnsAfterConnectOrAdd}>
                    <CopyAddressButton />
                    <DisconnectWalletButton />
                    <SetCurrentAddress />
                </Stack>
            </Box>
        </Box>
    );
};

WalletAddressInfo.propTypes = {
    onDialogClose: propTypes.func.isRequired,
    blockchain: propTypes.object.isRequired,
    walletObj: propTypes.object.isRequired,
    isCollectionLocked: propTypes.bool.isRequired,
    extension: propTypes.object.isRequired
};

export default WalletAddressInfo;
