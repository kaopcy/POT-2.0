<template>
    <div class="display-word-wrapper">
        {{ $route.params.id }} : {{currentWord}}
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
        };
    },

    methods: {
        
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
};
</script>

<style></style>
