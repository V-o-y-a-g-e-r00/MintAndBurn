import {Helmet} from 'react-helmet';
import {Backdrop, Box, CircularProgress} from '@mui/material';
import {useEffect, useState} from 'react';
import GeneralLayout from '../../layouts/GeneralLayout';
import {useStyles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getProposals, getPools} from "../../store/slices/event/eventActions";
import SnetVote from './../../components/snet-vote'

const Voting = () => {
    // console.log("COMPONENT VOTING PAGE")
    const classes = useStyles();
    const isLoading = useSelector(state => state.application.isLoading);
    const dispatch = useDispatch();
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

  
    useEffect(() => {
        async function getData() {
            setIsInitialDataLoaded(!!(await Promise.all([dispatch(getProposals()), dispatch(getPools())])));
        }
        getData();
        // dispatch(getPools());
        //TODO exceptions
        //TODO uncomment
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
            <>
                <Backdrop className={classes.backdrop} open={isLoading}>
                    <CircularProgress color="white"/>
                </Backdrop>
                <Helmet>
                    <title>SingularityNet Voting</title>
                </Helmet>
                <GeneralLayout>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        {
                            !isInitialDataLoaded ?
                                    <div>
                                        <h3>Loading proposals</h3>
                                        <progress className="progress is-small is-info" max="100">15%</progress>
                                    </div> :
                                    <SnetVote />
                        }
                    </Box>
                </GeneralLayout>
            </>
    );
};
export default Voting;
