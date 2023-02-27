import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    MintAndBurnForms: {
        width:'100%',
        display: 'flex',
        flexDirection: 'column',
    },
    Header: {
        '--forms-container-header-font-size': '2.8125rem',
        '--forms-container-header-weight': '700',
        '--base-font-color': '#FFFFFF',

        margin: 'auto',
        marginTop: '4rem',
        marginBottom: '4rem',
        color: 'var(--base-font-color)',
        fontWeight: 'var(--forms-container-header-weight)',
        fontSize: 'var(--forms-container-header-font-size)',
    },
    FormsContainer: {
        display:'flex',
        width:'100%',
        justifyContent: 'space-between',
        // backgrosund: 'red',
    }
})