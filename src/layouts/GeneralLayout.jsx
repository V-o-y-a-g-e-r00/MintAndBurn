import { useStyles } from './styles';
import SnetFooter from '../components/snet-footer';
import SnetNavigation from '../components/snet-navigation';



const GeneralLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
    <SnetNavigation/>
      <div className={classes.mainContainer}>
        <div className={classes.wrapper}>{children}</div>
      </div>
      <SnetFooter />
    </>
  );
};


export default GeneralLayout;