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
        updateResult(state, { level, word, time , backspace }) {
            const oldData = state.result[level];
            if (!oldData)
                state.result[level] = [{ word, time, unit: 'หน่วย' , backspace: 'backspace'}];
            else
                state.result[level] = [
                    ...oldData,
                    { word, time, unit: "วินาที" , backspace },
                ];
        },
        minusTime(state) {
            state.timeLeft -= 1;
        },
        updateSaveFolder(
            state,
            { date, month, year, hours, minutes, seconds }
        ) {
            state.saveFolder = `${state.username}-${year}-${month}-${date}-${hours}-${minutes}-${seconds}`;
        },
        toggleIsAdmin(state) {
            state.isAdmin = !state.isAdmin;
            console.log(`Admin: ${state.isAdmin}`);
        },
    },
    actions: {},
    modules: {},
});
