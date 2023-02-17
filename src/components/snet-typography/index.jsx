import { Box, Typography } from '@mui/material';
import walletMessages from '../../data/walletMessages/walletMessages';
import { useStyles } from './styles';

const SnetTypography = () => {
    const classes = useStyles();

    const Messages = () => {
        return walletMessages.length ? (
            walletMessages.map((message, index) => {
                return (
                    <li key={index}>
                        <Typography>{index + 1}. {message}</Typography>
                    </li>
                )
            })) : null;
    }

    return (
        <>
            <Box className={classes.snetTypography} >
                <ul className={classes.snetTypography}>
                    <Messages />
                </ul>
            </Box>
        </>
    )
}


export default SnetTypography;