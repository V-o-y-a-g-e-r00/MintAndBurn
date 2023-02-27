import { makeStyles } from '@mui/styles';
import BackgroundImage from '../assets/images/background/main_background.png';

// eslint-disable-next-line import/prefer-default-export
export const useStyles = makeStyles({
  mainContainer: {
    padding: '4.0625rem 0 5rem 0',
    backgroundSize: 'cover',
    minHeight: '70vh',

    background: `url(${BackgroundImage}), linear-gradient(153.37deg, #2C2352 12.94%, #100E13 91.8%)`,
  },
  wrapper: {
    maxWidth: 1280,
    margin: '0 auto',
    '@media(max-width: 1200px)': { padding: '0 20px' }
  }
});