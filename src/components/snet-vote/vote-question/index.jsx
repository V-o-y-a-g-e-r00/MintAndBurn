import {useDispatch, useSelector} from "react-redux";
import { FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {setAnswer} from "../../../store/slices/event/eventSlice";
import {useStyles} from './styles';

const VoteQuestion = ({question, index, isPoolDisabled}) => {

  // console.log(question);
  const classes = useStyles();
  const dispatch = useDispatch();
  const savedValue = useSelector(state => question.user_response_key ?? null);
  const selectedValue = useSelector(state => state.event.answers[question.question_id] ? state.event.answers[question.question_id] : 'skip');

  // console.log("selectedValue")
  // console.log(selectedValue)

  // useEffect(() => {
  //   console.log('useEffect');
  //   console.log(value);
  //   dispatch(setAnswer({
  //     question_id: question.question_id,
  //     answer: value
  //   }))
  // }, [value]);

  const handleChange = (event) => {
    console.log("handleChange")
    event.preventDefault();
    dispatch(setAnswer({
      question_id: question.question_id,
      answer: event.target.value
    }))
  };

  // console.log("COMPONENT VoteQuestion")
  const boxClassNames = classes.overflowBox + ' box';
  return (
    // <div className={classes.voteQuestion}>

    <div className="columns">
      <div className="column is-8-desktop is-offset-2-desktop">
        <div className="content">
          <h3>Proposal {index + 1}</h3>

          <div className="dropdown-container box">
            {!question.is_active ?
                    <div className="box"><b>This question is unavailable for voting...</b></div> :
                    ''
            }
            <div className={boxClassNames} dangerouslySetInnerHTML={{__html: question.question}}></div>
            <div>
              <div dangerouslySetInnerHTML={{__html: question.description}}></div>
              <a href={question.details_url} target="_blank" rel="noopener noreferrer">Click here to know more</a>
            </div>
            <div className="box">
              { question.question_type !== "SINGLE_SELECT" ? <div><i>1 - Least ... 10 - Best</i></div> : null }
              <RadioGroup
                      style={question.user_response_key ? {'background':'#E7FFF8'} : null}
                      aria-labelledby={question.question_id}
                      name={"radio-buttons-group-"+question.question_id}
                      value={savedValue || selectedValue}
                      onChange={handleChange}
                      row
              >
                {
                  question.options.map(option => {
                    return option.key !== "skip" ?
                            <FormControlLabel value={option.key} control={<Radio/>} label={option.value} key={option.key} disabled={!question.is_active || isPoolDisabled}/> :
                            ''
                  })
                }
              </RadioGroup>

            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  )
    ;
};

export default VoteQuestion;
