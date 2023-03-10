import {useStyles} from './styles';
import {useSelector} from "react-redux";
import VotePool from "./vote-pool";
import VoteItemsList from "./vote-items-list";
import './styles.css';
import {useState} from "react";
import VoteInstructions from "./vote-instructions";

const SnetVote = () => {
  const classes = useStyles();
  const [isActiveInstructions, setIsActiveInstructions] = useState(true);
  const {selectedItem} = useSelector((state) => state.event);

  // console.log("COMPONENT Vote")


  return (
    <>
      <div className={classes.snetVote}>
        {!!selectedItem ?
          <VotePool showInstructions={() => {
            setIsActiveInstructions(true)
          }}></VotePool> :
          <VoteItemsList></VoteItemsList>
        }
      </div>
      <VoteInstructions isActive={isActiveInstructions} onClose={()=> {setIsActiveInstructions(false)}}></VoteInstructions>
    </>
  );
};

export default SnetVote;
