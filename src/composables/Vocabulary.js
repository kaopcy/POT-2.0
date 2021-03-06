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
                wordPacket.splice(-1, 1);
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

    wordIDByRawData(rawdata) {
        return (
            rawdata
                .slice(-1)[0]
                .src.split("/")
                .slice(-1)[0]
                .split(".")[0] ?? ""
        );
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
    constructor(level) {
        this.vocabData = null;
        this.checkingData = [];
        this.curWord = null;
        this.curLevel = level;
        this.wordPool = [];
        this.isSpecialWord = false;
        this.isEndPractice = false;
        this.curWordID = null;

        this.specialCharacterList = ["ค", "ด", "น", "ผ", "ฝ", "พ", "ฟ", "ม"];

        this._init();
        this.setNewRandomWord();
    }

    _init = () => {
        const json = require(`../assets/letter/level${this.curLevel}.json`);
        const data = json.map((e) => e.slice());
        this.vocabData = new Vocab(data, this.curLevel);
        console.log(this.vocabData.length);
    };

    get word() {
        return this.curWord;
    }
    get wordLength() {
        return this.curWord.length;
    }

    get isEmpty() {
        return this.vocabData.length == 0;
    }

    setNewRandomWord = () => {
        const getRandomInt = (max, min) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        // init min max , wordToDelete
        let min = 0;
        let max = this.vocabData.length - 1;
        let wordToDelete = null;

        // if level is 4 to 7 start using isSpecialWord
        if (this.curLevel >= 4 && this.curLevel <= 7) {
            // toggle isSpecial
            this.isSpecialWord = !this.isSpecialWord;

            min = this.vocabData.splitIndex;
            max = this.vocabData.length - 1;
            if (this.isSpecialWord) {
                this.vocabData.splitIndex -= 1;
                min = 0;
                max = this.vocabData.splitIndex - 1;

                // if there still special character left
                // then set word to delete , set curWord
                if (this.specialCharacterList.length) {
                    const specialLength = this.specialCharacterList.length - 1;
                    const randCharNum = getRandomInt(specialLength, 0);
                    const randChar = this.specialCharacterList[randCharNum];
                    const randCharWordList = this.vocabData
                        .specialWordList("raw")
                        .filter((e) => {
                            const curConsonant = e.slice(0)[0].char;
                            return curConsonant === randChar;
                        });
                    const randWordNum = getRandomInt(
                        randCharWordList.length - 1,
                        0
                    );
                    wordToDelete = this.vocabData.wordIDByRawData(
                        randCharWordList[randWordNum]
                    );
                    this.curWord = randCharWordList[randWordNum];
                    this.specialCharacterList.splice(randCharNum, 1);
                }
            }
        }
        if (!wordToDelete) {
            // if level 1, we don't need random number
            const index = this.curLevel === 1 ? 0 : getRandomInt(max, min);
            wordToDelete = this.vocabData.wordID("sorted", index);
            this.curWord = this.vocabData.word("sorted", index);
        }

        // set current word and delete word from list
        this.curWordID = wordToDelete;
        this.vocabData.deleteWord(wordToDelete);
        console.log(wordToDelete);
        console.log(this.vocabData.sortedData("word"));

        if (!this.vocabData.length) {
            this.isEndPractice = true;
        }
    };
}
