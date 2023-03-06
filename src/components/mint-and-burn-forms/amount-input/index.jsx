import Box from '@mui/material/Box';
import { useStyles } from './styles';

import { useState, useRef} from 'react';

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
    function setInputValueAndCursor(inputValue, cursorPosition){
        inputRef.current.value = inputValue; 
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
    function obtainIntegersNumberBeforeCursor(){
        let inputString = (inputRef.current.value.substr(0, inputRef.current.selectionStart));
        let integersNumberBeforeCursor = 0;
        for(let i=0; i<inputString.length; i++){
            if(inputString.charAt(i) !== ' '){
                integersNumberBeforeCursor++;
            }
        }
        return integersNumberBeforeCursor;
    }
    function bringCursorBack(integersNumberBeforeCursor, inputString, isThereSpaceBeforeCursor){
        let newCursorPosition = 0;
        let lookedIntegersNumber = 0;
        while(lookedIntegersNumber < integersNumberBeforeCursor){
            if(inputString.charAt(newCursorPosition) !== " "){
                lookedIntegersNumber++;
            }
            newCursorPosition++;
        }
        if(isThereSpaceBeforeCursor &&  inputRef.current.value.charAt(newCursorPosition) === ' '){
            inputRef.current.setSelectionRange(newCursorPosition+1,newCursorPosition+1);
        }else{
            inputRef.current.setSelectionRange(newCursorPosition,newCursorPosition);
        }
    }
    function isThereSpaceBeforeCursorFunc(inputString, selectionStart){
        return (inputString.charAt(selectionStart-1) === ' ') ? true : false;
    }
    function removeAndAddSpaces(inputString){
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
        return inputString;
    }
    function spaceFormatting(inputString, selectionStart){
        const isThereSpaceBeforeCursor = isThereSpaceBeforeCursorFunc(inputString, selectionStart);
        inputString = removeAndAddSpaces(inputString);
        
        setInputValue(inputString);
        const integersNumberBeforeCursor = obtainIntegersNumberBeforeCursor();
        inputRef.current.value = inputString;
        bringCursorBack(integersNumberBeforeCursor, inputString, isThereSpaceBeforeCursor);
    }
    function isStringConsistOfAllowableCharacters(inputString){
        return inputString.match(/^[0-9\.\s]*$/) !== null;
    }
    function characterValidation(){
        const inputString = inputRef.current.value;
        const selectionStart = inputRef.current.selectionStart;
        if(isStringConsistOfAllowableCharacters(inputString)){
            spaceFormatting(inputString, selectionStart);   
        }else {
            const pastedLength = inputString.length - inputValue.length;
            setInputValueAndCursor(inputValue, selectionStart-pastedLength);
        }
    }
    function handleChange(){
        characterValidation();
        //TODO: остальные проверки с выводом ошибок в виде сообщений для пользователя
    }
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