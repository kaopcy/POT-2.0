<template>
    <div class="data-container">
        <div class="header-container">
            <h1>
                คำศัพท์
            </h1>
            <SearchBar :data="data" />
        </div>
        <div
            class="data-wrapper"
            v-for="(vocabList, index) in nameData"
            :key="`${vocabList}${genarateID()}`"
        >
            <div
                class="label"
                :class="{ active: index == $store.state.currentList }"
                @click="expand(index)"
            >
                <span>
                    หมวดที่ {{ index + 1 }} &nbsp;
                    <span>{{ listProp[index].name }}</span>
                </span>
                <div class="right">
                    <span>{{ vocabList.length }} คำ</span>
                    <div class="chevron-wrapper">
                        <span class="span1"></span>
                        <span class="span2"></span>
                    </div>
                </div>
            </div>
            <div
                class="word-wrapper"
                v-show="$store.state.currentList == index"
                :class="{ active: index == $store.state.currentList }"
            >
                <div
                    class="word"
                    :class="{
                        watched: $store.state.watchedWord.includes(index == 1 ? word.slice()[0] : word),
                    }"
                    v-for="word in vocabList"
                    :key="`${word}${genarateID()}`"
                    @click="handleWordClick(word , index)"
                >
                    {{ index == 1 ? word.slice()[0] : word }}
                </div>
            </div>
        </div>

        <div class="edit-btn" @click="back()">
            กลับ
        </div>
    </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import SearchBar from "../components/SearchBar.vue";

export default {
    name: "Edit",
    components: {
        SearchBar,
    },
    data() {
        return {
            data: [],
            nameData: [],
            listProp: [
                {
                    name: "ฝึก 10 คำก่อนเริ่ม",
                },
                {
                    name: "เสียงพยัญชนะ 44 เสียง",
                },
                {
                    name: "เสียงสระ 30 เสียง",
                },
                {
                    name: "การสะกดคำในแม่ ก กา",
                },
                {
                    name: "การผันวรรณยุกต์คำในแม่ ก กา",
                },
                {
                    name: "การสะกดคำที่มีตัวสะกดตรงตามมาตรา",
                },
                {
                    name: "การผันวรรณยุกต์คำที่มีตัวสะกดตรงตามมาตรา",
                },
                {
                    name: "การสะกดคำที่มีตัวสะกดไม่ตรงตามมาตรา",
                },
                {
                    name: "การสะกดคำที่มีอักษรควบ",
                },
                {
                    name: "การสะกดคำที่มีอักษรนำ",
                },
            ],
        };
    },
    mounted() {},

    methods: {
        genarateID() {
            return uuidv4();
        },

        expand(index) {
            if (this.$store.state.currentList == index) {
                this.$store.commit("updateCurrentList", null);
            } else {
                this.$store.commit("updateCurrentList", index);
            }
        },

        handleWordClick(word , index) {
            this.$router.push({ path: `/displayword/${word}-${index+1}` });
            this.$store.commit("addWatchedWord", index == 1 ? word.slice()[0] : word );
            console.log(this.$store.state.watchedWord);
        },

        back() {
            this.$router.push({ name: "Login" });
        },
    },

    created() {
        for (let i = 1; i <= 10; i++) {
            console.log("init new");
            const json = require(`../assets/letter/level${i}.json`);
            this.data[i] = [...json];
        }

        for (let i = 1; i <= 10; i++) {
            this.nameData[i - 1] = this.data[i].map((element) => {
                const word = element
                    .slice(-1)[0]
                    .src.split("/")
                    .slice(-1)[0]
                    .split(".")[0];
                return word;
            });
        }
        console.log(this.nameData);
    },
};
</script>

<style lang="scss" scoped>
.data-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f6fd;
    font-family: "Sarabun";
    overflow-x: hidden;
    overflow-y: scroll;
    .header-container {
        width: 78%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        h1 {
            display: flex;
            align-self: center;
            margin: 1rem 0;
        }
    }

    .data-wrapper {
        display: flex;
        flex-direction: column;
        width: 80%;
        margin: 1px;
        &:nth-child(odd) {
            .label {
                background-color: #eff0f5;
            }
        }
        &:nth-last-child(1) {
            margin-bottom: 10rem;
        }
        .label {
            padding: 1rem 2rem;
            width: 98%;
            align-self: center;
            font-size: 1rem;
            font-weight: 700;
            background-color: #fff;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            &:hover {
                outline: 1px solid rgb(146, 146, 146);
            }
            span {
                span {
                    font-weight: normal;
                }
            }
            &.active {
                border: 1px solid rgb(197, 197, 197);
                .chevron-wrapper {
                    transform: rotate(-90deg);
                }
            }
            .right {
                display: flex;
                align-items: center;
                gap: 1rem;
                span {
                    font-size: 0.8rem;
                    font-weight: normal;
                    color: rgb(168, 168, 168);
                }
            }
        }
        .word-wrapper {
            background: rgba(255, 255, 255, 0.589);
            width: 94%;
            align-self: center;
            padding: 20px 10px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            flex-shrink: 0;
            margin-bottom: 1rem;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
                rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
        }
        .word {
            text-decoration: none;
            color: #000;
            padding: 0.2rem 0.5rem;
            border-radius: 10px;
            background-color: rgb(235, 251, 255);
            margin: 0px 0;
            cursor: pointer;
            &:hover {
                background-color: rgb(204, 245, 255);
            }
            &.watched {
                background-color: rgb(126, 229, 255);
            }
        }
    }
}

.chevron-wrapper {
    width: 10px;
    height: 8px;
    position: relative;
    transform: rotate(90deg);
    span {
        position: absolute;
        border-radius: 5px;
        width: 100%;
        height: 0.17rem;
        background-color: rgb(85, 85, 85);
        &.span1 {
            top: 0;
            transform: rotate(45deg);
        }
        &.span2 {
            bottom: 0;
            transform: rotate(-45deg);
        }
    }
}

.edit-btn {
    position: fixed;
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
