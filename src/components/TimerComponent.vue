<template>
    <div class="text-container wrapper">
        <span>เวลา: </span>
        <div class="time-wrapper">
            <div class="minute">
                {{ minute }}
            </div>
            <span>:</span>
            <div class="second">
                {{ second }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["time"],
    data() {
        return {};
    },
    computed: {
        minute: function() {
            const minute = parseInt(this.time / 60);
            return minute >= 10 ? minute : `0${minute}`;
        },

        second: function() {
            const second = this.time % 60;
            return second >= 10 ? second : `0${second}`;
        },
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
.wrapper {
    z-index: 1001;
    position: relative;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
    letter-spacing: 0px;
    font-weight: 500;
    background-color: #fff;
    color: #303030;
    border-radius: 4px;
    padding: 0.3rem 1rem;
    border: 1.5px solid rgb(209, 209, 209);
    border-radius: 8px;
    display: flex;
    white-space: nowrap;
    gap: 0.5rem;
    span {
        font-weight: normal;
    }
    .time-wrapper {
        display: flex;
    }
}
</style>
