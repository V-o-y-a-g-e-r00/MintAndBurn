import { createSlice } from '@reduxjs/toolkit';
import { progress } from '../../../data/constants/constants';
import { getProposals, getPools, savePool, getInitialData } from './eventActions';

const eventSlice = createSlice({
    name: 'event',
    initialState: {
        proposals: null,
        poolsOfQuestions: null,
        singleQuestions: null,
        poolsList: null,
        answers: {},
        selectedItem: null,
        isInitial: true,
        loading: progress.PROCESSING
    },
    reducers: {
        setIsInitial(state, action) {
            state.isInitial = action.payload;
        },
        setSelectedItem(state, action) {
            console.log(action);
            state.selectedItem = action.payload;
        },
        setAnswer(state, action) {
            console.log("setAnswer(state, action)")
            console.log(action);
            state.answers[action.payload.question_id] = action.payload.answer;
            console.log(state.answers);
        },
    },
    extraReducers: (builder) => {
        //TODO remove or use getInitialData
        builder.addCase(getInitialData.pending, (state) => {
            state.loading = progress.PROCESSING;
        });
        builder.addCase(getInitialData.fulfilled, (state, action) => {
            console.log("builder.addCase(getInitialData.fulfilled");
            console.log(action.payload);
            // const proposalsList = action.payload.data.questions;
            // let poolsObj = {};
            // let questionsArr = [];
            // proposalsList.map(question => {
            //         if (!question.pool_id) {
            //             questionsArr.push(question);
            //         }
            //         else if (!poolsObj[question.pool_id]) {
            //             poolsObj[question.pool_id] = [question];
            //         }
            //         else {
            //             poolsObj[question.pool_id].push(question);
            //         }
            // });
            // state.proposals = proposalsList;
            // state.poolsOfQuestions = poolsObj;
            // state.singleQuestions = questionsArr;
            // state.loading = progress.IDLE;
        });
        builder.addCase(getProposals.pending, (state) => {
            // console.log("builder.addCase(getProposals.pending");
            state.loading = progress.PROCESSING;
        });
        builder.addCase(getProposals.fulfilled, (state, action) => {
            console.log("builder.addCase(getProposals.fulfilled");
            console.log("action.payload", action.payload);
            const proposalsList = action.payload.data.questions;
            let poolsObj = {};
            let questionsArr = [];
            proposalsList.forEach(question => {
                if (!question.pool_id) {
                    questionsArr.push(question);
                }
                else if (!poolsObj[question.pool_id]) {
                    poolsObj[question.pool_id] = [question];
                }
                else {
                    poolsObj[question.pool_id].push(question);
                }
            });
            state.proposals = proposalsList;
            state.poolsOfQuestions = poolsObj;
            state.singleQuestions = questionsArr;
            state.loading = progress.IDLE;
        });
        builder.addCase(getPools.pending, (state) => {
            // console.log("builder.addCase(getPools.pending");
            // console.log("state.loading = progress.PROCESSING");
            state.loading = progress.PROCESSING;
        });
        builder.addCase(getPools.fulfilled, (state, action) => {
            // console.log("builder.addCase(getPools.fulfilled");
            // console.log("action.payload.data.pools");
            // console.log(action.payload.data.pools);
            state.poolsList = action.payload.data.pools;
            state.loading = progress.IDLE;
        });
        builder.addCase(savePool.pending, (state) => {
            // console.log("builder.addCase(savePool.pending");
            // console.log("state.loading = progress.PROCESSING");
            state.loading = progress.PROCESSING;
        });
        builder.addCase(savePool.fulfilled, (state, action) => {
            console.log("builder.addCase(savePool.fulfilled");
            console.log("action", action);
            state.loading = progress.IDLE;
        });
        builder.addCase(savePool.rejected, (state, action) => {
            console.log("builder.addCase(savePool.rejected");
            console.log("action.payload", action.payload);
            state.loading = progress.IDLE;
        });
    }
});


export const {
    setIsInitial,
    setSelectedItem,
    setAnswer,
} = eventSlice.actions;

export default eventSlice;
