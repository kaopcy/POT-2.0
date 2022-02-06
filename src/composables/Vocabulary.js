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

// import category10 from "../assets/letterExample/category10_json.json";

export default class {
    constructor() {
        this.data = [];
        this.currentWord = 1;
        this.currentDifficult = 1;
        this.wordPool = [];

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

        // const curData = this.data[10].filter((element) => {
        //     const curVocab = element.slice(-1)[0].src.split("/")[2];
        //     return category10.includes(curVocab);
        // });

        // console.log(JSON.stringify(curData));
        const ilegal = ["ค", "ด", "น", "ผ", "ฝ", "พ", "ฟ", "ม"];
        let count = 0;
        this.data[6].forEach((element) => {
            const curConsonant = element.slice(0)[0].src.split("/")[1][0];
            const curVocab = element.slice(-1)[0].src.split("/")[2];

            if (ilegal.includes(curConsonant)) {
                console.log(curVocab);
                count += 1;
            }
        });
        console.log(count);
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

    clear = () => {
        this.data = null;
        this.currentDifficult = null;
    };
}
