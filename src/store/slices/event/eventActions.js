import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProposalsByEventId, getPoolsByEventId, savePoolAnswers } from "../../../utils/HTTPrequests";
import {showErrorNotification} from "../notifications/notificationsSlice";

export const getProposals = createAsyncThunk('event/getProposals', async (_,  { getState, dispatch, rejectWithValue }) => {
    const state= getState();
    console.log("event/getProposals");
    console.log("state.wallets.currentWallet", state.wallets?.currentWallet);
    const address = state.wallets?.currentWallet?.address || '';
    try {
        if (!address) {
            return await getProposalsByEventId();
        }
        else {
            const {address, signature, key} = state.wallets?.currentWallet;
            // console.log("address", address);
            // console.log("signature", signature);
            // console.log("key", key);
            const response = await getProposalsByEventId(address, signature, key);
            console.log("response", response);
            if (response.status === 'success') {
                return response;
            }
            else {
                throw new Error(response?.error?.message)
            }
        }
    }
    catch (e) {
        console.log(e);
        dispatch(showErrorNotification({message: e.message}));
        return rejectWithValue(e);
    }
});
export const getPools = createAsyncThunk('event/getPools', async () => {
    return  await getPoolsByEventId();
});
export const savePool = createAsyncThunk('event/savePool', async (payload, {dispatch}) => {
    console.log("export const savePool)");
    console.log(payload);
    try {
        const data = await savePoolAnswers(payload);
        console.log("export const savePool")
        console.log(data)
        return data;
    }
    catch (e) {
        console.log("savePool catched error: ", e)
    }
    // finally {
    //
    // }
});

export const getInitialData = createAsyncThunk('event/getInitialData', async () => {
    const pools = await getPoolsByEventId();
    const proposals = await getProposalsByEventId();
    return {
        pools,
        proposals
    }
});
