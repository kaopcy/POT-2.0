<template>
    <div class="login">
        <div class="content">
            <h1>เข้าสู่ระบบ</h1>
            <div id="validated">Please enter name.</div>
            <input
                type="text"
                class="login-input"
                placeholder="ชื่อ-นามสกุล"
                v-model="username"
            />
            <div class="btn" @click="login">ตกลง</div>
        </div>
        <!-- <div class="edit-btn" @click="edit()">
            คำศัพท์
        </div>
        <div class="btn" @click="$router.replace({ name: 'EndScore' })">
            ไปตอนจบ
        </div> -->
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            username: "",
        };
    },
    methods: {
        login() {
            if (this.username == "" || this.username == null) {
                this.validated();
                return;
            }
            this.$store.commit("updateUsername", this.username);
            this.$store.commit("updateLogin", true);
            if (this.$store.state.saveFolder === 'no name') {
                // initial save folder
                var datetime = new Date();
                let date = ("0" + datetime.getDate()).slice(-2);
                // current month
                let month = ("0" + (datetime.getMonth() + 1)).slice(-2);
                // current year
                let year = datetime.getFullYear();
                // current hours
                let hours = datetime.getHours();
                // current minutes
                let minutes = datetime.getMinutes();
                // current seconds
                let seconds = datetime.getSeconds();
                this.$store.commit("updateSaveFolder", {
                    date,
                    month,
                    year,
                    hours,
                    minutes,
                    seconds,
                });
            }
            this.$router.replace({ name: "Learn" , params: { id: 1 } });
        },
        validated() {
            const validatedDOM = document.getElementById("validated");
            validatedDOM.style.opacity = "100%";
            setTimeout(() => {
                validatedDOM.style.opacity = "0";
            }, 1500);
        },

        edit() {
            this.$router.replace({ name: "Edit" });
        },
    },
    created() {
        this.username = this.$store.state.username;
    },
};
</script>

<style lang="scss" scoped>
.login {
    font-family: "Sarabun";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 2rem 2rem;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        background-color: #fff;
        border-radius: 20px;

        h1 {
            font-size: 45px;
            font-weight: 700;
            color: #303030;
        }

        input[type="text"] {
            font-family: "Sarabun";
            width: 400px;
            font-size: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            margin: 0 3rem;
            margin-bottom: 1rem;
            outline: none;
            border: 2px solid rgb(201, 201, 201);
            &:focus {
                border: 2px solid rgb(143, 143, 143);
                &::placeholder {
                    color: #cccccc;
                }
            }
            &::placeholder {
                color: #a0a4a4;
            }
        }
        #validated {
            width: 400px;
            color: red;
            opacity: 0;
            transition: 0.5s opacity;
        }
        .btn {
            width: 400px;
            color: #fff;
            font-size: 20px;
            text-align: center;
            padding: 10px 20px;
            background-color: rgb(51, 173, 255);
            border-radius: 5px;
            cursor: pointer;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            font-weight: 500;
            letter-spacing: 3px;
            transition: 0.2s all;
            margin-bottom: 1rem;
            &:hover {
                background-color: rgb(36, 87, 255);
            }
            &:active {
                background-color: rgb(255, 62, 62);
            }
        }
    }
}
.edit-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: #fff;
    margin: 2rem;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    cursor: pointer;

    &:hover {
        box-shadow: rgba(116, 119, 121, 0.2) 0px 8px 24px;
    }
}
</style>
