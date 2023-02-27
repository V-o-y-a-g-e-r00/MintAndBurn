import SnetNavigation from '../components/snet-navigation';
import SnetSnackbar from '../components/ui/snet-snackbar';
import { useStyles } from './styles';

const GeneralLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.BackgroundHolder}>
      <SnetNavigation />
      <div className={classes.mainContainer}>
        <div className={classes.wrapper}>{children}</div>
      </div>
      <SnetSnackbar/>
      </div>
    </>
  );
};


export default GeneralLayout;