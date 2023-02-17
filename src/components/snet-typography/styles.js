import { makeStyles } from '@mui/styles';

// eslint-disable-next-line import/prefer-default-export
export const useStyles = makeStyles({
    snetTypography: {
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& ul': {
            width: '100%',
            padding: '16px',
            '& li': {
                listStyle: 'none',
                '& p': {
                    fontSize: 18,
                    fontWeight: 'bold',
                    letterSpacing: -0.01,
                    lineHeight: '28px',
                    '&:last-of-type': { display: 'inline-block' }
                }
            }
        }
    }
});
