import { red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    AmountContainer:{
        width: '100%',
        '&.variant-1':{
            '& input':{
                border: '0.125rem solid var(--input-border-color-1)',
            }
        },
        '&.variant-2':{
            '& input':{
                border: '0.125rem solid var(--input-border-color-2)',
            }
        },

        '& .right-side-container':{
            margin:'auto',
            display: 'flex',
            justifyContent: 'end',
            color: 'var(--accent-font-color-1)',
        },
        '& .input-container':{  
            position: 'relative',
            margin: '0.9375rem 0px',

            '& input':{
                '-webkit-appearance': 'none',
                outline: 'none',
                // border: '0.125rem solid var(--input-border-color)',
                background: 'transparent',
                minWidth: 'unset',
                width: '100%',
                padding: '1.4375rem 0.9375rem',
                paddingRight: '3.625rem',

                borderRadius: '0.9375rem',
                fontFamily:'var(--base-font-family)',
                fontSize: 'var(--form-content-font-size)',
                fontWeight: 'var(--base-font-weight)',
                color: 'var(--base-font-color)',

                '&::placeholder':{
                    color: 'var(--base-font-color)',
                },
            },

            '&.invalid input':{
                border: '0.125rem solid var(--input-error-color)',
            },

            '& .max-amount-container':{
                position:'absolute',
                right: '0.625rem',
                top: '0px',
                height: '100%',

                display: 'flex',
                alignItems: 'center',
                color: 'var(--accent-font-color-2)',
            }
        },

    },
    WarningsAndErrorsContainer:{
        minHeight: '6rem',
        fontSize: 'var(--input-error-font-size)',

        '& .warnings-list':{
            color: 'var(--input-warning-color)',
        },

        '& .errors-list':{
            color: 'var(--input-error-color)',
        },
    }


});