import { createSlice } from "@reduxjs/toolkit";

/*
    walletObj = {
        address: string,
        extension: string,
        isLocked: bool
    }
*/

const WalletSlice = createSlice({
    name: "wallets",
    initialState: {
        ethereumWallets: [],
        cardanoWallets: [],
        walletsCount: 0
    },
    reducers:  {
        addEthereumWallet: (state, action) => {
            state.walletsCount++;
        }, 
        addCardanoWallet: (state, action) => {
            state.walletsCount++;
        },
        removeEthereumWallet: (state, action) => {
            state.walletsCount--;
        }, 
        removeCardanoWallet: (state, action) => {
            state.walletsCount--;
        }  
    }
});

export const { addEthereumWallet, addCardanoWallet, removeCardanoWallet, removeEthereumWallet } = WalletSlice.actions;
export default WalletSlice;