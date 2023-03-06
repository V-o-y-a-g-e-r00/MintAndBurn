import Box from '@mui/material/Box';
import { useStyles } from './styles';

import { useState, useRef} from 'react';
import { inputErrors } from '../../../data/constants/constants';

const AmountInput = ({variant}) => {
    const classEnum = {
        INVALID : 'invalid',
    };
    const [stateInputValue, setStateInputValue] = useState('');
    
    


    const [isInputValid, setIsInputValid] = useState(true);
    const [inputWarningsList, setInputWarningsList] = useState([]);
    const [inputErrorsList, setInputErrorsList] = useState([]);

    const warnings = inputErrors.warnings;
    const errors = inputErrors.errors;
    
    const classes = useStyles();

    const inputRef = useRef(null);

    function invalidClass(isInputValid){
        if(!isInputValid){
            return classEnum.INVALID;
        }
    }
    function setInputValueAndCursor(inputValue, cursorPosition){
        setStateInputValue(inputValue);
        inputRef.current.value = inputValue;
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
    function obtainIntegersNumberBeforeCursor(inputString, selectionStart){
        inputString = (inputString.substr(0, selectionStart));
        let integersNumberBeforeCursor = 0;
        for(let i=0; i<inputString.length; i++){
            if(inputString.charAt(i) !== ' '){
                integersNumberBeforeCursor++;
            }
        }
        return integersNumberBeforeCursor;
    }
    function obtainCursorPositionAfterSpaceFormatting(integersNumberBeforeCursor, inputString, isThereSpaceBeforeCursor){
        let newCursorPosition = 0;
        let lookedIntegersNumber = 0;
        while(lookedIntegersNumber < integersNumberBeforeCursor){
            if(inputString.charAt(newCursorPosition) !== " "){
                lookedIntegersNumber++;
            }
            newCursorPosition++;
        }
        if(isThereSpaceBeforeCursor && inputString.charAt(newCursorPosition) === ' '){
            newCursorPosition++;
        }
        return newCursorPosition;
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
        const integersNumberBeforeCursor = obtainIntegersNumberBeforeCursor(inputString, selectionStart);
        inputString = removeAndAddSpaces(inputString);
        const cursorPosition = obtainCursorPositionAfterSpaceFormatting(integersNumberBeforeCursor, inputString, isThereSpaceBeforeCursor);
        setInputValueAndCursor(inputString, cursorPosition);
    }
    function isStringConsistOfAllowableCharacters(inputString){
        return inputString.match(/^[0-9\.\s]*$/) !== null;
    }
    function addWarningToList(warning){
        if(!inputWarningsList.includes(warning)){
            setInputWarningsList([...inputWarningsList, warning]);
        }
    }
    function removeWarningFromList(warning){
        const indexOfWarning = inputWarningsList.indexOf(warning);
        if(indexOfWarning > -1){
            setInputWarningsList([...inputWarningsList.slice(0, indexOfWarning), ...inputWarningsList.slice(indexOfWarning+1)]);
        }
    }
    function onlyOneDotCheck(inputString){
        if(inputString.match(/^.*\..*\..*$/) === null){
            removeWarningFromList(warnings.triedInputMoreThenOneDot);
            return true;
        }else{
            addWarningToList(warnings.triedInputMoreThenOneDot);
            return false;
        }
    }
    function inputBlockingChecks(inputString){
        let temp = onlyOneDotCheck(inputString) && true ;
        console.log("inputWarningsList=" + inputWarningsList);
        //return (onlyOneDotCheck(inputString) && true );
        return true;
    }
    function inputBlockingChecksAndFormatting(){
        const inputString = inputRef.current.value;
        const selectionStart = inputRef.current.selectionStart;
        if(isStringConsistOfAllowableCharacters(inputString) && inputBlockingChecks(inputString)){
            spaceFormatting(inputString, selectionStart);   
        }else {
            const pastedLength = inputString.length - stateInputValue.length;
            setInputValueAndCursor(stateInputValue, selectionStart-pastedLength);
        }
    }
    function handleChange(){
        inputBlockingChecksAndFormatting();
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
            <Box>
            {inputWarningsList.map(item => item)}
            </Box>
        </Box>
    )
}
export default AmountInput;