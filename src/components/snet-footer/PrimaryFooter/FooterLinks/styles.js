import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  footerRightSideLinks: {
    display: 'flex',
    padding: '12px 0 0 69px',
    width: '100%',
    '@media (max-width:1023px) and (min-width:768px)': {
      width: 'auto',
      padding: '13px 0 0 15px'
    },
    '@media (max-width:769px)': {
      width: 'auto',
      boxSizing: 'border-box',
      display: 'inline-block',
      padding: '0 30px'
    }
  },
  footerLinksList: {
    width: 165,
    padding: 0,
    margin: '0 10% 0 0',
    '&:last-of-type': { marginRight: 0 },
    '& > span': {
      paddingBottom: 10,
      display: 'inline-block',
      color: '#fff',
      fontSize: 20,
      opacity: 0.8
    },
    '& li': {
      listStyle: 'none',
      color: '#9b9b9b',
      fontSize: 14,
      lineHeight: '24px',
      '&:hover': {
        '& a': { color: '#fff' }
      }
    },
    '@media (max-width:1023px) and (min-width:768px)': { width: '30%' },
    '@media (max-width:1279px) and (min-width:768px)': { marginRight: '3%' },
    '@media (max-width:768px)': {
      width: '50%',
      margin: '30px 0px 0 0',
      display: 'inline-block',
      verticalAlign: 'top'
    },
    '@media (max-width: 414px)': { width: '100%' }
  },
  footerLinks: { listStyle: 'none' },
  footerLinkText: {
    color: 'red',
    textDecoration: 'none',
    lineHeight: '25px'
  },
  marginLeft: { marginLeft: 35 }
});
