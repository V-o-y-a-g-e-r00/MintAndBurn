import SnetDialog from "../snet-dialog";


const VoteInstructions = ({isActive, onClose}) => {
    return (
            <SnetDialog
                    title="Voting Instructions"
                    isDialogOpen={isActive}
                    onDialogClose={onClose}
                    showClosebutton={true}>
                <p><b>Welcome to the voting portal!</b></p>
                <br/>
                <p>In order to start voting, you need to follow a few simple steps:</p>
                <br/>
                <p>
                    1. Click on the "connect wallets" button. It is now possible to connect all your wallets containing AGIX. This will enable you to apply your entire AGIX holdings across multiple wallets in a single voting action.
                </p>
                <br/>
                <p>
                    2. Connect one or more wallets on the form. It should be noted that you can disconnect and connect wallets an unlimited number of times. However, as soon as you have voted for at least one pool of questions, it will not be possible to disconnect wallets until the voting period has ended.t will still be possible to connect additional wallets. In that case, also past votes will benefit from the AGIX balance on these new wallets. Please note that the last connected wallet is the "current" one and will be used to officially sign your votes. To make another wallet "current" click on "set current" next to the required wallet.
                </p>
                <br/>
                <p>
                    3. The "logout" button allows the browser to "forget" your wallets, but in the background, your wallets will still be interlinked to each other. To continue voting, you need to connect at least one of the linked wallets, and rest of the wallets in the collection will be automatically displayed and accounted for.
                </p>
                <br/>
                <p>
                    4. When you have connected all desired wallets, you can proceed to the voting procedure. Please note that the proposals are divided into pools. Each pool contains a number of proposals. . You can vote on just a single proposal, on all of them or none, as you please. All votes in a pool are validated by signing whith your current wallet. IMPORTANT: Once you have signed for a pool, you cannot make any changes or add additional votes! When one pool is done you can continue to a next pool if you want and repeat the process. There is no required order between the pools and you can even log out and log in again before continuing with another pool
                </p>
                <br/>
                <p>
                    5. You can always view the questions, read them, and return to voting later, but no later than the voting end time.
                </p>
                <br/>
                <p>
                    6. Your voting weight depends on the amount of AGIX in your balance, and other metrics such as a reputation rating and -potentiall- the time passed since the first transaction in your wallet. Very ‘young’ wallets may have a lower voting weight, so it is not wise to create a large number of wallets prior to the voting event. AGIX that is staked in our staking portal is also taken into account, when the related wallets are linked. We ask you not to conduct transactions with AGIX during the voting week so that we can correctly evaluate your votes.
                </p>
                <br/>
                <p>
                    If you have any questions or problems, please contact technical support:
                    <br/>
                    <i>voting-support@singularitynet.io</i>
                </p>
            </SnetDialog>
    );
};
export default VoteInstructions;
