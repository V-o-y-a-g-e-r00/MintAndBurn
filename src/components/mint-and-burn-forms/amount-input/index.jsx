import Box from '@mui/material/Box';
import { useStyles } from './styles';

const AmountInput = () => {
    const classes = useStyles();
    return (
        <Box className='amount-container'>
            <Box className='right-side-container'>
                Balance: 0
            </Box>
            <Box className='input-container'>
                <input type="text" placeholder='Enter'/>
                <Box className='max-amount-container'>
                    Max
                </Box>
            </Box>
            <Box className='right-side-container'>
                Min amount: 0
            </Box>
        </Box>
    )
}
export default AmountInput;