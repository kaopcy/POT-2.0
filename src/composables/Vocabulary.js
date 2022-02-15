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
        return this.sortedBySpecialData.length;
    }

    word(type, index) {
        switch (type) {
            case "normal":
                return this.data[index];
            case "sorted":
                return this.sortedBySpecialData[index];
            default:
                return this.sortedBySpecialData[index];
        }
    }

    wordID(type, index) {
        switch (type) {
            case "normal":
                return (
                    this.data[index]
                        .slice(-1)[0]
                        .src.split("/")
                        .slice(-1)[0]
                        .split(".")[0] ?? ""
                );
            case "sorted":
                return (
                    this.sortedBySpecialData[index]
                        .slice(-1)[0]
                        .src.split("/")
                        .slice(-1)[0]
                        .split(".")[0] ?? ""
                );

            default:
                return (
                    this.sortedBySpecialData[index]
                        .slice(-1)[0]
                        .src.split("/")[2] ?? ""
                );
        }
    }

    //  Get list of data but sorted and special word come first
    // have 2 type
    // word: return just word list
    // raw: return entire word packet list
    sortedData = (type) => {
        switch (type) {
            case "word":
                return this.sortedBySpecialData.map(
                    (e) =>
                        e
                            .slice(-1)[0]
                            .src.split("/")
                            .slice(-1)[0]
                            .split(".")[0]
                );
            case "raw":
                return this.sortedBySpecialData;
            default:
                return "";
        }
    };

    // Get list of data
    // have 2 type
    // word: return just word list
    // raw: return entire word packet list
    normalData = (type) => {
        switch (type) {
            case "word":
                return this.data.map(
                    (e) =>
                        e
                            .slice(-1)[0]
                            .src.split("/")
                            .slice(-1)[0]
                            .split(".")[0]
                );
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

    deleteWord = (word) => {
        const normalIndex = this.normalData("word").findIndex(
            (e) => e === word
        );
        const sortedIndex = this.sortedData("word").findIndex(
            (e) => e === word
        );
        this.data.splice(normalIndex, 1);
        this.sortedBySpecialData.splice(sortedIndex, 1);
    };
}

export default class {
    constructor() {
        this.vocabData = [];
        this.checkingData = [];
        this.curWord = 1;
        this.curLevel = 1;
        this.wordPool = [];
        this.isSpecialWord = false;
        this.isEndPractice = false;

        this.init();
        this.setNewRandomWord();
    }

    init = () => {
        for (let i = 1; i <= 10; i++) {
            const json = require(`../assets/letter/level${i}.json`);
            this.vocabData[i] = new Vocab(json, i);
        }
    };

    get word() {
        return this.curWord;
    }
    get wordLength() {
        return this.curWord.length;
    }

    setNewRandomWord = () => {
        // init min max
        let min = 0;
        let max = this.vocabData[this.curLevel].length - 1;

        // if level is 4 to 7 start using isSpecialWord
        if (this.curLevel >= 4 && this.curLevel <= 7) {
            // toggle isSpecial
            this.isSpecialWord = !this.isSpecialWord;

            min = this.vocabData[this.curLevel].splitIndex;
            max = this.vocabData[this.curLevel].length - 1;
            if (this.isSpecialWord) {
                this.vocabData[this.curLevel].splitIndex -= 1;
                min = 0;
                max = this.vocabData[this.curLevel].splitIndex - 1;
            }
        }

        const index = Math.floor(Math.random() * (max - min)) + min;
        const wordToDelete = this.vocabData[this.curLevel].wordID(
            "sorted",
            index
        );

        // set current word and delete word from list
        this.curWord = this.vocabData[this.curLevel].word("sorted", index);
        this.vocabData[this.curLevel].deleteWord(wordToDelete);

        console.log(wordToDelete);
        console.log(this.vocabData[this.curLevel].sortedData("word"));

        if (!this.vocabData[this.curLevel].length) {
            this.isEndPractice = true;
        }
    };

    levelUp = (cb) => {
        if (this.curLevel < 10) {
            this.isSpecialWord = false;
            this.curLevel++;
        }
        if(cb){
            cb()
        }
    };

    checkToLevelup = (markTime, callback) => {
        if (markTime == 60 && this.curLevel == 2) {
            //level 1 => 2
            callback();
        } else if (markTime == 60 && this.curLevel == 3) {
            //level 2 => 3
            callback();
        } else if (markTime == 240 && this.curLevel == 4) {
            //level 3 => 4
            callback();
        } else if (markTime == 240 && this.curLevel == 5) {
            //level 4 => 5
            callback();
        } else if (markTime == 240 && this.curLevel == 6) {
            //level 5 => 6
            callback();
        } else if (markTime == 240 && this.curLevel == 7) {
            //level 6 => 7
            callback();
        } else if (markTime == 240 && this.curLevel == 8) {
            //level 7 => 8
            callback();
        } else if (markTime == 240 && this.curLevel == 9) {
            //level 8 => 9
            callback();
        }
    };

    clear = () => {
        this.vocabData = null;
        this.curLevel = null;
    };
}
