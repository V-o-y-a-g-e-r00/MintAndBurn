import Box from '@mui/material/Box';
import { useStyles } from './styles';

import { useState, useRef} from 'react';
import { inputErrors, maxCharactersInIntegerPartOfInput } from '../../../data/constants/constants';

const AmountInput = ({variant}) => {
    const classEnum = {
        INVALID : 'invalid',
    };
    const [stateInputValue, setStateInputValue] = useState('');

    const [isInputValid, setIsInputValid] = useState(true);
    const warnings = inputErrors.warnings;
    const [inputWarningsList, setInputWarningsList] = useState([]);
    let draftInputWarningsList;

    // const [inputErrorsList, setInputErrorsList] = useState([]);
    //const errors = inputErrors.errors;
    
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
    function warningListStateToDraft(){
        draftInputWarningsList = [...inputWarningsList];
    }
    function warningListDraftToState(){
        setInputWarningsList([...draftInputWarningsList]);
    }
    function addWarningToList(warning){
        if(!draftInputWarningsList.includes(warning)){
            draftInputWarningsList.push(warning);
        }
    }
    function removeWarningFromList(warning){
        const indexOfWarning = draftInputWarningsList.indexOf(warning);
        if(indexOfWarning > -1){
            draftInputWarningsList.splice(indexOfWarning, 1);
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
    function maxNumberOfIntegerAndFractionalPartsCheck(inputString){
        const noSpacesString =  inputString.split(/\s+/).join('');
        let integerPart;
        if(noSpacesString.indexOf('.')> -1){
            console.log("maxNumberOfIntegerAndFractionalPartsCheck: has dot");
            integerPart = (noSpacesString.match(/[^.]*\./)[0]).slice(0, -1);
            console.log("integerPart dot=" + integerPart);
        }else{
            console.log("maxNumberOfIntegerAndFractionalPartsCheck: has no dot");
            integerPart = noSpacesString;
            console.log("integerPart no dot=" + integerPart);
        }
        // console.log("integerPart=" + integerPart);
        if(integerPart.length > maxCharactersInIntegerPartOfInput){
            addWarningToList(warnings.triedTooManyCharactersIntegerPart);
            return false;
        }else{
            removeWarningFromList(warnings.triedTooManyCharactersIntegerPart);
            return true;
        }
    }
    function inputBlockingChecks(inputString){
        warningListStateToDraft();
        //const result = onlyOneDotCheck(inputString) & maxNumberOfIntegerAndFractionalPartsCheck(inputString);
        
        console.log("draftInputWarningsList 0=" + draftInputWarningsList);
        const res1 = onlyOneDotCheck(inputString);
        console.log("res1=" + res1);
        console.log("draftInputWarningsList 1=" + draftInputWarningsList);
        const res2 = maxNumberOfIntegerAndFractionalPartsCheck(inputString);
        console.log("res2=" + res2);
        console.log("draftInputWarningsList 2=" + draftInputWarningsList);
        

        
        
        warningListDraftToState();
        return res1 & res2;
        //    return result;
    }
    function restoreInputToPreviousState(inputString, selectionStart){
        const pastedLength = inputString.length - stateInputValue.length;
        setInputValueAndCursor(stateInputValue, selectionStart-pastedLength);
    }
    function inputBlockingChecksAndFormatting(){
        const inputString = inputRef.current.value;
        const selectionStart = inputRef.current.selectionStart;
        if(isStringConsistOfAllowableCharacters(inputString)){




            console.log("isStringConsistOfAllowableCharacters true");

            const test = inputBlockingChecks(inputString);
            console.log("test=" + test);
            if(test){
                spaceFormatting(inputString, selectionStart);
            }
            else{
                console.log("inputString=" + inputString + " stateInputValue=" + stateInputValue);
                restoreInputToPreviousState(inputString, selectionStart);

                console.log("draftInputWarningsList=" + draftInputWarningsList);
                console.log("inputWarningsList=" + inputWarningsList);
                // inputBlockingChecks(stateInputValue);
            }






        } else{
            console.log("isStringConsistOfAllowableCharacters false");
            restoreInputToPreviousState(inputString, selectionStart);

            inputBlockingChecks(stateInputValue);
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
            {inputWarningsList.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
            </Box>
        </Box>
    )
}
export default AmountInput;