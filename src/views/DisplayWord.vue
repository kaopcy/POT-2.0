<template>
    <div class="display-word-wrapper">
        <div id="kumthai"></div>
        <div class="edit-btn" @click="back()">
            Back
        </div>
    </div>
</template>

<script>
import json1 from "../assets/letter/level1.json";
import json2 from "../assets/letter/level2.json";
import json3 from "../assets/letter/level3.json";
import json4 from "../assets/letter/level4.json";
import json5 from "../assets/letter/level5.json";
import json6 from "../assets/letter/level6.json";
import json7 from "../assets/letter/level7.json";
import json8 from "../assets/letter/level8.json";
import json9 from "../assets/letter/level9.json";
import json10 from "../assets/letter/level10.json";

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
            lowerLetter: ["ุ", "ู"],
            longLetter: ["ป", "ฬ", "ฝ", "ฟ"],
            textProperty: {
                letterSpacing: 60,
                fontSize: 250,
                textDelay: 500,
                wordDelay: 2000,
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
                opacity: "0",
            };

            for (let i = 0; i < this.currentWord.length; i++) {
                if (this.currentWord[i].char !== "") {
                    console.log(`datachar [${i}]: ${this.currentWord[i].char}`);
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
            for (let i = 0; i < temp.tempColor.length; i++) {
                // ถ้าตัวเองเป็น long letter
                if (this.longLetter.indexOf(temp.tempText[i]) !== -1) {
                    if (this.upperLetter.indexOf(temp.tempText[i + 1]) !== -1)
                        //ถ้าตัวหลังเป็น upper ให้ letter spacing = -60
                        this.innerText = this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize + i * 0.5}px; 
                        letter-spacing:${this.textProperty.letterSpacing *
                            -1}px;
                        opacity:${temp.opacity}%;
                        color:${temp.tempColor[i]};
                        "
                        id="text${i}";
                        >${temp.tempText[i]}</span>`);
                    else if (
                        this.lowerLetter.indexOf(temp.tempText[i + 1]) !== -1
                    )
                        //ถ้าตัวหลังเป็น lower ให้ letter spacing = 0
                        this.innerText = this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize + i * 0.5}px; 
                        letter-spacing:${this.textProperty.letterSpacing * 0}px;
                        opacity:${temp.opacity}%;
                        color:${temp.tempColor[i]};
                        "
                        id="text${i}";
                        >${temp.tempText[i]}</span>`);
                    //ถ้าตัวหลังไม่เป็น lower , upper ให้ letter spacing = 60
                    else
                        this.innerText = this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize + i * 0.5}px; 
                        letter-spacing:${this.textProperty.letterSpacing}px;
                        opacity:${temp.opacity}%;
                        color:${temp.tempColor[i]};
                        "
                        id="text${i}";
                        >${temp.tempText[i]}</span>`);
                }
                //ถ้าตัวเองหรือตัวหลังไม่เป็น Upper , Lower
                else if (
                    this.upperLetter.indexOf(temp.tempText[i]) === -1 ||
                    this.upperLetter.indexOf(temp.tempText[i - 1]) === -1
                ) {
                    //ถ้าตัวต่อไปไม่เป็น upper , lower
                    if (
                        this.upperLetter.indexOf(temp.tempText[i + 1]) === -1 &&
                        this.lowerLetter.indexOf(temp.tempText[i + 1]) === -1
                    ) {
                        if (
                            this.longLetter.indexOf(temp.tempText[i - 1]) !== -1
                        ) {
                            this.innerText = this.innerText
                                .concat(`<span style="
                            font-size:${this.textProperty.fontSize +
                                i * 0.5}px; 
                            letter-spacing:${this.textProperty.letterSpacing}px;
                            opacity:${temp.opacity}%;
                            color:${temp.tempColor[i]};
                            "
                            id="text${i}";
                            >${temp.tempText[i]}</span>`);
                        } else {
                            this.innerText = this.innerText
                                .concat(`<span style="
                            font-size:${this.textProperty.fontSize +
                                i * 0.5}px; 
                            letter-spacing:${this.textProperty.letterSpacing}px;
                            opacity:${temp.opacity}%;
                            color:${temp.tempColor[i]};
                            "
                            id="text${i}";
                            >${temp.tempText[i]}</span>`);
                        }
                    }
                    //ถ้าตัวต่อหลังเป็น uppercase และตัวเองก็เป็น uppercase เหมือนกัน ให้ตัวเองมี letter space เป็น 0 เช่น มั่ว จั่ว ติ๋ม
                    else
                        this.innerText = this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize + i * 0.5}px; 
                        letter-spacing:${this.textProperty.letterSpacing * 0}px;
                        opacity:${temp.opacity}%;
                        color:${temp.tempColor[i]}
                        "
                        id="text${i}";
                        >${temp.tempText[i]}</span>`);
                } else {
                    if (this.longLetter.indexOf(temp.tempText[i - 2]) !== -1)
                        this.innerText = this.innerText.concat(`<sup style="
                            font-size:${this.textProperty.fontSize + 0.5}px; 
                            letter-spacing:${this.textProperty.letterSpacing *
                                2}px;
                            opacity:${temp.opacity}%;
                            color:${temp.tempColor[i]}
                            "
                            id="text${i}";
                            >${temp.tempText[i]}</sup>`);
                    else
                        this.innerText = this.innerText.concat(`<sup style="
                            font-size:${this.textProperty.fontSize + 0.5}px; 
                            letter-spacing:${this.textProperty.letterSpacing}px;
                            opacity:${temp.opacity}%;
                            color:${temp.tempColor[i]}
                            "
                            id="text${i}";
                            >${temp.tempText[i]}</sup>`);
                }
            }

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

        startVoice(char) {
            this.voice.src = this.currentWord[char].src ?? "";
            this.voice.play();
            this.handleInnerText(char);
        },

        back() {
            this.$router.push({ name: "Edit" });
        },
    },

    mounted() {
        let char = 0;
        this.startVoice(char);
        this.innerText = "";

        this.voice.addEventListener("error", () => {
            console.log(`char: ${char}`);
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
            }, this.textProperty.textDelay);
        });

        window.addEventListener("keyup", (event) => {
            if (event.code === "KeyR") {
                char = 0;
                this.startVoice(char);
                this.clearInnerText();
            }
        });
    },

    created() {
        this.data[1] = json1;
        this.data[2] = json2;
        this.data[3] = json3;
        this.data[4] = json4;
        this.data[5] = json5;
        this.data[6] = json6;
        this.data[7] = json7;
        this.data[8] = json8;
        this.data[9] = json9;
        this.data[10] = json10;

        const wordID = this.$route.params.id;

        this.data.forEach((list) => {
            list.forEach((word) => {
                const curWord = word
                    .slice(-1)[0]
                    .src.split("/")
                    .slice(-1)[0]
                    .split(".")[0];
                if (curWord == wordID) {
                    this.currentWord = word;
                }
            });
        });
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
