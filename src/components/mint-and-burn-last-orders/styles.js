import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    MintAndBurnLastOrders: {
        width:'100%',
        display: 'flex',
        flexDirection: 'column',
    },
    Header2: {
        '--last-orders-container-header-font-size': '2.6875rem',
        '--last-orders-container-header-weight': '700',
        '--base-font-color': '#FFFFFF',

        margin: 'auto',
        marginBottom: '2.5rem',
        color: 'var(--base-font-color)',
        fontWeight: 'var(--forms-container-header-weight)',
        fontSize: 'var(--last-orders-container-header-font-size)',
    },
    LastOrdersContainer: {
        width:'100%',
        borderRadius: '1.25rem',
        background: 'linear-gradient(180deg, #FF9797 0%, rgba(243, 103, 255, 0) 100%)',
        padding: '3.125rem',

        display:'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
})