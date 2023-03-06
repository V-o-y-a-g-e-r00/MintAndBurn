import Box from '@mui/material/Box';
import { useStyles } from './styles';

import { useState, useEffect, useRef} from 'react';



const AmountInput = ({variant}) => {
    const classEnum = {
        INVALID : 'invalid',
    };

    const [isInputValid, setIsInputValid] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const classes = useStyles();

    const inputRef = useRef(null);

    function invalidClass(isInputValid){
        if(!isInputValid){
            return classEnum.INVALID;
        }
    }
    function obtainIntegersNumberBeforeCursor(){
        let inputString = (inputRef.current.value.substr(0, inputRef.current.selectionStart));
        let integersNumberBeforeCursor = 0;
        for(let i=0; i<inputString.length; i++){
            if(inputString.charAt(i) !== ' '){
                integersNumberBeforeCursor++;
            }
        }
        console.log('integersNumberBeforeCursor=' + integersNumberBeforeCursor);
        return integersNumberBeforeCursor;
    }
    function bringCursorBack(integersNumberBeforeCursor, inputString, isThereSpaceBeforeCursor){
        let newCursorPosition = 0;
        let lookedIntegersNumber = 0;
        while(lookedIntegersNumber < integersNumberBeforeCursor){
            console.log("lookedIntegersNumber=" + lookedIntegersNumber + " integersNumberBeforeCursor=" + integersNumberBeforeCursor);
            if(inputString.charAt(newCursorPosition) !== " "){
                lookedIntegersNumber++;
            }
            newCursorPosition++;
            console.log("bringCursorBack");
        }
        if(isThereSpaceBeforeCursor &&  inputRef.current.value.charAt(newCursorPosition) === ' '){
            inputRef.current.setSelectionRange(newCursorPosition+1,newCursorPosition+1);
        }else{
            inputRef.current.setSelectionRange(newCursorPosition,newCursorPosition);
        }
    }
    function spaceFormatting(inputString){
        let isThereSpaceBeforeCursor = false;
        if(inputRef.current.value.charAt(inputRef.current.selectionStart-1) === ' '){
            isThereSpaceBeforeCursor = true;
        }  
        inputString = inputString.split(/\s+/).join('');
        const firstDotPosition = inputString.indexOf('.');
        let integralPartLength;
        if(firstDotPosition !== -1){
            integralPartLength = firstDotPosition;
        }else{
            integralPartLength = inputString.length;
        }
        let currentPosition = integralPartLength % 3;
        if(currentPosition < integralPartLength  && currentPosition>0){
            inputString = inputString.slice(0, currentPosition) + " " + inputString.slice(currentPosition);
            currentPosition += 4;
            integralPartLength +=1;
        }else{
            currentPosition += 3;
        }
        while(currentPosition < integralPartLength){
            inputString = inputString.slice(0, currentPosition) + " " + inputString.slice(currentPosition);
            currentPosition += 4;
            integralPartLength +=1;
        }
        console.log("inputString=" + inputString);

        setInputValue(inputString);
        const integersNumberBeforeCursor = obtainIntegersNumberBeforeCursor();
        console.log("integersNumberBeforeCursor=" + integersNumberBeforeCursor);
        inputRef.current.value = inputString;
        bringCursorBack(integersNumberBeforeCursor, inputString, isThereSpaceBeforeCursor);
    }
    function characterValidation(event){
        // const inputString = event.target.value;
        const inputString = inputRef.current.value;
        if(inputString.match(/^[0-9\.\s]*$/) !== null){
            spaceFormatting(inputString);   
        }else {
            const oldSelectionStart = inputRef.current.selectionStart;
            console.log("oldSelectionStart=" + oldSelectionStart);
            const pastedLength = inputString.length - inputValue.length;
            inputRef.current.value = inputValue; 
            inputRef.current.setSelectionRange(oldSelectionStart-pastedLength,oldSelectionStart-pastedLength);
        }
    }
    function handleChange(event){
        characterValidation(event);
    }
    // useEffect(() => {
    //     // inputRef.classList.add("test");
    //     //inputRef.current.setSelectionRange(1,1);
    // });
    return (
        <Box className={[classes.AmountContainer, `variant-${variant}`]}>
            <Box className='right-side-container'>
                Balance: 0 
            </Box>
            <Box className={['input-container', invalidClass(isInputValid)]}>
                <input type="text" placeholder='Enter' ref={inputRef} onChange={handleChange}/>
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