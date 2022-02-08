<template>
    <div class="search-container">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="search-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
        </svg>

        <div class="input-wrapper">
            <input type="text" id="search-input" v-model="searchInput" />
            <div class="close-btn" v-show="searchInput.length > 0">
                <span></span>
                <span></span>
            </div>
        </div>

        <div class="list-container" v-if="isFocus">
            <span class="header">
                ศัพท์ที่ค้นพบ: {{ filteredData.length }} คำ
            </span>
            <div
                class="list"
                v-for="word in filteredData"
                :key="`${word.name}${genaratedID()}`"
                @click="handleWordClick(word.name)"
            >
                {{ word.name }}
                <span
                    style="color:rgb(200, 200, 200); fontSize:.7rem; marginLeft:.5rem"
                    >หมวดที่ {{ word.index }}</span
                >
            </div>
        </div>
    </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
    props: {
        data: Array,
    },
    data() {
        return {
            searchInput: "",
            filteredData: [],
            isFocus: "false",
        };
    },
    watch: {
        searchInput: function() {
            this.handleMatch();
        },
    },
    created() {
        this.isFocus = false;
    },

    mounted() {
        document.getElementById("search-input").blur();
        this.handleMatch();
        document.addEventListener(
            "click",
            (event) => {
                // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
                if (!event.target.closest(".input-wrapper")) {
                    this.isFocus = false;
                }
                if (event.target.matches(".close-btn")) {
                    this.isFocus = false;
                    this.searchInput = "";
                }
            },
            false
        );
        setTimeout(() => {
            document
                .getElementById("search-input")
                .addEventListener("focus", () => {
                    this.isFocus = true;
                });
        }, 100);
    },

    methods: {
        handleMatch() {
            if (this.searchInput === ''){
                this.filteredData = [];
                return
            }
            this.filteredData = [];
            this.data.forEach((list, index) => {
                list.forEach((word) => {
                    const curWord = word
                        .slice(-1)[0]
                        .src.split("/")
                        .slice(-1)[0]
                        .split(".")[0];

                    const searchingArray = this.searchInput.split('');
                    if (searchingArray.every((el) => curWord.includes(el))) {
                        this.filteredData.push({ name: curWord, index });
                    }
                });
            });
        },

        handleWordClick(word) {
            this.$router.push({ path: `/end-score/${word}` });
            this.$store.commit("addWatchedWord", word);
        },

        genaratedID() {
            return uuidv4();
        },
    },
};
</script>

<style lang="scss" scoped>
.search-container {
    z-index: 10;
    position: absolute;
    right: 0;
    font-family: "Sarabun", sans-serif;
    background-color: #fff;
    box-shadow: 0px 8px 20px rgb(0 0 0 / 6%);
    display: flex;
    align-items: center;
    width: 300px;
    height: 50px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .search-icon {
        height: 20px;
        color: #b6b6b6;
        margin: 0 0.5rem;
    }

    .input-wrapper {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        input {
            font-family: "Sarabun", sans-serif;
            width: 100%;
            padding: 0.5rem;
            outline: none;
            border: none;
            font-size: 1.1rem;
            font-weight: 600;
        }
        .close-btn {
            width: 13px;
            height: 13px;
            position: absolute;
            right: 10px;
            top: 50%;
            border-radius: 10px;
            cursor: pointer;
            span {
                position: absolute;
                width: 100%;
                height: 0.1rem;
                background-color: #000;
                transform: rotate(45deg);
                &:nth-child(1) {
                    transform: rotate(315deg);
                }
            }
        }
    }
    .list-container {
        border-top: 2px solid #ebebeb;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
            rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        background-color: #fff;
        position: absolute;
        top: 100%;
        max-height: 200px;
        width: 100%;
        overflow-y: auto;
        padding: 0.5rem;
        &::-webkit-scrollbar {
            width: 5px;
        }
        &::-webkit-scrollbar-thumb {
            background: rgb(185, 185, 185);
            border-radius: 10px;
        }
        .header {
            color: rgb(187, 187, 187);
            font-size: 0.8rem;
            font-weight: 600;
            margin-left: 0.7rem;
        }
        .list {
            width: 100%;
            padding: 0.5rem;
            position: relative;
            cursor: pointer;
            &:hover {
                background-color: #eaebef;
                border-radius: 10px;
                &::after {
                    position: absolute;
                    content: "select";
                    top: 50%;
                    transform: translateY(-50%);
                    right: 10px;
                    color: rgb(139, 139, 139);
                    font-size: 0.9rem;
                    font-weight: 600;
                }
            }
        }
    }
}
</style>
