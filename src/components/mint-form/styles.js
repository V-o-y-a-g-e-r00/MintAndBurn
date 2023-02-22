import { makeStyles } from '@mui/styles';

import mintFormBackground from '../../assets/images/background/mintForm_background.png';

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
        '--accent-font-color-1':'#FFC086',
        '--accent-font-color-2': '#FFA723',
        '--base-font-family':'Montserrat',
        '--form-header-font-size': '2.1875rem',
        '--form-content-font-size': '1.25rem',
        '--input-border-color': '#DCB9FF',

        width: '100%',
        height: '46.625rem',
        background: 'blue',
        borderRadius: '2.5rem',
        color: 'var(--base-font-color)',
        fontSize: 'var(--form-content-font-size)',
        padding: '3.125rem',
        display: 'flex',
        flexDirection: 'column',
        fontFamily:'var(--base-font-family)',



        background: `url(${mintFormBackground}), linear-gradient(157.81deg, #7B90DC 5.82%, rgba(206, 67, 255, 0.19) 95.02%)`,
        boxShadow: '0px 11px 32px 1px rgba(145, 135, 255, 0.25)',
        backdropFilter: 'blur(6.5px)',
        

        '& .header': {
            // color: 'var(--color)',
            width: '100%',
            marginBottom: '2.3125rem',

            display: 'flex',
            alignItems: 'center',
            

            '& .icon-holder': {
                width:'4.0625rem',
                height: '3.9375rem',

                // border: '1px solid red',
                flexShrink: '0',

                '& .dummy-border': {
                    width: '100%',
                    height: '100%',
                    padding:'0.1875rem',
                    borderRadius: '1.25rem',
                    background: 'linear-gradient(144.85deg, rgba(220, 185, 255, 1) 6.99%, rgba(201, 148, 255, 0.47) 93.01%), linear-gradient(90deg, rgba(0,0,0,0.5) 7%, rgba(0,0,0,1)) 93%',
                    // background: 'red',
                    '& .dummy-inner':{
                        width: '100%',
                        height: '100%',
                        borderRadius: '1rem',
                        background: 'linear-gradient(144.85deg, #ECA2FF 6.99%, rgba(136, 43, 254, 0.2) 93.01%)',
                    }
                },
            },
            '& .gap':{
                flex:'0 1 1.5rem',
            },
            '& .text-holder':{
                fontSize:'var(--form-header-font-size)',
            }
        },
        '& .amount-container':{
            marginBottom: '2.5rem',

            '& .right-size-container':{
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
            'margin-bottom': '3.75rem',


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