import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    testSection: {
        display: "flex",
        overflow: "scroll",
        resize: "both",

        width: "calc(620px + 16.8px)",
        height: "800px"

    },

    mintandburnForm: {
        '--base-font-color': '#FFFFFF',
        '--form-header-font-size': '2.1875rem',
        '--form-content-font-size': '1.25rem',
    
        width: '100%',
        height: '46.625rem',
        background: 'blue',
        'border-radius': '2.5rem',
        'color': 'var(--base-font-color)',
        'font-size': 'var(--form-content-font-size)',

        padding: '3.125rem',
        display: 'flex',
        'flex-direction': 'column', 
        

        '& .header': {
            // color: 'var(--color)',
            width: '100%',
            'margin-bottom': '2.3125rem',

            display: 'flex',
            'align-items': 'center',
            

            '& .icon-holder': {
                'width':'4.0625rem',
                'height': '3.9375rem',

                'border': '1px solid red',
                'flex-shrink': '0',
            },
            '& .gap':{
                'flex':'0 1 1.5rem',
            },
            '& .text-holder':{
                'font-size':'var(--form-header-font-size)',
            }
        },
        '& .amount-container':{
            'margin-bottom': '2.5rem',

            '& .right-size-container':{
                'margin':'auto',
                'display': 'flex',
                'justify-content': 'end',
            },
            '& .input-container':{
                'position': 'relative',
                'margin': '0.9375rem 0px',

                '& input':{
                    '-webkit-appearance': 'none',
                    'outline': 'none',
                    'border': 'none',
                    'min-width': 'unset',
                    'width': '100%',
                    'padding': '1.4375rem 0.9375rem',

                    'border-radius': '0.9375rem',
                    'font-size': 'var(--form-content-font-size)',
                    
                },
                '& .max-amount-container':{
                    'position':'absolute',
                    'right': '0.625rem',
                    'top': '0px',
                    'height': '100%',

                    'display': 'flex',
                    'align-items': 'center',
                }
            }
        },
        '& .details-list':{
            'margin-bottom': '3.75rem',


            '& .details-item':{
                'margin-bottom':'2.8125rem',
                'display': 'flex',
                'justify-content': 'space-between',

                '&:last-child':{
                    'margin-bottom': '0px',
                }
            },
        }
    }







});