import SnetFooter from '../components/snet-footer';
import SnetNavigation from '../components/snet-navigation';
import SnetSnackbar from '../components/ui/snet-snackbar';
import { useStyles } from './styles';

const GeneralLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <SnetNavigation />
      <div className={classes.mainContainer}>
        <div className={classes.wrapper}>{children}</div>
      </div>
      <SnetSnackbar/>
      <SnetFooter />
    </>
  );
};


export default GeneralLayout;