import { makeStyles } from '@mui/styles';

// eslint-disable-next-line import/prefer-default-export
export const useStyles = makeStyles({
  PrimaryFooter: {
    width: '100%',
    display: 'flex',
    '@media (max-width:1023px)': { display: 'inline-block' }
  },
  LeftData: {
    paddingRight: 42,
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderRightColor: 'rgba(219, 227, 231, 0.5)',
    '@media (max-width:1023px)': {
      borderBottom: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: '#DBE3E7',
      padding: '0 15px 15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    '@media (max-width:400px)': {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },
  footerLogoSection: {
    textAlign: 'right',
    padding: 0,
    margin: 0,
    '& img': {
      '@media (max-width:1023px)': {
        width: 140,
        marginRight: 52
      }
    },
    '& li': {
      listStyle: 'none',
      color: '#9b9b9b',
      fontSize: 14,
      lineHeight: '24px',
      '&:last-of-type': {
        '@media (max-width:1023px)': { marginRight: 0 }
      },
      '&:hover': {
        '& a': { color: '#fff' }
      },
      '@media (max-width:1023px)': {
        marginRight: 25,
        display: 'inline-block'
      }
    },
    '@media (max-width:1023px)': {
      padding: '0 15px 10px',
      borderRight: 'none',
      display: 'inline-block',
      alignItems: 'center',
      textAlign: 'inherit'
    }
  },
  FooterLogo: {
    '& h1': {
      width: 207,
      margin: 0,
      lineHeight: 0
    },
    '& a': {
      display: 'inline-block'
    },
    '& img': { width: '100%' }
  }
});
