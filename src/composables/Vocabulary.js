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

import category4 from "../assets/letterExample/category4_json.json";
import category5 from "../assets/letterExample/category5_json.json";
import category6 from "../assets/letterExample/category6_json.json";
import category7 from "../assets/letterExample/category7_json.json";
import category8 from "../assets/letterExample/category8_json.json";
import category9 from "../assets/letterExample/category9_json.json";
import category10 from "../assets/letterExample/category10_json.json";

export default class {
    constructor() {
        this.data = [];
        this.checkingData = [];
        this.currentWord = 1;
        this.currentDifficult = 8;
        this.wordPool = [];
        this.specialWord = [];
        this.initialState();
        this.setNewRandomWord();
    }

    initialState = () => {
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

        this.checkingData[4] = category4;
        this.checkingData[5] = category5;
        this.checkingData[6] = category6;
        this.checkingData[7] = category7;
        this.checkingData[8] = category8;
        this.checkingData[9] = category9;
        this.checkingData[10] = category10;

        // const curData = this.data[10].filter((element) => {
        //     const curVocab = element.slice(-1)[0].src.split("/")[2];
        //     return category10.includes(curVocab);
        // });

        // console.log(JSON.stringify(curData));

        // const checkingIndex = 8; //ใช้เช็คหมวด
        //! สำหรับเช็ค illegal word
        // const ilegal = ["ค", "ด", "น", "ผ", "ฝ", "พ", "ฟ", "ม"];
        // let count = 0
        // this.data[checkingIndex].forEach((element) => {
        //     const curConsonant = element.slice(0)[0].src.split("/")[1][0];
        //     const curVocab = element.slice(-1)[0].src.split("/")[2];
        //     if (ilegal.includes(curConsonant)) {
        //         console.log(`Vocab: ${curVocab} Consonmant: ${curConsonant}`);
        //         count++
        //     }
        // });
        // console.log(count);

        //! สำหรับเช็ค missed word
        // this.data[checkingIndex].forEach((element) => {
        //     const curVocab = element.slice(-1)[0].src.split("/")[2];
        //     if (!this.checkingData[checkingIndex].includes(curVocab)) {
        //         console.log(curVocab);
        //     }
        // });
        // this.checkingData[checkingIndex].forEach((element) => {
        //     const curCategory = this.data[checkingIndex].map(
        //         (el) => el.slice(-1)[0].src.split("/")[2]
        //     );
        //     if (!curCategory.includes(element)) {
        //         console.log(element);
        //     }
        // });

        // ! สำหรับเช็ค sound word file
        this.data.forEach((curCategory , index) => {
            curCategory.forEach((wordPacket) => {
                const curVocab = wordPacket.slice(-1)[0].src.split("/")[2];
                const doubleWord = this.checkDoubleWord(wordPacket);
                if (doubleWord) {
                    doubleWord.forEach((e) => {
                        wordPacket.splice(-1 , 0 ,{
                            char: "",
                            color: "",
                            src: `sound/category${index}/${curVocab}/${e}.mp3`,
                            swap: 0,
                            delay: 0,
                        });
                    });
                }
            });
        });
    };

    get word() {
        return this.data[this.currentDifficult][this.currentWord];
    }
    get wordLength() {
        return this.data[this.currentDifficult][this.currentWord].length;
    }

    setNewRandomWord = () => {
        let min = 0;
        let max = this.data[this.currentDifficult].length - 1;
        var i = Math.floor(Math.random() * (max - min)) + min;
        for (let j = 0; j < this.wordPool.length; ) {
            if (i === this.wordPool[j]) {
                i = Math.floor(Math.random() * (max - min)) + min;
                j = 0;
            } else {
                j++;
            }
        }
        this.wordPool.push(i);
        this.currentWord = i;
    };

    levelUp = () => {
        if (this.currentDifficult < 10) {
            this.currentDifficult++;
            this.wordPool = [];
        }
    };

    checkToLevelup = (markTime, callback) => {
        if (markTime == 10 && this.currentDifficult == 2) {
            //level 1 => 2
            this.levelUp();
            callback();
        } else if (markTime == 10 && this.currentDifficult == 3) {
            //level 2 => 3
            this.levelUp();
            callback();
        } else if (markTime == 240 && this.currentDifficult == 4) {
            //level 3 => 4
            this.levelUp();
            callback();
        } else if (markTime == 240 && this.currentDifficult == 5) {
            //level 4 => 5
            this.levelUp();
            callback();
        } else if (markTime == 240 && this.currentDifficult == 6) {
            //level 5 => 6
            this.levelUp();
            callback();
        } else if (markTime == 240 && this.currentDifficult == 7) {
            //level 6 => 7
            this.levelUp();
            callback();
        } else if (markTime == 240 && this.currentDifficult == 8) {
            //level 7 => 8
            this.levelUp();
            callback();
        } else if (markTime == 240 && this.currentDifficult == 9) {
            //level 8 => 9
            this.levelUp();
            callback();
        }
    };

    checkDoubleWord = (wordPacket) => {
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

    clear = () => {
        this.data = null;
        this.currentDifficult = null;
    };
}
