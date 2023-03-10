import axios from "axios";

export const getProposalsByEventId = async (address, signature, key) => {
    console.log("getProposalsByEventId()");
    const payload = {
        event_id: process.env.REACT_APP_EVENT_ID
    }
    if (address) {
        payload.address = address;
    }
    if (signature) {
        payload.signature = signature;
    }
    if (key) {
        payload.key = key;
    }
    try {
        const {data} = await axios.post(
                process.env.REACT_APP_BASE_API_URI + "/proposals/",
                payload
        );
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getPoolsByEventId = async () => {
    try {
        const payload = {
            event_id: process.env.REACT_APP_EVENT_ID
        };
        const {data} = await axios.post(
                process.env.REACT_APP_BASE_API_URI + "/pools/",
                payload
        );
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const savePoolAnswers = async ({address, message, signature, key}) => {
    try {
        console.log("const savePoolAnswers = async");
        console.log({
            event_id: process.env.REACT_APP_EVENT_ID,
            message: message,
            address: address,
            signature: signature,
        });
        let payload = {
            event_id: process.env.REACT_APP_EVENT_ID,
            message,
            address,
            signature
        }
        if (key) {
            payload["key"] = key;
        }
        const {data} = await axios.post(
                process.env.REACT_APP_BASE_API_URI + "/proposal/save",
                payload
        );
        console.log(data);
        return data;
    }
    finally {

    }
    // catch (e) {
    //     console.log("savePoolAnswers catched error: ", e)
    // }
};

export const getWalletsCollection = async ({address, signature, key}) => {
    console.log(address);
    console.log(signature);
    console.log(key);
    let current_wallet = {};
    if (address) {
        current_wallet.address = address;
    }
    if (signature) {
        current_wallet.signature = signature;
    }
    if (key) {
        current_wallet.key = key;
    }

    console.log(current_wallet);
    try {
        const {data} = await axios.post(
                process.env.REACT_APP_BASE_API_URI + "/wallet/collection",
                {
                    event_id: process.env.REACT_APP_EVENT_ID,
                    current_wallet: current_wallet
                }
        );
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateWalletsCollection = async (currentWallet, newWallet, removeWallet) => {
    console.log(currentWallet);
    console.log(newWallet);
    console.log(removeWallet);
    try {
        console.log("updateWalletsCollection");
        let payload = {
            event_id: process.env.REACT_APP_EVENT_ID,
        }
        if (currentWallet) {
            payload["current_wallet"] = currentWallet
        }
        if (newWallet) {
            payload["new_wallet"] = newWallet;
        }
        if (removeWallet) {
            payload["remove_wallet"] = removeWallet;
        }
        console.log(payload);
        const {data} = await axios.post(
                process.env.REACT_APP_BASE_API_URI + "/wallet/collection/update",
                payload
        );
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
