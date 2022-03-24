<template>
    <div class="display-word-wrapper">
        <div id="kumthai"></div>
        <!-- <div class="edit-btn" @click="back()">
            Back
        </div> -->
    </div>
</template>

<script>
export default {
    name: "DisplayWord",
    data() {
        return {
            data: [],
            currentWord: [],
            innerText: "",
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
            toneLetter: ["่", "้", "๊", "๋"],
            lowerLetter: ["ุ", "ู"],
            longLetter: ["ป", "ฬ", "ฝ", "ฟ"],
            textProperty: {
                letterSpacing: 60,
                fontSize: 230,
                // textDelay: 500,
                textDelay: 0,
            },
            delayAfterWord: 500,
            voice: new Audio(),
        };
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

            for (let i = 0; i < this.currentWord.length; i++) {
                if (this.currentWord[i].char !== "") {
                    temp.tempText.push(this.currentWord[i].char);
                    temp.tempColor.push(this.currentWord[i].color);
                    temp.tempSwap.push(this.currentWord[i].swap);
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

            // set text opacity to 1
            document.getElementById("kumthai").innerHTML = this.innerText;
            const _lastChildIndex =
                document.getElementById("kumthai").childElementCount - 1;
            const lastChild = document.getElementById("kumthai").children[
                _lastChildIndex
            ];
            if (lastChild.innerHTML.length == 1) {
                document.getElementById("kumthai").children[
                    _lastChildIndex
                ].style.letterSpacing = "0";
                document.getElementById("kumthai").children[
                    _lastChildIndex
                ].style.marginRight = "0";
            }

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

        startVoice(char) {
            console.log(this.currentWord[char].src ?? "");
            this.voice.src = this.currentWord[char].src ?? "";
            this.voice.play();
            this.handleInnerText(char);
        },
    },

    mounted() {
        let char = 0;
        this.startVoice(char);
        this.innerText = "";

        this.voice.addEventListener("error", () => {
            if (!this.currentWord[char + 1]) {
                console.log("ended");
                setTimeout(() => {
                    this.$router.go(-1);
                }, this.delayAfterWord);
            } else {
                char++;
                this.startVoice(char);
                this.innerText = "";
            }
        });

        this.voice.addEventListener("ended", () => {
            let curDelay = undefined;
            // console.log(this.currentWord[char].delay);
            if (this.currentWord[char] && this.currentWord[char].delay === 0) {
                curDelay = this.currentWord[char].delay;
                console.log("delay la isas");
            }
            setTimeout(() => {
                if (!this.currentWord[char + 1]) {
                    console.log("ended");
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, this.delayAfterWord);
                } else {
                    char++;
                    this.startVoice(char);
                    this.innerText = "";
                }
            }, curDelay ?? this.textProperty.textDelay);
        });
    },

    created() {
        this.data = [];
        for (let i = 1; i <= 10; i++) {
            console.log("init new");
            const json = require(`../assets/letter/level${i}.json`);
            this.data[i] = json.map((e) => e.slice());
        }
        console.log( this.$route.params.id.split("-"));
        const [wordID, wordCategory] = this.$route.params.id.split("-");
        console.log(wordID);
        console.log(wordCategory);
        this.data[parseInt(wordCategory)].forEach((word) => {
            const curWord = word
                .slice(-1)[0]
                .src.split("/")
                .slice(-1)[0]
                .split(".")[0];
            if (curWord == wordID) {
                this.currentWord = word;
            }
        });

        const checkDoubleWord = (wordPacket) => {
            const filterBySound = [];
            wordPacket.slice(0, -1).forEach((element) => {
                if (element.src.includes("sound")) {
                    const currentSoundName = element.src
                        .split("/")
                        .slice(-1)[0]
                        .slice(0, -4);
                    const duplicateIndex = filterBySound.findIndex(
                        (e) => e === currentSoundName
                    );
                    if (duplicateIndex !== -1) {
                        filterBySound.splice(duplicateIndex, 1);
                    } else {
                        filterBySound.push(currentSoundName);
                    }
                }
            });
            if (filterBySound.length > 0) {
                return filterBySound;
            }
            return null;
        };

        const doubleWord = checkDoubleWord(this.currentWord);
        if (doubleWord) {
            doubleWord.forEach((e) => {
                this.currentWord.splice(-1, 0, {
                    char: "",
                    color: "",
                    src: `sound/category${parseInt(wordCategory)}/${wordID}/${e}.mp3`,
                    swap: 0,
                    delay: 0,
                });
            });
            // this.currentWord.splice(-1, 1);
        }
        console.log(this.currentWord);
    },

    beforeDestroy() {
        this.voice.pause();
        this.voice = new Audio();
        this.innerText = "";
    },
};
</script>

<style lang="scss" scoped>
.display-word-wrapper {
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
}

.edit-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 1rem 2rem;
    font-size: 2rem;
    font-weight: bold;
    background-color: #fff;
    margin: 2rem;
    border-radius: 1rem;
    cursor: pointer;
}
</style>
