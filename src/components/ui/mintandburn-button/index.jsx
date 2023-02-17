import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const MintandburnButton = ({ name, onClick, variant, disabled }) => {
  return (
    <Button disabled={disabled} onClick={onClick} variant={variant} color="primary" id={`snet-button-${name}`}>
      {name}
    </Button>
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
