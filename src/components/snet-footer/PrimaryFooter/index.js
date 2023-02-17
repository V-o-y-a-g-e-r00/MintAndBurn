import propTypes from 'prop-types';
import WhiteSnetLogo from '../../../assets/images/logo/WhiteLogo.svg';
import FooterLinks from './FooterLinks';
import FooterLink from '../FooterLink';
import { useStyles } from './styles';

const PrimaryFooter = ({ leftData, mainData }) => {
  const classes = useStyles();
  return (
    <div className={classes.PrimaryFooter}>
      <div className={classes.LeftData}>
        <div className={classes.FooterLogo}>
          <h1>
            <a href="https://singularitynet.io/" title="SingularityNET">
              <img src={WhiteSnetLogo} alt="SingularityNET" />
            </a>
          </h1>
        </div>
        <ul className={classes.footerLogoSection}>
          {leftData.map((item) => (
            <FooterLink key={item.label} image={item.image} link={item.link} label={item.label} internalLink={item.internalLink} />
          ))}
        </ul>
      </div>
      <FooterLinks data={mainData} />
    </div>
  );
};

PrimaryFooter.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  leftData: propTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  mainData: propTypes.array.isRequired
};

export default PrimaryFooter;
