import { useState } from 'react';
import propTypes from 'prop-types';
import SnetButton from '../ui/snet-button';
import SnetSnackbar from '../ui/snet-snackbar';
import SnetDialog from '../snet-dialog';

const SnetDisplayWallets = ({ isDialogOpen, onDialogClose, onWalletConnect }) => {
    const [error, setError] = useState({ showError: false, message: '' });
    const closeError = () => {
        setError({ showError: false, message: '' });
    };

    return (
        <>
            <SnetSnackbar open={error.showError} message={error.message} onClose={closeError} />
            <SnetDialog title="Connected Wallets" onDialogClose={onDialogClose} isDialogOpen={isDialogOpen}>
                <h2>
                    Connected wallets will be displayed here
                </h2>
                <SnetButton onClick={onWalletConnect} name='Connect more' />
            </SnetDialog>
        </>
    )
}

SnetDisplayWallets.propTypes = {
    isDialogOpen: propTypes.bool.isRequired,
    onDialogClose: propTypes.func.isRequired,
    onWalletConnect: propTypes.func.isRequired
};


export default SnetDisplayWallets;