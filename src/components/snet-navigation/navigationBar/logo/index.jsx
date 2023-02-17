import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Paths from '../../../../router/paths';
import VotingLogo from '../../../../assets/images/logo/voting_logo.svg';
import useNavbarStyles from '../../style';

const BridgeLogo = () => {
  const classes = useNavbarStyles();
  const navigate = useNavigate();

  const onClickLogo = () => {
    navigate(Paths.Voting);
  };

  return (
    <Box onClick={onClickLogo} className={`${classes.flex} ${classes.cursor}`}>
      <img src={VotingLogo} alt="SingNet Logo" className={classes.logo} />
    </Box>
  );
};

export default BridgeLogo;
