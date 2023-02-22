const styles = {
    '--base-font-color': '#FFFFFF',
    '--base-font-family':'Montserrat',
    '--form-header-font-size': '2.1875rem',
    '--form-header-font-weight': '700',
base: {
    width: '100%',
    '& > button': {
        width: '100%',
        height: '4.375rem',
        borderRadius: '1.25rem',
        border: 'none',
        color: 'var(--base-font-color)',
        fontSize: 'var(--form-header-font-size)',
        fontFamily: 'var(--base-font-family)',
        fontWeight: 'var(--form-header-font-weight)',

        background: 'linear-gradient(157.81deg, #7B90DC 5.82%, rgba(206, 67, 255, 0.86) 95.02%)',
        boxShadow: '0px 8px 11px 1px rgba(206, 74, 218, 0.28)',

        '&:hover:not(:disabled), &:focus-visible':{
            boxShadow: '0px 11px 26px 3px rgba(251, 35, 255, 0.25)',
            outline: '2px solid #AE7DED',
            cursor: 'pointer',
        },

        '&:disabled': {
            background: 'linear-gradient(157.81deg, rgba(123, 144, 220, 0.6) 5.82%, rgba(206, 67, 255, 0.516) 95.02%)',
            outline: '2px solid #2D2D2D',
            cursor: 'not-allowed',
        }
    }
},
variants: {
    mint: {
        '& > button': {
            background: 'linear-gradient(157.81deg, #7B90DC 5.82%, rgba(206, 67, 255, 0.86) 95.02%)',
            boxShadow: '0px 8px 11px 1px rgba(206, 74, 218, 0.28)',
            '&:hover:not(:disabled), &:focus-visible':{
                boxShadow: '0px 11px 26px 3px rgba(251, 35, 255, 0.25)',
                outline: '2px solid #AE7DED',
                cursor: 'pointer',
            },
    
            '&:disabled': {
                background: 'linear-gradient(157.81deg, rgba(123, 144, 220, 0.6) 5.82%, rgba(206, 67, 255, 0.516) 95.02%)',
                outline: '2px solid #2D2D2D',
                cursor: 'not-allowed',
            }
        }
    },
    burn: {
        '& > button': {
            background: 'linear-gradient(157.81deg, #7B90DC 5.82%, rgba(206, 67, 255, 0.86) 95.02%)',
            boxShadow: '0px 8px 11px 1px rgba(206, 74, 218, 0.28)',
            '&:hover:not(:disabled), &:focus-visible':{
                boxShadow: '0px 11px 26px 3px rgba(251, 35, 255, 0.25)',
                outline: '2px solid #AE7DED',
                cursor: 'pointer',
            },
    
            '&:disabled': {
                background: 'linear-gradient(157.81deg, rgba(123, 144, 220, 0.6) 5.82%, rgba(206, 67, 255, 0.516) 95.02%)',
                outline: '2px solid #2D2D2D',
                cursor: 'not-allowed',
            }
        }
    },
}
}
export default styles;