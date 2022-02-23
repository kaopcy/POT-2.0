<template>
    <div class="instruction-container">
        this is instruction container
    </div>
</template>

<script>
export default {
    name: "Instruction",
    data() {
        return {
            instructionSound: new Audio(),
            onKeyup: null,
            onSoundEnded: null,
        };
    },
    methods: {
        _playInstructionSound() {
            this.instructionSound.src = "sound/ระฆัง.mp3";
            this.instructionSound.play();
            this.onSoundEnded = () => {
                console.log("instruction sound ended");
            };
            this.instructionSound.addEventListener("ended", this.onSoundEnded);
        },
    },
    mounted() {
        this.onKeyup = (ev) => {
            if (ev.code === "Enter") {
                this.$router.replace({ name: "Learn", params: { id: 2 } });
            }

            if (ev.code === "Backspace") {
                if (this.instructionSound.paused) {
                    this.instructionSound.play();
                } else {
                    this.instructionSound.currentTime = 0;
                }
            }
        };
        window.addEventListener("keyup", this.onKeyup);

        this._playInstructionSound();
    },
    beforeDestroy() {
        window.removeEventListener("keyup", this.onKeyup);
        this.instructionSound.removeEventListener;
        this.instructionSound.pause()
    },
};
</script>

<style lang="scss" scoped>
.instruction-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
}
</style>
