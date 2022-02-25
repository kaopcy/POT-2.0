import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isAdmin: false,
        username: "",
        login: false,
        learnScore: 0,
        testScore: 0,
        currentList: null,
        watchedWord: [],
        result: [],
        timeLeft: 1800,
        saveFolder: "no name",
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
        },
        minusTime(state) {
            state.timeLeft -= 1;
        },
        updateSaveFolder(
            state,
            { date, month, year, hours, minutes, seconds }
        ) {
            state.saveFolder = `${state.username}-${year}-${month}-${date}-${hours}-${minutes}-${seconds}`;
            console.log(state.saveFolder);
        },
        toggleIsAdmin(state) {
            state.isAdmin = !state.isAdmin;
        },
    },
    actions: {},
    modules: {},
});
