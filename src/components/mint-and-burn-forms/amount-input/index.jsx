import Box from '@mui/material/Box';
import { useStyles } from './styles';

import { useState } from 'react';

const AmountInput = ({variant}) => {
    const [isInputValid, setIsInputValid] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const classes = useStyles();
    function invalidClass(isInputValid){
        if(!isInputValid){
            return 'invalid';
        }
    }
    function spaceFormatting(inputString){
        
        setInputValue(inputString);
    }
    function characterValidation(event){
        const inputString = event.target.value;
        if(inputString.match(/^[0-9\.\s]*$/) !== null){
            console.log("characterValidation: true");
            spaceFormatting(inputString);
        }else {
            console.log("characterValidation: false");
            const oldSelectionStart = event.target.selectionStart;
            console.log("oldSelectionStart=" + oldSelectionStart);

            const pastedLength = inputString.length - inputValue.length;
            console.log("inputString.length=" + inputString.length);
            console.log("pastedLength=" + pastedLength);
            
            
            event.target.value = inputValue;
            event.target.setSelectionRange(oldSelectionStart-pastedLength,oldSelectionStart-pastedLength);
            console.log("event.target.selectionStart=" + event.target.selectionStart);
        }
    }
    function handleChange(event){
        characterValidation(event);
    }
    return (
        
        // <Box className={`classes. variant-${variant}`}>
        <Box className={[classes.AmountContainer, `variant-${variant}`]}>
            <Box className='right-side-container'>
                Balance: 0 
            </Box>
            <Box className={['input-container', invalidClass(isInputValid)]}>
                <input type="text" placeholder='Enter' onChange={handleChange}/>
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