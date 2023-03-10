import {availableBlockchains, supportedWallets} from "../data/constants/constants";
import {showErrorNotification} from "../store/slices/notifications/notificationsSlice";
import {ethers} from "ethers";
import {Address} from "@emurgo/cardano-serialization-lib-asmjs";

const ethereum = window?.ethereum;
const provider = ethereum ?
        new ethers.providers.Web3Provider(ethereum) :
        null;

const signEthMessage = async (extension, address, message) => {
    try {
        if(ethereum.isMetaMask) {
            const [account] = await provider.send("eth_requestAccounts", []);
            if(account !== address){
                throw new Error(extension + ': Please switch to the account that marked as CURRENT!');
            }
            const signer = provider.getSigner();
            const signature = await signer.signMessage(message);
            console.log("signed message: ", message);
            console.log("from address: ", address);
            console.log("got signature: ", signature);
            return signature;
        }
        else {
            console.error('Your wallet extension is not MetaMask', ethereum);
        }
    }
    catch(error){
        console.error('Error on sign Eth message: ', error);
        throw error;
    }
}


const getWalletByIdentifier = (chain, identifier) => {
    return supportedWallets[chain].find(wallet => wallet.identifier === identifier);
}
const signCardanoMessage = async (extensionIdentifier, address, message) => {
    const extension = getWalletByIdentifier('CARDANO', extensionIdentifier);
    try {
        const encodedMessage = Buffer.from(message, 'ascii').toString('hex');
        const connectingWallet = extension.identifier.toLowerCase();
        const api = await window.cardano[connectingWallet].enable();
        const currentAddress = await api.getUsedAddresses();
        const currentDecodedAddress = decodeAddress(currentAddress[0]);

        if (address !== currentDecodedAddress) {
            throw new Error(extensionIdentifier + ': Please switch to the account that market as CURRENT!')
        }

        const { signature, key } = await api.signData(currentAddress[0], encodedMessage);
        console.log("signed message: ", message);
        console.log("from address: ", address);
        console.log("got signature: ", signature);
        console.log("got key: ", key);

        return { signature, key }
    } catch (error) {
        console.error('Error on signMessage: ', error);
        throw error;
    }
}

const decodeAddress = (address) => {
    return Address.from_bytes(Buffer.from(address, 'hex')).to_bech32();
}

export const getSign = async (wallet, msg) => {
    console.log("wallet getSign");
    console.log(wallet);
    console.log(wallet.extension);
    console.log(wallet.address);
    console.log(msg);
    if (!wallet.blockchain || !wallet.extension || !wallet.address) {
        showErrorNotification({message: "Wrong wallet for signing"})
    }
    try {
        switch (wallet.blockchain) {
            case availableBlockchains.ETHEREUM: {
                console.log("getSign ETHEREUM");
                const signed = await signEthMessage(wallet.extension, wallet.address, msg);
                console.log("signed");
                console.log(signed);
                return {
                    address: wallet.address,
                    message: msg,
                    signature: signed
                };
            }
            case availableBlockchains.CARDANO: {
                console.log("availableBlockchains.CARDANO");
                const {signature, key} = await signCardanoMessage(wallet.extension, wallet.address, msg);
                console.log("signed");
                console.log(signature, key);
                return {
                    address: wallet.address,
                    message: msg,
                    signature: signature,
                    key: key
                };
            }
            default: {
                showErrorNotification({message: "Can't get signature of current wallet"})
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getSignedWallet = async (wallet, msg) => {
    console.log("getSignedWallet", wallet)
    try {
        const {signature, key} = await getSign(wallet, msg);
        console.log("signature", signature)
        console.log("key", key)
        return {...wallet, signature, key};
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const isWalletActive = async ({blockchain, extension, address}) => {
}
