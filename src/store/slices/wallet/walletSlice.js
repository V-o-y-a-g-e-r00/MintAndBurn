import {createSlice} from "@reduxjs/toolkit";
import {progress} from "../../../data/constants/constants";
import {addAndGetCollection, getCollection, removeAndGetCollection} from "./walletActions";

/*
    walletObj = {
        address: string,
        extension: string
    }
*/


const WalletSlice = createSlice({
    name: "wallets",
    initialState: {
        currentWallet: null,
        isCollectionLocked: false,
        ethereumWallets: [],
        cardanoWallets: [],
        walletsCount: 0
    },
    reducers: {
        addEthereumWallet: (state, action) => {
            const currentState = state.ethereumWallets;
            const newState = [action.payload, ...currentState];
            state.ethereumWallets = newState;
            state.currentWallet = {...action.payload, blockchain: "Ethereum"};
            state.walletsCount++;
        },
        addCardanoWallet: (state, action) => {
            const currentState = state.cardanoWallets;
            const newState = [action.payload, ...currentState];
            state.cardanoWallets = newState;
            state.currentWallet = {...action.payload, blockchain: "Cardano"};
            state.walletsCount++;
        },
        removeEthereumWallet: (state, action) => {
            const currentState = state.ethereumWallets;
            const addressOfWalletToRemove = action.payload.address;
            const newState = currentState.filter(wallet => wallet.address !== addressOfWalletToRemove);
            state.ethereumWallets = newState;
            state.walletsCount--;
        },
        removeAllEthereumWallets: (state) => {
            const ethereumWalletsLength = state.ethereumWallets.length;
            state.ethereumWallets = [];
            state.walletsCount -= ethereumWalletsLength;
        },
        removeCardanoWallet: (state, action) => {
            const currentState = state.cardanoWallets;
            const addressOfWalletToRemove = action.payload.address;
            const newState = currentState.filter(wallet => wallet.address !== addressOfWalletToRemove);
            state.cardanoWallets = newState;
            state.walletsCount--;
        },
        removeAllCardanoWallets: (state) => {
            const cardanoWalletsLength = state.cardanoWallets.length;
            state.cardanoWallets = [];
            state.walletsCount -= cardanoWalletsLength;
        },
        setCurrentAddress: (state, action) => {
            console.log("setCurrentAddress", action.payload);
            state.currentWallet = action.payload;
            console.log("state.currentWallet", state.currentWallet);
        },
        setCurrentAddressAsNull: (state) => {
            state.currentWallet = null;
        },
        clearAllWallets: (state) => {
            state.currentWallet = null;
            state.isCollectionLocked = false;
            state.ethereumWallets = [];
            state.cardanoWallets = [];
            state.walletsCount = 0
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCollection.pending, (state) => {
            console.log("wallet/getCollection/pending");
            state.loading = progress.PROCESSING;
        });
        builder.addCase(getCollection.fulfilled, (state, action) => {
            console.log("wallet/getCollection/fulfilled");
            const data = action.payload.data;
            console.log("wallet/getCollection/fulfilled data", data);
            console.log("state before", state);
            console.log("state.currentWallet", state.currentWallet);
            state.ethereumWallets = data?.ethereum_wallets.reduce((acc, curr) => {
                acc.push(curr);
                return acc;
            }, []);
            console.log("state.ethereumWallets", state.ethereumWallets);
            state.cardanoWallets = data?.cardano_wallets.reduce((acc, curr) => {
                acc.push(curr);
                return acc;
            }, []);
            console.log("state.cardanoWallets", state.cardanoWallets);
            state.isCollectionLocked = data?.is_locked;
            console.log("state.isCollectionLocked", state.isCollectionLocked);
            state.walletsCount = state.ethereumWallets?.length + state.cardanoWallets?.length;
            console.log("state.walletsCount", state.walletsCount);
            state.loading = progress.IDLE;
            console.log("state.currentWallet", state.currentWallet);

            console.log("state after", state);
            console.log("state wallets updating ends");
        });
        //TODO
        builder.addCase(getCollection.rejected, (state) => {
            console.log("wallet/getCollection/rejected");
            state.loading = progress.IDLE;
        });
        builder.addCase(addAndGetCollection.pending, (state) => {
            console.log("wallet/addAndGetCollection/pending");
            state.loading = progress.PROCESSING;
        });
        builder.addCase(addAndGetCollection.fulfilled, (state, action) => {
            console.log("wallet/addAndGetCollection/fulfilled");
            console.log("wallet/getCollection/fulfilled");
            const data = action.payload.data;
            console.log("wallet/getCollection/fulfilled data", data);
            console.log("state before", state);
            console.log("state.currentWallet", state.currentWallet);
            state.ethereumWallets = data?.ethereum_wallets.reduce((acc, curr) => {
                acc.push(curr);
                return acc;
            }, []);
            console.log("state.ethereumWallets", state.ethereumWallets);
            state.cardanoWallets = data?.cardano_wallets.reduce((acc, curr) => {
                acc.push(curr);
                return acc;
            }, []);
            console.log("state.cardanoWallets", state.cardanoWallets);
            state.isCollectionLocked = data?.is_locked;
            console.log("state.isCollectionLocked", state.isCollectionLocked);
            state.walletsCount = state.ethereumWallets?.length + state.cardanoWallets?.length;
            console.log("state.walletsCount", state.walletsCount);
            state.loading = progress.IDLE;
            console.log("state.currentWallet", state.currentWallet);

            console.log("state after", state);
            console.log("state wallets updating ends");
            state.loading = progress.IDLE;
        });
        //TODO
        builder.addCase(addAndGetCollection.rejected, (state) => {
            console.log("wallet/addAndGetCollection/rejected");
            state.loading = progress.IDLE;
        });
        builder.addCase(removeAndGetCollection.pending, (state) => {
            console.log("wallet/removeAndGetCollection/pending");
            state.loading = progress.PROCESSING;
        });
        builder.addCase(removeAndGetCollection.fulfilled, (state, action) => {
            console.log("wallet/removeAndGetCollection/fulfilled");
            console.log("wallet/getCollection/fulfilled");
            const data = action.payload.data;
            console.log("wallet/getCollection/fulfilled data", data);
            console.log("state before", state);
            console.log("state.currentWallet", state.currentWallet);
            state.ethereumWallets = data?.ethereum_wallets.reduce((acc, curr) => {
                acc.push(curr);
                return acc;
            }, []);
            console.log("state.ethereumWallets", state.ethereumWallets);
            state.cardanoWallets = data?.cardano_wallets.reduce((acc, curr) => {
                acc.push(curr);
                return acc;
            }, []);
            console.log("state.cardanoWallets", state.cardanoWallets);
            state.isCollectionLocked = data?.is_locked;
            console.log("state.isCollectionLocked", state.isCollectionLocked);
            state.walletsCount = state.ethereumWallets?.length + state.cardanoWallets?.length;
            console.log("state.walletsCount", state.walletsCount);
            state.loading = progress.IDLE;
            console.log("state.currentWallet", state.currentWallet);

            console.log("state after", state);
            console.log("state wallets updating ends");
            state.loading = progress.IDLE;
        });
        //TODO
        builder.addCase(removeAndGetCollection.rejected, (state) => {
            console.log("wallet/removeAndGetCollection/rejected");
            state.loading = progress.IDLE;
        });
    },
});

export const {
    addEthereumWallet,
    addCardanoWallet,
    removeCardanoWallet,
    removeEthereumWallet,
    setCurrentAddress,
    removeAllEthereumWallets,
    removeAllCardanoWallets,
    setCurrentAddressAsNull,
    clearAllWallets
} = WalletSlice.actions;
export default WalletSlice;
