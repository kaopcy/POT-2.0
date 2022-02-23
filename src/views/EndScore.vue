<template>
    <div class="wrapper">
        <div class="card-container">
            <img class="congrat-img" src="congratulation.png" alt="" />
            <div class="score-wrapper">
                <h3>{{ $store.state.learnScore }}</h3>
                <h1>คะแนน</h1>
            </div>
            <div class="name-wrapper">
                <h3>{{ $store.state.username }}</h3>
            </div>
            <img
                class="restart-img"
                src="restart.png"
                @click="reload()"
                alt=""
            />
        </div>
    </div>
</template>

<script>
import confetti from "canvas-confetti";
import { makeBlobFromSheet } from "../composables/exportXLSX";

export default {
    name: "EndScore",
    data() {
        return {};
    },
    methods: {
        frame() {
            var colors = ["#8b5642", "#6a696b"];
            confetti({
                particleCount: 200,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
            });
            confetti({
                particleCount: 200,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
            });
        },

        reload() {
            window.location.reload();
        },

        makeSheet() {
            const filteredScore = this.$store.state.result;
            const finalScore = filteredScore.map((e) =>
                e.map((score) => {
                    const arr = [score["word"], score["time"]];
                    return arr;
                })
            );
            console.log(finalScore);

            const myblob = makeBlobFromSheet(finalScore);
            window.saveXLSX(
                myblob,
                this.$store.state.username,
                this.$store.state.saveFolder
            );
        },
    },
    mounted() {
        const endSound = new Audio();
        endSound.src = "sound/ระฆัง.mp3";
        endSound.volume = 0.4;
        setTimeout(() => {
            endSound.play();
        }, 1);
        this.frame();

        this.makeSheet();
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    position: absolute;
    inset: 0;
    background: rgb(244, 245, 255);
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 586px;
    max-height: 75vh;
    width: 450px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    .congrat-img {
        position: absolute;
        top: -7rem;
        height: 350px;
    }
    .score-wrapper {
        margin-top: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;

        h1 {
            color: #424242;
            font-size: 4rem;
        }

        h3 {
            color: black;
            font-size: 5rem;
        }
    }
    .name-wrapper {
        font-family: "Sarabun", sans-serif !important;
        margin-bottom: 10%;
    }

    .restart-img {
        position: relative;
        width: 50px;
        height: 50px;
        cursor: pointer;
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(-360deg);
            }
        }
        &:hover {
            animation: spin 1s linear infinite;
        }
    }
}
</style>
