const styles = {
    '--base-font-color': '#FFFFFF',
    '--base-font-family':'Montserrat',
    '--form-header-font-size': '2.1875rem',
button: {
    width: '100%',
    '& > button': {
        width: '100%',
        height: '4.375rem',
        borderRadius: '1.25rem',

        background: 'linear-gradient(157.81deg, #7B90DC 5.82%, rgba(206, 67, 255, 0.86) 95.02%)',
        boxShadow: '0px 8px 11px 1px rgba(206, 74, 218, 0.28)',

        border: 'none',
        color: 'var(--base-font-color)',
        fontSize: 'var(--form-header-font-size)',
        fontFamily: 'var(--base-font-family)',
        // color: 'red',
    }
}
}
export default styles;