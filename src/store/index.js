import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: "",
        login: false,
        learnScore: 0,
        testScore: 0,
        currentList: null,
        watchedWord: [],
        result: [],
        timeLeft: 1800,
    },
    mutations: {
        updateUsername(state, payload) {
            state.username = payload;
        },
        updateLogin(state, payload) {
            state.login = payload;
        },
        LearnScoreUp(state) {
            state.learnScore = state.learnScore + 1;
        },
        updateTestScore(state, payload) {
            state.testScore = payload;
        },
        updateCurrentList(state, payload) {
            state.currentList = payload;
        },
        addWatchedWord(state, payload) {
            state.watchedWord.push(payload);
        },
        updateResult(state, { level, word, time }) {
            const oldData = state.result[level];
            if (!oldData) state.result[level] = [{ word, time }];
            else state.result[level] = [...oldData, { word, time }];
            console.log(state.result);
        },
        minusTime(state) {
            state.timeLeft -= 1;
        },
    },
    actions: {},
    modules: {},
});
