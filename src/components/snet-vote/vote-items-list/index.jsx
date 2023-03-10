import { useStyles } from './styles';
//import { useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
//import {blockchains} from "../../../data/constants/constants";
import { setSelectedItem } from "./../../../store/slices/event/eventSlice"

const VoteItemsList = () => {
  const dispatch = useDispatch();
  const { poolsOfQuestions, singleQuestions, poolsList } = useSelector((state) => state.event);
  // const { setSelectedItem } = useSelector((state) => state.event);
  const classes = useStyles();
  // console.log("poolsOfQuestions");
  // console.log(poolsOfQuestions);
  // console.log("singleQuestions");
  // console.log(singleQuestions);
  // console.log("poolsList");
  // console.log(poolsList);

  const PoolsDescriptionList = ({pools, poolsDescription}) => {
    // console.log("pools");
    // console.log(pools);
    // console.log("poolsDescription");
    // console.log(poolsDescription);
    if (pools && poolsDescription?.length && Object.entries(pools)?.length) {
      //eslint-disable-next-line
      return poolsDescription.map(pool => {
        // console.log(pool);
        // console.log(setSelectedItem);
        if (pools[pool.pool_id]) {
          return <li key={pool.pool_id} className="card" onClick={() => dispatch(setSelectedItem(pools[pool.pool_id]))}>
            <div className="card-content is-flex is-justify-content-space-between is-align-items-center" style={pools[pool.pool_id][0].user_response_key ? {'background':'#E7FFF8'} : null} >
              <div>
                <h3>{pool.pool_name}</h3>
                <div dangerouslySetInnerHTML={{ __html: pool.description }}></div>
                <div>Contains {pools[pool.pool_id].length} questions</div>
                {pool?.total_amount ?
                        <div>Total avialable amount: ${pool.total_amount}</div>:
                        ''
                }
              </div>
              {pools[pool.pool_id][0].user_response_key ?
                      <div className="media-right is-flex is-justify-content-space-between is-align-items-center">
                        <span className="material-icons"> task_alt </span>
                        <span>VOTED</span>
                      </div>
                      : null}
            </div>
          </li>;
        }
      })
    }
    else {
      return <p>There is no data</p>
    }
  }

  const QuestionsDescriptionList = ({questions}) => {
    if (!!questions?.length) {
      console.log("questions");
      console.log(questions);
      return questions.map(question => {
        console.log("question.description");
        console.log(question);
        console.log("question.question_id");
        console.log(question.question_id);
          return <li key={question.question_id} className="card" onClick={() => dispatch(setSelectedItem(question))}>
            <div className="card-content is-flex is-justify-content-space-between is-align-items-center" style={question.user_response_key ? {'background':'#E7FFF8'} : null} >
              <div>
                <div dangerouslySetInnerHTML={{ __html: question.question }}></div>
              </div>
              {question.user_response_key ?
                <div className="media-right is-flex is-justify-content-space-between is-align-items-center">
                  <span className="material-icons"> task_alt </span>
                  <span>VOTED</span>
                </div>
              : null}
            </div>
          </li>;
      })
    }
  }

  return (
    <div className="proposal">
      <div className={[classes.voteItemsList, "content"]}>
        <h3>Vote Items List</h3>
        <ul>
          <PoolsDescriptionList pools={poolsOfQuestions} poolsDescription={poolsList}/>
        </ul>
        <ul>
          <QuestionsDescriptionList questions={singleQuestions}/>
        </ul>
      </div>
    </div>
  );
};
export default VoteItemsList;
