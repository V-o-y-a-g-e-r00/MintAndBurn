import Box from '@mui/material/Box';
import { useStyles } from './styles';

import { useState, useRef} from 'react';
import { inputErrors, maxCharactersInIntegerPartOfInput, maxCharactersInFractionalPartOfInput } from '../../../data/constants/constants';

const AmountInput = ({variant, isInputValidCallBack}) => {
    const classEnum = {
        INVALID : 'invalid',
    };
    const [stateInputValue, setStateInputValue] = useState('');

    const [isInputValid, setIsInputValid] = useState(true);

    const warnings = inputErrors.warnings;
    const [inputWarningsList, setInputWarningsList] = useState([]);
    let draftInputWarningsList;

    const errors = inputErrors.errors;
    const [inputErrorsList, setInputErrorsList] = useState([]);
    let draftInputErrorsList;
    
    const classes = useStyles();

    const inputRef = useRef(null);

    function setIsInputValidWithCallBack(isInputValid){
        setIsInputValid(isInputValid);
        isInputValidCallBack(isInputValid);
    }
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
    function draftInputWarningsListReset(){
        draftInputWarningsList = [];
    }
    function warningListDraftToState(){
        setInputWarningsList([...draftInputWarningsList]);
    }
    function addWarningToList(warning){
        if(!draftInputWarningsList.includes(warning)){
            draftInputWarningsList.push(warning);
        }
    }

    function draftInputErrorsListReset(){
        draftInputErrorsList = [];
    }
    function errorsListDraftToState(){
        setInputErrorsList([...draftInputErrorsList]);
    }
    function addErrorToList(error){
        if(!draftInputErrorsList.includes(error)){
            draftInputErrorsList.push(error);
        }
    }



    function onlyOneDotCheck(inputString){
        if(inputString.match(/^.*\..*\..*$/) === null){
            return true;
        }else{
            addWarningToList(warnings.triedInputMoreThenOneDot);
            return false;
        }
    }
    function maxNumberOfIntegerAndFractionalPartsBlockingCheck(inputString){
        const noSpacesString =  inputString.split(/\s+/).join('');
        const noSpacesStateInputString = stateInputValue.split(/\s+/).join('');
        let integerPart;
        let fractionalPart;
        let result = true;
        [integerPart, fractionalPart] = noSpacesString.split('.');
        if(integerPart.length > maxCharactersInIntegerPartOfInput && noSpacesString.length > noSpacesStateInputString.length){
            addWarningToList(warnings.triedTooManyCharactersIntegerPart);
            result = false;
        }
        if(fractionalPart && fractionalPart.length > maxCharactersInFractionalPartOfInput && noSpacesString.length >= noSpacesStateInputString.length){
            addWarningToList(warnings.triedTooManyCharactersFractionalPart);
            result = false;
        }
        return result;
    }
    function inputBlockingChecks(inputString){
        let result = false;
        draftInputWarningsListReset();
        if(onlyOneDotCheck(inputString)){
            if(maxNumberOfIntegerAndFractionalPartsBlockingCheck(inputString)){
                result = true;
            }
        }
        warningListDraftToState();
        return result;
    }
    function restoreInputToPreviousState(inputString, selectionStart){
        const pastedLength = inputString.length - stateInputValue.length;
        setInputValueAndCursor(stateInputValue, selectionStart-pastedLength);
    }
    function inputBlockingChecksWithRestore(inputString, selectionStart){
        if(isStringConsistOfAllowableCharacters(inputString)){
            if(inputBlockingChecks(inputString)){
                return true;
            }
            else{
                restoreInputToPreviousState(inputString, selectionStart);
            }
        } else{
            restoreInputToPreviousState(inputString, selectionStart);
            inputBlockingChecks(stateInputValue);
        }
        return false;
    }
    function emptyStringCheck(noSpacesString){
        return noSpacesString ? true : false;
    }
    function maxNumberOfIntegerAndFractionalPartsNoBlockingCheck(noSpacesString){
        // const noSpacesStateInputString = stateInputValue.split(/\s+/).join('');
        let integerPart;
        let fractionalPart;
        let result = true;
        [integerPart, fractionalPart] = noSpacesString.split('.');
        if(integerPart.length > maxCharactersInIntegerPartOfInput){
            addErrorToList(errors.enteredTooManyCharactersIntegerPart);
            result = false;
        }
        if(fractionalPart && fractionalPart.length > maxCharactersInFractionalPartOfInput){
            addErrorToList(errors.enteredTooManyCharactersFractionalPart);
            result = false;
        }
        return result;
    }
    function integerAndFractionalPartsExistenceCheck(noSpacesString){
        let result=true;
        let integerPart;
        let fractionalPart;
        [integerPart, fractionalPart] = noSpacesString.split('.');
        if(integerPart === "" && fractionalPart !== undefined){
            addErrorToList(errors.noIntegerPart);
            result = false;
        }
        if(fractionalPart === ""){
            addErrorToList(errors.noFractionalPart);
            result = false;
        }
        if(integerPart.length > 1 && integerPart.charAt(0) === '0'){
            addErrorToList(errors.leadingZeros);
            result = false;
        }
        return result;
    }
    function inputNoBlockingChecks(noSpacesString){
        draftInputErrorsListReset();
        const result = emptyStringCheck(noSpacesString) & maxNumberOfIntegerAndFractionalPartsNoBlockingCheck(noSpacesString) & integerAndFractionalPartsExistenceCheck(noSpacesString);
        errorsListDraftToState();
        return result;
    }
    function handleChange(){
        const inputString = inputRef.current.value;
        const selectionStart = inputRef.current.selectionStart;
        const noSpacesString =  inputString.split(/\s+/).join('');

        if(inputBlockingChecksWithRestore(inputString, selectionStart)){
            spaceFormatting(inputString, selectionStart);                
            if(inputNoBlockingChecks(noSpacesString)){
                //TODO: проверки связанные с числовым значением содержимого строки (мин макс есть ли в кошельке)
                setIsInputValidWithCallBack(true);
            }
            else{
                setIsInputValidWithCallBack(false);
            }
        }
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
            <Box className={classes.WarningsAndErrorsContainer}>
                <Box className='warnings-list'>
                    {inputWarningsList.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                </Box>
                <Box className='errors-list'>
                    {inputErrorsList.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}
export default AmountInput;