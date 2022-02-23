<template>
    <div class="wrapper">
        <button class="restart-btn" @click="restart()">เริ่มใหม่</button>
        <button class="start-btn" @click="next()">ไปต่อ</button>
    </div>
</template>

<script>
export default {
    name: "Rest",
    data() {
        return {};
    },
    methods: {
        restart() {
            this.$router.push({ name: "Practice" })
        },
        next() {
            this.$router.push({ name: "Learn" , params: { id: 2 }})
        },
    },
};
</script>

<style lang="scss" scoped>
div {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
}
button {
    font-size: 2rem;
    font-weight: 700;
    cursor: pointer;
}
</style>
