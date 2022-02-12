class Vocab {
    constructor(data, level) {
        this.data = data;
        this.sortedBySpecialData = [];
        this.level = level;
        this.splitIndex = null;
        this.#initialDoubleWord();
        this.#initialSpecialWord();
    }

    #initialDoubleWord = () => {
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

        this.data.forEach((wordPacket) => {
            const curVocab = wordPacket.slice(-1)[0].src.split("/")[2];
            const doubleWord = checkDoubleWord(wordPacket);
            if (doubleWord) {
                doubleWord.forEach((e) => {
                    wordPacket.splice(-1, 0, {
                        char: "",
                        color: "",
                        src: `sound/category${this.level}/${curVocab}/${e}.mp3`,
                        swap: 0,
                        delay: 0,
                    });
                });
            }
        });
    };

    #initialSpecialWord = () => {
        const ilegal = ["ค", "ด", "น", "ผ", "ฝ", "พ", "ฟ", "ม"];
        const specialWordList = [];
        const normalWordList = [];
        let count = 0;
        this.data.forEach((wordPacket) => {
            const curConsonant = wordPacket.slice(0)[0].char;
            if (ilegal.includes(curConsonant)) {
                specialWordList.push(wordPacket);
                count += 1;
            } else {
                normalWordList.push(wordPacket);
            }
        });
        this.splitIndex = count;
        this.sortedBySpecialData = [...specialWordList, ...normalWordList];
    };

    get length() {
        return this.data.length;
    }

    word(index) {
        return this.data[index];
    }

    wordLength(index) {
        return this.data[index].length;
    }

    wordID(index) {
        return (
            this.sortedBySpecialData[index].slice(-1)[0].src.split("/")[2] ?? ""
        );
    }

    sortedData = (type) => {
        switch (type) {
            case "word":
                return this.sortedBySpecialData.map(
                    (e) => e.slice(-1)[0].src.split("/")[2]
                );
            case "raw":
                return this.sortedBySpecialData;
            default:
                return "";
        }
    };

    normalData = (type) => {
        switch (type) {
            case "word":
                return this.data.map((e) => e.slice(-1)[0].src.split("/")[2]);
            case "raw":
                return this.data;
            default:
                return "";
        }
    };

    // return the list of special word
    specialWordList = (type) => {
        return this.sortedData(type).slice(0, this.splitIndex);
    };
    
    // return the list of normal word
    normalWordList = (type) => {
        return this.sortedData(type).slice(this.splitIndex);
    };
}

export default class {
    constructor() {
        this.vocabData = [];
        this.checkingData = [];
        this.curWord = 1;
        this.curLevel = 8;
        this.wordPool = [];

        this.init();
        this.setNewRandomWord();
    }

    init = () => {
        // initial every data
        for (let i = 1; i <= 10; i++) {
            const json = require(`../assets/letter/level${i}.json`);
            this.vocabData[i] = new Vocab(json, i);
        }
        console.log(this.vocabData[7].sortedData("word"));
        console.log(this.vocabData[7].normalData("word"));
        console.log(this.vocabData[7].specialWordList("word"));
        console.log(this.vocabData[7].normalWordList("word"));
    };

    get word() {
        return this.vocabData[this.curLevel].word(this.curWord);
    }
    get wordLength() {
        return this.vocabData[this.curLevel].wordLength(this.curWord);
    }

    setNewRandomWord = () => {
        let min = 0;
        let max = this.vocabData[this.curLevel].length - 1;
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
        this.curWord = i;
    };

    levelUp = () => {
        if (this.curLevel < 10) {
            this.curLevel++;
            this.wordPool = [];
        }
    };

    checkToLevelup = (markTime, callback) => {
        if (markTime == 10 && this.curLevel == 2) {
            //level 1 => 2
            this.levelUp();
            callback();
        } else if (markTime == 10 && this.curLevel == 3) {
            //level 2 => 3
            this.levelUp();
            callback();
        } else if (markTime == 240 && this.curLevel == 4) {
            //level 3 => 4
            this.levelUp();
            callback();
        } else if (markTime == 240 && this.curLevel == 5) {
            //level 4 => 5
            this.levelUp();
            callback();
        } else if (markTime == 240 && this.curLevel == 6) {
            //level 5 => 6
            this.levelUp();
            callback();
        } else if (markTime == 240 && this.curLevel == 7) {
            //level 6 => 7
            this.levelUp();
            callback();
        } else if (markTime == 240 && this.curLevel == 8) {
            //level 7 => 8
            this.levelUp();
            callback();
        } else if (markTime == 240 && this.curLevel == 9) {
            //level 8 => 9
            this.levelUp();
            callback();
        }
    };

    clear = () => {
        this.vocabData = null;
        this.curLevel = null;
    };
}
