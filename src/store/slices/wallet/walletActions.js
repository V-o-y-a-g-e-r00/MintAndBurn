import {createAsyncThunk} from "@reduxjs/toolkit";
import {getWalletsCollection, updateWalletsCollection} from "../../../utils/HTTPrequests";
import {showErrorNotification} from "../notifications/notificationsSlice";
import {getSign} from "../../../utils/wallet";
import {setCurrentAddress} from "./walletSlice";

/*
    walletObj = {
        address: string,
        extension: string
    }
*/

export const getCollection = createAsyncThunk(
        'wallet/getCollection',
        async (wallet, {getState, dispatch, rejectWithValue}) => {            
            try {
                console.log("wallet/getCollection");
                console.log("wallet", wallet);
                const {signature, key} = await getSign(wallet, "action confirmation");
                console.log("wallet", wallet);
                console.log("signature", signature);
                console.log("key", key);
                // console.log("state", state);
                const signedWallet = {...wallet, signature, key};
                console.log("signedWallet", signedWallet);
                const response = await getWalletsCollection(signedWallet)
                console.log("response await getWalletsCollection", response);
                if (response.status === 'success') {
                    await dispatch(setCurrentAddress(signedWallet));
                    return response;
                }
                else if (response.status === 'failed') {
                    // this code means that address is not in collection
                    if (response?.error?.code === 1014) {
                        try {
                            const newCollectionResponse = (await dispatch(createNewCollection(signedWallet))).payload;
                            console.log("newCollectionResponse: ", newCollectionResponse);
                            if (newCollectionResponse.status === 'success') {
                                const response = await getWalletsCollection(signedWallet)
                                console.log("getWalletsCollection(address)");
                                console.log(response);
                                if (response.status === 'success') {
                                    await dispatch(setCurrentAddress(signedWallet));
                                    return response;
                                }
                                else {
                                    console.log(response?.error);
                                    dispatch(showErrorNotification({message: response?.error?.message}));
                                    return rejectWithValue(response);
                                }
                            }
                            else {
                                throw new Error(response?.error?.message)
                            }
                        }
                        finally {

                        }
                    }
                    else {
                        console.log(response?.error);
                        dispatch(showErrorNotification({message: response?.error?.message}));
                        return rejectWithValue(response);
                    }
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
                return rejectWithValue(err);
            }
        }
)

export const createNewCollection = createAsyncThunk(
        'wallet/addWalletToCollection',
        async ({address, signature, key, extension}, {dispatch}) => {
            console.log("wallet/addWalletToCollection");
            const new_wallet = {
                address,
                signature,
                key,
                extension
            }
            try {
                const response = await updateWalletsCollection(null, new_wallet, null)
                console.log("response await updateWalletsCollection", response);
                if (response.status === 'success') {
                    return response;
                }
                else {
                    throw new Error(response?.error?.message)
                }
            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
        }
)

export const addWalletToCollection = createAsyncThunk(
        'wallet/addWalletToCollection',
        async ({current_wallet, new_wallet}, {dispatch}) => {
            try {
                console.log("export const addWalletToCollection({current_wallet, new_wallet})", current_wallet, new_wallet);
                const response = await updateWalletsCollection(current_wallet, new_wallet, null)
                console.log(response);
                if (response.status === 'success') {
                    return response;
                }
                else {
                    throw new Error(response?.error?.message)
                }
            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
        }
)
export const removeWalletFromCollection = createAsyncThunk(
        'wallet/removeWalletFromCollection',
        async ({current_wallet, remove_wallet}, {dispatch}) => {
            try {
                console.log("export const removeWalletFromCollection({current_wallet, remove_wallet})", current_wallet, remove_wallet);
                const response = await updateWalletsCollection(current_wallet, null, remove_wallet)
                console.log(response);
                if (response.status === 'success') {
                    return response;
                }
                else {
                    throw new Error(response?.error?.message)
                }
            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
        }
)


export const addAndGetCollection = createAsyncThunk(
        'wallet/addAndGetCollection',
        async (wallet, {getState, dispatch, rejectWithValue}) => {
            console.log("wallet/addAndGetCollection(wallet)", wallet);
            const state = getState();
            try {
                const {signature, key} = await getSign(wallet, "action confirmation");
                console.log("wallet signe. signature: ", signature, "key: ", key)
                const new_wallet = {
                    address: wallet.address,
                    signature,
                    key,
                    extension: wallet.extension
                }
                const current_wallet = {
                    address: state.wallets.currentWallet.address,
                    signature: state.wallets.currentWallet.signature,
                    key: state.wallets.currentWallet.key,
                    extension: state.wallets.currentWallet.extension
                }
                const addToCollectionResponse = (await dispatch(addWalletToCollection({current_wallet, new_wallet}))).payload;
                if (addToCollectionResponse.status === 'success') {
                    await dispatch(setCurrentAddress(new_wallet));
                    const response = await getWalletsCollection(new_wallet)
                    console.log("getWalletsCollection(new_wallet)", response);
                    if (response.status === 'success') {
                        await dispatch(setCurrentAddress(new_wallet));
                        return response;
                    }
                    else {
                        console.log(response?.error);
                        throw new Error(response?.error?.message)
                    }
                }
                else {
                    throw new Error(addToCollectionResponse?.error?.message)
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
                return rejectWithValue(err);
            }
        }
)


export const removeAndGetCollection = createAsyncThunk(
        'wallet/removeAndGetCollection',
        async (wallet, {getState, dispatch, rejectWithValue}) => {
            console.log("removeAndGetCollection(wallet)", wallet);
            const state = getState();
            try {
                const remove_wallet = {
                    address: wallet.address,
                    // signature,
                    // key,
                    // extension: wallet.extension
                }
                const current_wallet = {
                    address: state.wallets.currentWallet.address,
                    signature: state.wallets.currentWallet.signature,
                    key: state.wallets.currentWallet.key,
                    extension: state.wallets.currentWallet.extension
                }
                const removeFromCollectionResponse = (await dispatch(removeWalletFromCollection({current_wallet, remove_wallet}))).payload;
                if (removeFromCollectionResponse.status === 'success') {
                    const response = await getWalletsCollection(current_wallet)
                    console.log("getWalletsCollection(current_wallet)", response);
                    if (response.status === 'success') {
                        return response;
                    }
                    else {
                        console.log(response?.error);
                        throw new Error(response?.error?.message)
                    }
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
                return rejectWithValue(err);
            }
        }
)
