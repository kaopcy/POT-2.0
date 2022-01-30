<template>
    <div class="wrapper">
        <div class="card-container">
            <img src="congratulation.png" alt="" />
            <div class="score-wrapper">
                <h1>Score</h1>
                <h3>{{ $store.state.learnScore }}</h3>
            </div>
            <div class="name-wrapper">
                <h3>{{ $store.state.username }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import confetti from "canvas-confetti";

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
    },
    mounted() {
        const endSound = new Audio("bell.mp3");
        endSound.play();
        this.frame();
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

@keyframes fadein {
    0% {
        opacity: 0%;
    }
    100% {
        opacity: 100%;
    }
}
.card-container {
    animation: fadein 1s ease-out;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 700px;
    width: 450px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    img {
        position: absolute;
        top: -7rem;
        height: 350px;
    }
    .score-wrapper {
        margin-top: 17rem;
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
        margin-top: 5rem;
        font-family: "Sarabun", sans-serif !important;
    }
}
</style>
