import Box from '@mui/material/Box';

import MintForm from "./mint-form";
import BurnForm from "./burn-form";

import {useStyles} from './styles';

const MintAndBurnForms = () => {

const classes = useStyles();
return (
<Box className={classes.MintAndBurnForms}>
    <MintForm></MintForm>
    <BurnForm></BurnForm>
</Box>
)};
export default MintAndBurnForms;