<template>
    <div class="learn" id="learn">
        <div id="time">
            <TimerComponent :time="$store.state.timeLeft" />
            <div class="text-container difficult-wrapper">
                <div class="difficult">ความยาก: {{ myVocab.curLevel }}</div>
            </div>
            <div class="text-container username-container">
                ชื่อ: {{ $store.state.username }}
            </div>
            <div
                class="text-container end-container"
                @click="$router.replace({ name: 'EndScore' })"
            >
                end
            </div>
        </div>
        <!-- showing text -->
        <div id="kumthai"></div>
        <img src="../assets/voice.png" class="voice-img" v-if="voiceImg" />
    </div>
</template>

<script>
import Vocaburaly from "../composables/Vocabulary.js";
import TimerComponent from "../components/TimerComponent.vue";
import WordTimer from "../composables/wordTimer";
import Recorder from "../composables/Recorder/recorder";

export default {
    name: "Learn",
    components: {
        TimerComponent,
    },

    props: {
        attempts: { type: Number },
        time: { type: Number },

        bitRate: { type: Number, default: 128 },
        sampleRate: { type: Number, default: 44100 },

        micFailed: { type: Function },
        beforeRecording: { type: Function },
        pauseRecording: { type: Function },
        afterRecording: { type: Function },
    },

    data() {
        return {
            myVocab: null,
            level: null,
            wordName: null,
            isListenKeyDown: false,
            isListenKeyUp: false,
            // text property
            innerText: "",
            toneLetter: ["่", "้", "๊", "๋"],
            upperLetter: [
                "่",
                "้",
                "๊",
                "๋",
                "ิ",
                "ี",
                "ึ",
                "ื",
                "ั",
                "ํ",
                "็",
                "์",
            ],
            lowerLetter: ["ุ", "ู"],
            longLetter: ["ป", "ฬ", "ฝ", "ฟ"],
            textProperty: {
                letterSpacing: 60,
                fontSize: 230,
                textDelay: 500,
                wordDelay: 2000,
            },

            // voice
            voiceImg: false,
            voice: new Audio(),

            // Event
            onVoiceError: null,
            onVoiceEnd: null,
            onKeyDown: null,
            onKeyUp: null,

            // Timeout
            characterTimeout: null,
            wordTimeout: null,
            idleTimeout: null,
            mouseIdleTimeout: null,

            // interval
            wordTimer: null,
            categoryTimer: null,
            timerInterval: null,

            // Sound recording variable
            isRecord: false,
            recorder: this._initRecorder(),
            recordList: [],
            saveId: 0,
        };
    },

    computed: {
        attemptsLeft() {
            return this.attempts - this.recordList.length;
        },
        iconButtonType() {
            return this.isRecording && this.isPause
                ? "mic"
                : this.isRecording
                ? "pause"
                : "mic";
        },
        isPause() {
            return this.recorder.isPause;
        },
        isRecording() {
            return this.recorder.isRecording;
        },
    },

    methods: {
        handleInnerText(character) {
            let sequence = 0;
            let temp = {
                tempText: [],
                tempColor: [],
                tempSwap: [],
                tempSequence: [],
                tempSequenceSwap: [],
            };

            for (let i = 0; i < this.myVocab.wordLength; i++) {
                if (this.myVocab.word[i].char !== "") {
                    temp.tempText.push(this.myVocab.word[i].char);
                    temp.tempColor.push(this.myVocab.word[i].color);
                    temp.tempSwap.push(this.myVocab.word[i].swap);
                    temp.tempSequence.push(sequence);
                    sequence++;
                    temp.tempSequenceSwap.push(0);
                } else {
                    temp.tempSequenceSwap.push(-1);
                }
            }

            for (let i = 0; i < temp.tempColor.length; i++) {
                if (temp.tempSwap[i] != 0) {
                    let swap = temp.tempSwap[i];
                    let temptemp = temp.tempSequence[i - swap];
                    temp.tempText.splice(i - swap, 0, temp.tempText[i]);
                    temp.tempColor.splice(i - swap, 0, temp.tempColor[i]);
                    temp.tempSequence.splice(i - swap, 1);
                    temp.tempText.splice(i + 1, 1);
                    temp.tempColor.splice(i + 1, 1);
                    temp.tempSequence.splice(i, 0, temptemp);
                }
            }

            for (let i = 0; i < temp.tempSequenceSwap.length; i++) {
                if (temp.tempSequenceSwap[i] == -1) {
                    temp.tempSequence.splice(i, 0, -1);
                }
            }

            // * Checking character type
            for (let i = 0; i < temp.tempColor.length; i++) {
                // ป่าว ฝ้า ฟ้าผ่า
                if (
                    this.longLetter.includes(temp.tempText[i - 1]) &&
                    this.upperLetter.includes(temp.tempText[i]) &&
                    !this.upperLetter.includes(temp.tempText[i + 1])
                ) {
                    this.appendInnerText({
                        id: i,
                        mul: 2,
                        color: temp.tempColor[i],
                        text: temp.tempText[i],
                    });
                    continue;
                }

                if (
                    this.longLetter.includes(temp.tempText[i - 2]) &&
                    this.lowerLetter.includes(temp.tempText[i - 1]) &&
                    this.upperLetter.includes(temp.tempText[i]) &&
                    !this.upperLetter.includes(temp.tempText[i + 1])
                ) {
                    this.appendInnerText({
                        id: i,
                        mul: 2,
                        color: temp.tempColor[i],
                        text: temp.tempText[i],
                    });
                    continue;
                }

                if (
                    this.longLetter.includes(temp.tempText[i - 1]) &&
                    this.lowerLetter.includes(temp.tempText[i]) &&
                    this.toneLetter.includes(temp.tempText[i + 1])
                ) {
                    this.appendInnerText(
                        {
                            id: i,
                            mul: 0,
                            color: temp.tempColor[i],
                            text: temp.tempText[i],
                        },
                        `margin-right:${this.textProperty.letterSpacing *
                            -1}px;`
                    );
                    continue;
                }

                // ถ้าตัวเองเป็น long letter
                if (this.longLetter.includes(temp.tempText[i])) {
                    if (this.upperLetter.includes(temp.tempText[i + 1])) {
                        this.appendInnerText({
                            id: i,
                            mul: -1,
                            color: temp.tempColor[i],
                            text: temp.tempText[i],
                        });
                        continue;
                    }
                    //ถ้าตัวหลังเป็น lower ให้ letter spacing = 0
                    else if (this.lowerLetter.includes(temp.tempText[i + 1])) {
                        this.appendInnerText({
                            id: i,
                            mul: 0,
                            color: temp.tempColor[i],
                            text: temp.tempText[i],
                        });
                        continue;
                    } else {
                        this.appendInnerText({
                            id: i,
                            color: temp.tempColor[i],
                            text: temp.tempText[i],
                        });
                        continue;
                    }
                }
                //ถ้าตัวเองหรือตัวหลังไม่เป็น Upper , Lower
                else if (
                    !this.upperLetter.includes(temp.tempText[i]) ||
                    !this.upperLetter.includes(temp.tempText[i - 1])
                ) {
                    //ถ้าตัวต่อไปไม่เป็น upper , lower
                    if (
                        !this.upperLetter.includes(temp.tempText[i + 1]) &&
                        !this.lowerLetter.includes(temp.tempText[i + 1])
                    ) {
                        this.appendInnerText({
                            id: i,
                            color: temp.tempColor[i],
                            text: temp.tempText[i],
                        });
                        continue;
                    } else {
                        this.appendInnerText({
                            id: i,
                            mul: 0,
                            color: temp.tempColor[i],
                            text: temp.tempText[i],
                        });
                        continue;
                    }
                } else {
                    if (this.longLetter.includes(temp.tempText[i - 2])) {
                        this.appendInnerText({
                            id: i,
                            mul: 2,
                            color: temp.tempColor[i],
                            type: "sup",
                            text: temp.tempText[i],
                        });
                        continue;
                    } else {
                        this.appendInnerText({
                            id: i,
                            color: temp.tempColor[i],
                            type: "sup",
                            text: temp.tempText[i],
                        });
                        continue;
                    }
                }
            }

            this.wordName = temp.tempText.join("");

            // set text opacity to 1
            document.getElementById("kumthai").innerHTML = this.innerText;
            for (let i = 0; i < character + 1; i++) {
                if (temp.tempSequence[i] != -1) {
                    document.getElementById(
                        `text${temp.tempSequence[i]}`
                    ).style.opacity = "1";
                }
            }
        },

        appendInnerText({ id, mul, color, type, text }, option) {
            this.innerText = this.innerText.concat(`<${type ?? "span"} style="
                font-size:${this.textProperty.fontSize + id * 0.5}px; 
                letter-spacing:${this.textProperty.letterSpacing *
                    (mul ?? 1)}px;
                opacity:${0}%;
                color:${color};
                ${option ?? ""}
                "
                id="text${id}";
                >${text}</${type ?? "span"}>`);
        },

        start() {
            let char = 0;
            this.isListenKeyDown = false;
            this.isListenKeyUp = false;
            this.startVoice(char);
            this.innerText = "";
            this.stopRecorder();

            const nextWord = () => {
                //* Next word
                this.isListenKeyDown = false;
                this.isListenKeyUp = false;
                this.wordTimer = new WordTimer();
                document.getElementById("kumthai").innerHTML = "+";
                this.wordTimeout = setTimeout(() => {
                    // check if vocab pass practice state
                    this.myVocab.setNewRandomWord();
                    char = 0;
                    this.startVoice(char);
                    this.innerText = "";
                }, this.textProperty.wordDelay);
            };

            const handleIdle = () => {
                this.idleTimeout = setTimeout(() => {
                    this.isListenKeyDown = false;
                    this.isListenKeyUp = false;
                    this.stopRecorder();
                    if (this.isRecord) this.isRecord = false;
                    this.voiceImg = false;
                    if (this.myVocab.isEmpty)
                        this.$router.push({ name: "Learn", params: { id: 2 } });
                    nextWord();
                }, 5000);
            };

            this.onVoiceError = () => {
                if (!this.myVocab.word[char + 1]) {
                    this.isListenKeyDown = true;
                    handleIdle();
                } else {
                    char++;
                    this.startVoice(char);
                    this.innerText = "";
                }
            };

            this.onVoiceEnd = () => {
                let curDelay = undefined;
                if (
                    this.myVocab.word[char] &&
                    this.myVocab.word[char].delay === 0
                ) {
                    curDelay = this.myVocab.word[char].delay;
                }

                this.characterTimeout = setTimeout(() => {
                    if (!this.myVocab.word[char + 1]) {
                        this.isListenKeyDown = true;
                        handleIdle();
                    } else {
                        char++;
                        this.startVoice(char);
                        this.innerText = "";
                    }
                }, curDelay ?? this.textProperty.textDelay);
            };

            this.onKeyDown = (event) => {
                if (event.code === "Space") {
                    const isBreak =
                        document.getElementById("kumthai").innerHTML === "+";
                    if (
                        this.isListenKeyDown &&
                        !this.isListenKeyUp &&
                        !isBreak
                    ) {
                        clearTimeout(this.idleTimeout);
                        this.voiceImg = true;
                        // Start sound record here.....
                        this.turnRecord();
                        // =============================
                        this.isListenKeyDown = false;
                        this.isListenKeyUp = true;
                    }
                }
            };

            this.onKeyUp = (event) => {
                if (event.code === "Space" && this.isListenKeyUp) {
                    this.stopRecorder(this.wordName);
                    if (this.isRecord) this.isRecord = false;
                    this.isListenKeyDown = false;
                    this.isListenKeyUp = false;
                    this.voiceImg = false;
                    //Score up
                    this.$store.commit("LearnScoreUp");
                    if (this.wordTimer) {
                        console.log(this.wordTimer.deltaTime);
                        this.$store.commit("updateResult", {
                            level: this.myVocab.curLevel,
                            word: this.wordName,
                            time: this.wordTimer.deltaTime,
                        });
                    }
                    // End sound record here.....
                    // =============================
                    if (this.myVocab.isEmpty)
                        this.$router.push({ name: "Learn", params: { id: 2 } });
                    nextWord();
                }

                if (event.code === "KeyR") {
                    clearTimeout(this.idleTimeout);
                    char = 0;
                    this.startVoice(char);
                    this.innerText = "";
                }
            };

            this.voice.addEventListener("error", this.onVoiceError);
            this.voice.addEventListener("ended", this.onVoiceEnd);
            window.addEventListener("keypress", this.onKeyDown);
            window.addEventListener("keyup", this.onKeyUp);
        },

        startVoice(char) {
            this.voice.src = this.myVocab.word[char].src ?? "";
            this.voice.play();
            this.handleInnerText(char);
        },

        _initRecorder() {
            return new Recorder({
                beforeRecording: this.beforeRecording,
                afterRecording: this.afterRecording,
                pauseRecording: this.pauseRecording,
                micFailed: this.micFailed,
                bitRate: this.bitRate,
                sampleRate: this.sampleRate,
                format: this.format,
            });
        },

        stopRecorder(filename) {
            if (!this.isRecording) {
                return;
            }

            this.recorder.stop();
            console.log("stopRecorder");

            if (!filename) {
                return;
            }
            this.recordList = this.recorder.recordList();
            const blob = this.recorder.recordList()[this.saveId].blob;

            // * save file to desktop.
            window.saveBlob(
                blob,
                filename,
                this.level,
                this.$store.state.saveFolder
            );
            this.saveId++;
        },

        turnRecord() {
            if (!this.isRecording && !this.isRecord) {
                console.log("toggleRecorder");
                if (
                    this.attempts &&
                    this.recorder.records.length >= this.attempts
                ) {
                    return;
                }

                if (!this.isRecording) {
                    this.recorder.start();
                    this.isRecord = true;
                }
            }
        },
    },

    created() {
        this.level = parseInt(this.$route.params.id);
        this.myVocab = new Vocaburaly(this.level);

        // initial category timer
        switch (this.level) {
            case 1:
                this.categoryTimer = 500;
                break;
            case 2:
                this.categoryTimer = 60;
                break;
            case 3:
                this.categoryTimer = 60;
                break;
            case 4:
                this.categoryTimer = 240;
                break;
            case 5:
                this.categoryTimer = 240;
                break;
            case 6:
                this.categoryTimer = 240;
                break;
            case 7:
                this.categoryTimer = 240;
                break;
            case 8:
                this.categoryTimer = 240;
                break;
            case 9:
                this.categoryTimer = 240;
                break;
            case 10:
                this.categoryTimer = 240;
                break;

            default:
                break;
        }
    },

    watch: {
        isListenKeyDown: function() {
            console.log(`listen down: ${this.isListenKeyDown}`);
        },
        isListenKeyUp: function() {
            console.log(`listen up: ${this.isListenKeyUp}`);
        },
    },

    mounted() {
        // add idle listener
        const handleIdle = () => {
            document.onmousemove = function() {
                document.getElementById("time").style.opacity = "1";
                clearTimeout(this.mouseIdleTimeout);
                this.mouseIdleTimeout = setTimeout(function() {
                    document.getElementById("time").style.opacity = "0";
                }, 1500);
            };
        };

        // always delay before start
        document.getElementById("kumthai").innerHTML = "+ ";
        setTimeout(() => {
            this.wordTimer = new WordTimer();
            this.start();
            handleIdle();
        }, 2000);

        // set timer interval
        if (this.level != 1) {
            this.timerInterval = setInterval(() => {
                this.$store.commit("minusTime");
                this.categoryTimer -= 1;

                // next category
                if (this.categoryTimer <= 0) {
                    this.stopRecorder();
                    if (this.level < 10) {
                        this.$router.replace({
                            name: "Learn",
                            params: { id: this.level + 1 },
                        });
                    } else {
                        this.$router.replace({ name: "EndScore" });
                    }
                }
            }, 1000);
        }
    },

    beforeDestroy() {
        // clear all eventlistener
        this.voice.removeEventListener("error", this.onVoiceError);
        this.voice.removeEventListener("ended", this.onVoiceEnd);
        window.removeEventListener("keypress", this.onKeyDown);
        window.removeEventListener("keyup", this.onKeyUp);
        document.onmousemove = null;

        // clear all timeout
        clearTimeout(this.characterTimeout);
        clearTimeout(this.wordTimeout);
        clearTimeout(this.idleTimeout);
        clearTimeout(this.mouseIdleTimeout);

        // clear all interval
        clearInterval(this.timerInterval);

        // reset voice
        this.voice.pause();
        this.voice = new Audio();
        this.innerText = "";
    },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap");
@font-face {
    font-family: "Poppin";
    src: url("../assets/font/Poppins-Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}

.learn {
    padding: 0;
    margin: 0;
    font-family: "Sarabun", sans-serif !important;
    font-size: 250px;
    letter-spacing: 30px;
    position: absolute;
    inset: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    transition: 0.5s all;
    overflow: hidden;

    #time {
        opacity: 0;
        transition: 0.5s opacity;
        position: absolute;
        right: 1rem;
        bottom: 1rem;
        display: flex;
        gap: 1rem;
    }

    .username-container {
        position: relative;
    }

    .end-container {
        position: relative;
        background: rgb(255, 62, 62);
        color: #fff;
        cursor: pointer;
        font-weight: 600;
        &:hover {
            background: rgb(255, 31, 31);
        }
    }

    .difficult-wrapper {
        position: relative;
        display: flex;
        flex-direction: row;
        font-family: "Poppin", sans-serif;
        align-items: center;
        font-size: 2rem;
        font-weight: 500;
        background-color: #fff;
        border: 1.5px solid rgb(209, 209, 209);
        border-radius: 8px;
        padding: 0.3rem 1rem;
        gap: 0.5rem;
        .difficult {
            letter-spacing: 0px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
                "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
                "Helvetica Neue", sans-serif;
            font-weight: normal;
            font-size: 1rem;
        }
        .plus-difficult {
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: 0;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            cursor: pointer;
            background-color: rgb(250, 62, 62);
            color: #fff;
            transition: 0.25s background-color;
            &:hover {
                background-color: rgb(255, 0, 0);
            }
        }
    }

    .btn-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .btn {
            font-family: "Poppin";
            text-align: center;
            z-index: 2;
            padding: 0;
            margin: 0;
            cursor: pointer;
        }
    }

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        #plus {
            font-size: 100px;
        }
    }

    .voice-img {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: auto;
        bottom: 3rem;
        border-radius: 50%;
    }

    @keyframes moving-text {
        0% {
            opacity: 0;
        }
        30% {
            opacity: 100%;
        }
        70% {
            opacity: 100%;
        }
        100% {
            opacity: 0;
        }
    }
}
</style>
