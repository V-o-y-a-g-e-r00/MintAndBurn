import { makeStyles } from '@mui/styles';

import burnFormBackground from '../../../assets/images/background/burnForm_background.png';

export const useStyles = makeStyles({
    testSection: {
        display: "flex",
        overflow: "scroll",
        resize: "both",

        width: "calc(620px + 16.8px)",
        height: "800px"

    },

    mintForm: {
        '--base-font-color': '#FFFFFF',
        '--base-font-weight': '600',
        '--accent-font-color-1':'#FFC086',
        '--accent-font-color-2': '#FFA723',
        '--base-font-family':'Montserrat',
        '--form-header-font-size': '2.1875rem',
        '--form-header-font-weight': '700',
        '--form-content-font-size': '1.25rem',
        '--input-border-color': 'rgba(255, 182, 115, 1)',

        width: '100%',
        height: '46.625rem',
        flex: '0 1 49%',
        
        background: 'blue',
        borderRadius: '2.5rem',
        color: 'var(--base-font-color)',
        fontSize: 'var(--form-content-font-size)',
        padding: '3.125rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily:'var(--base-font-family)',
        fontWeight: 'var(--base-font-weight)',

        background: `url(${burnFormBackground}), linear-gradient(157.81deg, #DCD87B 5.82%, rgba(255, 67, 67, 0.19) 95.02%)`,
        boxShadow: '0px 11px 22px 1px rgba(255, 193, 35, 0.25)',
        backdropFilter: 'blur(6.5px)',
        

        '& .header': {
            // color: 'var(--color)',
            width: '100%',
            // marginBottom: '2.3125rem',

            display: 'flex',
            alignItems: 'center',
            

            '& .icon-holder': {
                width:'4.0625rem',
                height: '3.9375rem',

                // border: '1px solid red',
                flexShrink: '0',
            },
            '& .gap':{
                flex:'0 1 1.5rem',
            },
            '& .text-holder':{
                fontSize:'var(--form-header-font-size)',
                fontWeight: 'var(--form-header-font-weight)',
            }
        },
        '& .amount-container':{
            // marginBottom: '2.5rem',

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
                    border: '0.125rem solid var(--input-border-color)',
                    background: 'transparent',
                    minWidth: 'unset',
                    width: '100%',
                    padding: '1.4375rem 0.9375rem',

                    borderRadius: '0.9375rem',
                    fontFamily:'var(--base-font-family)',
                    fontSize: 'var(--form-content-font-size)',
                    fontWeight: 'var(--base-font-weight)',
                    color: 'var(--base-font-color)',

                    '&::placeholder':{
                        color: 'var(--base-font-color)',
                    }
                    
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
            }
        },
        '& .details-list':{
            // 'margin-bottom': '1.75rem',


            '& .details-item':{
                marginBottom:'2.8125rem',
                display: 'flex',
                justifyContent: 'space-between',

                '&:last-child':{
                    marginBottom: '0px',
                }
            },
        }
    }







});