import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import styles from './styles';

const MintandburnButton = ({ name, onClick, variant, disabled }) => {
  return (
    <Box sx={styles.button}>
      <button disabled={disabled} onClick={onClick} variant={variant} color="primary" id={`snet-button-${name}`}>
        {name}
      </button>
    </Box>
  );
};

MintandburnButton.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  disabled: PropTypes.bool
};

MintandburnButton.defaultProps = {
  variant: 'contained',
  disabled: false
};

export default MintandburnButton;
