<template>
    <div class="edit">
        <div class="data-container">
            <div
                class="data-wrapper"
                v-for="vocabList in nameData"
                :key="`${vocabList}${genarateID()}`"
            >
                <router-link
                    :to='`/end-score/${wordList}`'
                    class="list"
                    v-for="wordList in vocabList"
                    :key="`${wordList}${genarateID()}`"
                >
                    {{ wordList }}
                </router-link>
                <!-- {{vocabList[0]}} -->
            </div>
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

import { v4 as uuidv4 } from "uuid";

export default {
    name: "Edit",
    data() {
        return {
            data: [],
            nameData: [],
        };
    },
    mounted() {},

    methods: {
        genarateID() {
            return uuidv4();
        },
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
    display: flex;
    justify-content: space-around;
    .data-wrapper {
        display: flex;
        flex-direction: column;
    }
}
</style>
