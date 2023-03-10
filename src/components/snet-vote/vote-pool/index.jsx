import {useStyles} from './styles';
import { useMemo, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setSelectedItem} from "./../../../store/slices/event/eventSlice"
import VoteQuestion from "../vote-question";
import SnetDialog from "../../snet-dialog";
import {showErrorNotification} from "../../../store/slices/notifications/notificationsSlice";
import {availableBlockchains} from "../../../data/constants/constants";
import useInjectableEthereumHook from "../../../lib/ethereumWalletHook/useInjectableEthereumHook";
import {savePool} from "../../../store/slices/event/eventActions";
import Button from '@mui/material/Button';
import useInjectableCardanoHook from "../../../lib/cardanoWalletHook/useInjectableCardanoHook";

const VotePool = ({showInstructions}) => {
    const classes = useStyles();
    const [isRecordingInProgress, setIsRecordingInProgress] = useState(false);
    const {selectedItem, answers} = useSelector((state) => state.event);
    const currentWallet = useSelector(state => state.wallets.currentWallet);
    const dispatch = useDispatch();


    const {signEthMessage} = useInjectableEthereumHook();
    const {signMessage} = useInjectableCardanoHook();

    const poolAnswers = useMemo(() => {
        const res = [];
        selectedItem.forEach((question) => {
            res.push({
                "question_id": question.question_id,
                "answer_key": answers[question.question_id] ?? "skip"
            });
        });
        console.log("Computed answers");
        console.log(res);
        return res;

    }, [answers, selectedItem])

    const VoteSectionHeader = () => {
        const dispatch = useDispatch();
        return (
                <div className="content is-12-desktop is-12-mobile pl-0">
                    <div className="is-flex">
                        <div className="column is-4-desktop is-6-mobile is-offset-2-desktop pl-0">
                            <button className="button" onClick={() => dispatch(setSelectedItem(null))}>back</button>
                        </div>

                        <div className="column is-6-mobile is-4-desktop is-flex is-justify-content-end pr-0">
                            <div className="buttons">
                                <Button className="button is-primary" onClick={showInstructions}>
                                    <strong>Instructions</strong>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

    const QuestionsList = ({isPoolDisabled}) => {
        const questions = selectedItem;
        if (!!questions.length) {
            // console.log("vote-pool QuestionsList questions");
            // console.log(questions);
            return questions.map((question, index) => {
                return <VoteQuestion question={question} index={index} isPoolDisabled={isPoolDisabled} key={question.question_id}></VoteQuestion>;
            })
        }
    }
    const submitVote = async (answers) => {
        console.log("Answers submittings start");
        // setIsRecordingInProgress(true);

        //TODO check chain id
        // isAtExpectedEthNetwork
        // dispatch(showErrorNotification({, message: "Your current wallet belongs to wrong chain"}));

        if (!currentWallet) {
            setIsRecordingInProgress(false);
            dispatch(showErrorNotification({message: "No active wallet found. Connect or unlock some wallet."}));
        } else {
            const msg = JSON.stringify(poolAnswers).replaceAll(" ", "");
            console.log("message to sign", msg);
            setIsRecordingInProgress(true);

            switch (currentWallet.blockchain) {
                case availableBlockchains.ETHEREUM: {
                    console.log("availableBlockchains.ETHEREUM");
                    const signed = await signEthMessage(currentWallet.extension, currentWallet.address, msg);
                    console.log("signed");
                    console.log(signed);
                    const payload = {
                        address: currentWallet.address,
                        message: poolAnswers,
                        signature: signed
                    };
                    try {
                        const poolSaving= await dispatch(savePool(payload));
                        console.log("poolSaving", poolSaving);
                        const poolSavingResponse = poolSaving.payload;
                        console.log("poolSavingResponse", poolSavingResponse);
                        if (poolSavingResponse) {
                            await dispatch(setSelectedItem(null));
                            dispatch(showErrorNotification({message: "You answers have been saved successfully"}));
                        }
                        else {
                            dispatch(showErrorNotification({message: "Server error. Your answers have not been saved."}));
                        }
                    }
                    catch (e) {
                        dispatch(showErrorNotification({message: e.message}));
                    }
                    setIsRecordingInProgress(false);

                    break;
                }
                case availableBlockchains.CARDANO: {
                    console.log("availableBlockchains.CARDANO");
                    const signed = await signMessage(currentWallet.extension, currentWallet.address, msg);
                    console.log("signed");
                    console.log(signed);
                    const payload = {
                        address: currentWallet.address,
                        message: poolAnswers,
                        signature: signed.signature,
                        key: signed.key
                    };
                    const poolSaving = await dispatch(savePool(payload));
                    const poolSavingResponse = poolSaving.payload;

                    console.log("poolSavingResponse");
                    console.log(poolSavingResponse);

                    if (poolSavingResponse.status === 'failed') {
                        dispatch(showErrorNotification({message: "Your answers have not been saved: " + poolSavingResponse.error.message}));
                    }
                    else if (poolSavingResponse.status === 'success') {
                        // await dispatch(getProposals());
                        await dispatch(setSelectedItem(null));
                        dispatch(showErrorNotification({message: "You answers have been saved successfully"}));
                    }
                    setIsRecordingInProgress(false);
                    break;
                }
                default: {
                    showErrorNotification({message: "Something wrong with current wallet or it's blockchain"})
                }
            }

        }


// setTimeout(()=>{
//   console.log("Answers submittings end");
//   alert(JSON.stringify(poolAnswers));
//   setIsRecordingInProgress(false);}, 2000)

        return;
    }

    // console.log("COMPONENT VotePool")

    if (!selectedItem) {
        return;
    } else {
        const isPoolActive = selectedItem.some(question => question.is_active);
        const isPoolVoted = selectedItem.some(question => !!question.user_response_key);
        const isPoolDisabled = !currentWallet || isPoolVoted || !isPoolActive;
        return (
                <div className={classes.votePool}>
                    <h3>Vote Pool {selectedItem[0]?.pool_id ? selectedItem[0]?.pool_id : ''}</h3>
                    <VoteSectionHeader></VoteSectionHeader>
                    <QuestionsList isPoolDisabled={isPoolDisabled}></QuestionsList>
                    <div className="columns">
                        <div className="column is-8-desktop is-offset-2-desktop">
                            <div className="content">
                                <div className="box">
                                    {
                                        !currentWallet ?
                                                <span>Connect wallet for voting</span> :
                                                <button
                                                        className="button"
                                                        onClick={submitVote}
                                                        disabled={isPoolDisabled}
                                                >
                                                    <span className="icon"> ✍️ </span>
                                                    {
                                                        isPoolVoted ?
                                                                <span>You have already voted!</span> :
                                                                isPoolActive ?
                                                                        <span>SIGN & CONFIRM</span> :
                                                                        <span>Vote time ends for all proposals in this pool</span>
                                                    }
                                                </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <SnetDialog
                            title="Recording your vote..."
                            isDialogOpen={isRecordingInProgress}
                            onDialogClose={() => {
                            }}
                            showClosebutton={false}>
                        <progress className="progress is-small is-info" max="100">15%</progress>
                    </SnetDialog>

                    {/*<div className="modal" v-bind:class="{ 'is-active': loading.submitVote }">*/}
                    {/*  <div className="modal-background"></div>*/}
                    {/*  <div className="modal-card">*/}
                    {/*    <header className="modal-card-head">*/}
                    {/*      <p className="modal-card-title">Recording your vote...</p>*/}
                    {/*    </header>*/}
                    {/*    <section className="modal-card-body">*/}
                    {/*      <progress className="progress is-small is-info" max="100">15%</progress>*/}
                    {/*    </section>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                </div>
        );
    }
};

export default VotePool;
