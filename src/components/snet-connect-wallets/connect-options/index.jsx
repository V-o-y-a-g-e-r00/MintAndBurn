import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { supportedWallets, availableBlockchains } from '../../../data/constants/constants';
import {getCollection, addAndGetCollection } from "../../../store/slices/wallet/walletActions";
import { showErrorNotification } from '../../../store/slices/notifications/notificationsSlice';
import { useSelector } from 'react-redux';
import useInjectableEthereumHook from '../../../lib/ethereumWalletHook/useInjectableEthereumHook';
import useInjectableCardanoHook from '../../../lib/cardanoWalletHook/useInjectableCardanoHook';
import SnetBlockchainListHeader from '../../ui/snet-blockchain-list-header';
import ExtensionList from './extensions-list';
import style from './style';
import isNil from 'lodash/isNil';
import propTypes from 'prop-types';
import { setIsLoading } from '../../../store/slices/application/appSlice';
import {getProposals} from "../../../store/slices/event/eventActions";

const ConnectOptions = ({ blockchain, onWalletConnect }) => {
    const ETHEREUM_CHAIN_ID = process.env.REACT_APP_INFURA_NETWORK_ID;
    const CARDANO_CHAIN_ID = process.env.REACT_APP_CARDANO_NETWORK_ID;
    const { connectEthereumWallet, requetEthChainId } = useInjectableEthereumHook();
    const { connectCardanoWallet, requetCardanoChainId } = useInjectableCardanoHook();
    const cardanoAddresses = useSelector(state => state.wallets.cardanoWallets);
    const ethereumAddresses = useSelector(state => state.wallets.ethereumWallets);
    const currentWallet = useSelector(state => state.wallets.currentWallet);
    const walletsCount = useSelector(state => state.wallets.walletsCount);
    // const {cacheData, getCachedData, isDataInCache} = useCacheCore();
    const BLOCKCHAIN_IDENTIFIER = blockchain.name.toUpperCase();
    const dispatch = useDispatch();

    console.log("COMPONENT connect-options");

    const constructWalletObject = (address, extension) => {
        return {
            address: address,
            extension: extension
        }
    }

    const isAddressAvailable = (address) => {
        return !isNil(address);
    }

    const isAddressConnected = (address, addresses) => {
        const matches = addresses.filter(addr => {
            return addr.address === address
        });
        return matches.length > 0;
    }

    const isAtExpectedNetwork = (blockchain, chainID) => {
        switch (blockchain) {
            case availableBlockchains.ETHEREUM: {
                const isAtExpectedEthNetwork = chainID === Number(ETHEREUM_CHAIN_ID);
                return isAtExpectedEthNetwork;
            }
            case availableBlockchains.CARDANO: {
                const isAtExpectedEthNetwork = chainID === Number(CARDANO_CHAIN_ID);
                return isAtExpectedEthNetwork;
            }
            default: {
                showErrorNotification({message: "Cannot validate chainID!"})
            }
        }
    }

    const updateDataOnAddWallet = async (wallet) => {
        console.log("connect-options updateDataOnAddWallet", wallet)
        let isCollectionReceived = false;
        if (!currentWallet && !walletsCount) {
            console.log("connect-options updateDataOnAddWallet wallet", wallet)
            const promiseAnswer = await dispatch(getCollection(wallet));
            console.log("promiseAnswer", promiseAnswer);
            // isCollectionReceived = (await dispatch(getCollection(wallet))).payload;
            isCollectionReceived = promiseAnswer.payload;
            console.log("isCollectionReceived", isCollectionReceived);
            if (isCollectionReceived.status === "success") {
                //TODO exceptions
                await dispatch(getProposals());
            }
            console.log("connect-options updateDataOnAddWallet isCollectionReceived", isCollectionReceived)
        }
        else {
            await dispatch(addAndGetCollection(wallet));
        }
        // console.log('Collection updated');
        // console.log("connect-options updateDataOnAddWallet wallet", currentWallet);
    }

    const connectEthereumWalletIfNotConnected = async (extension) => {
        console.log(extension);
        const address = await connectEthereumWallet(extension);
        if(!isAddressAvailable(address)) {
            dispatch(showErrorNotification({message: extension.wallet + ": extension is not present or it is locked!"}));
            return false;
        }
        if(!isAtExpectedNetwork(availableBlockchains.ETHEREUM, await requetEthChainId(extension))){
            dispatch(showErrorNotification({message: extension.wallet + ": is not in expected network!"}));
            return false;
        }
        if(isAddressConnected(address, ethereumAddresses)){
            dispatch(showErrorNotification({message: extension.wallet + ": You are connecting with the same wallet address! Please, switch accounts!"}));
            return false;
        } else {
            const walletObject = constructWalletObject(address, extension.identifier);
            // console.log("connectEthereumWalletIfNotConnected updateDataOnAddWallet")
            await updateDataOnAddWallet({...walletObject, blockchain: "Ethereum"})
            // await dispatch(addEthereumWallet(walletObject));
            return true;
        }
    }

    const connectCardanoWalletIfNotConnected = async (extension) => {
        console.log(extension);
        const address = await connectCardanoWallet(extension);
        if(!isAddressAvailable(address)) {
            dispatch(showErrorNotification({message: extension.wallet + ": extension is not present or it is locked!"}));
            return false;
        }
        if(!isAtExpectedNetwork(availableBlockchains.CARDANO, await requetCardanoChainId(extension))){
            dispatch(showErrorNotification({message: extension.wallet + ": is not in expected network!"}));
            return false;
        }
        if(isAddressConnected(address, cardanoAddresses)){
            dispatch(showErrorNotification({message: extension.wallet + ": You are connecting with the same wallet address! Please, switch accounts!"}));
            return false
        } else {
            const walletObject = constructWalletObject(address, extension.identifier);
            await updateDataOnAddWallet({...walletObject, blockchain: "Cardano"})
            // dispatch(addCardanoWallet(walletObject));
            return true;
        }
    }

    const connectWallet = async (extension) => {
        try {
            switch (blockchain.name) {
                case availableBlockchains.ETHEREUM: {
                    const isWalletConnectedSuccessfully = await connectEthereumWalletIfNotConnected(extension);
                    if(isWalletConnectedSuccessfully){
                        onWalletConnect(false);
                    }
                    break;
                }
                case availableBlockchains.CARDANO: {
                    const isWalletConnectedSuccessfully = await connectCardanoWalletIfNotConnected(extension);
                    if(isWalletConnectedSuccessfully){
                        onWalletConnect(false);
                    }
                    break;
                }
                default: {
                    showErrorNotification({message: "Cannot connect using this method!"})
                }
            }
            dispatch(setIsLoading(false));
        } catch (error) {
            console.log('Error while connecting wallet', error);
            throw error;
        }
    }

    return (
        <Box sx={(style.box, style.customBox)}>
            <SnetBlockchainListHeader blockchain={blockchain} />
            <Box display="flex" alignItems="center" marginTop={4} marginBottom={4}>
                <ExtensionList connectWallet={connectWallet} supportedExtensions={supportedWallets[BLOCKCHAIN_IDENTIFIER]} />
            </Box>
        </Box>
    );
};

ConnectOptions.propTypes = {
    blockchain: propTypes.object.isRequired,
    onWalletConnect: propTypes.func.isRequired
};

export default ConnectOptions;
