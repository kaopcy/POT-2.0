<template>
    <div class="app" id="app">
        <router-view class="router" :key="$route.path"></router-view>
        <!-- <CloseBtn @click="electronWindow.close()" v-if="$store.state.isAdmin" /> -->
        <div id="warn">please login first</div>
    </div>
</template>

<script>
// import CloseBtn from "./components/CloseButton.vue";
const remote = window.require("electron").remote;
export default {
    name: "app",
    components: {
        // CloseBtn,
    },
    data() {
        return {
            electronWindow: remote.getCurrentWindow(),
        };
    },
    created() {
        if (!this.$store.state.login && this.$route.name !== "Login") {
            this.$router.replace({ name: "Login" });
        }
        window.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "KeyP":
                    this.$store.commit("toggleIsAdmin");
                    break;
                case "Escape":
                    this.electronWindow.close();
                    break;
                default:
                    break;
            }
        });
    },
};
</script>

<style lang="scss">
@font-face {
    font-family: "Roboto-Regular";
    src: url("../public/font/Roboto-Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: "Poppin";
    src: url("./assets/font/Poppins-Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
    background: rgb(244, 245, 255);
    width: 100vw;
    height: 100vh;
    cursor: unset;
    #nav-bar {
        transition: 0.5s all;
    }
    #warn {
        visibility: hidden;
        z-index: 10000;
        font-size: 20px;
        font-weight: 700;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        color: rgb(233, 59, 59);
        opacity: 0%;
        transition: 0.5s ease-in-out;
    }
    .exit-btn {
        position: absolute;
        z-index: 100;
        cursor: pointer;
    }
}

.text-container {
    font-size: 1rem;
    letter-spacing: 0;
    background-color: #fff;
    color: #303030;
    border: 1.5px solid rgb(209, 209, 209);
    border-radius: 8px;
    padding: 0.3rem 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
}
</style>
