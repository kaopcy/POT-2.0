<template>
    <div class="instruction-container">
        <div class="text-container">
            <b>
                คำชี้แจงในการฝึกการอ่านแบบโฟโน-ออร์โธกราฟฟิก
            </b>
            <span>
                &emsp;&emsp;สวัสดีค่ะน้องๆ
                วันนี้เราจะมาฝึกการอ่านด้วยโปรแกรมคอมพิวเตอร์ฝึกแบบโฟโน-ออร์โธกราฟฟิก
                แต่ก่อนที่เราจะไปเริ่มฝึกกัน
                พี่ขอชี้แจงวิธีการฝึกให้น้องๆทราบดังต่อไปนี้นะคะ
            </span>
            <span>
                &emsp;&emsp;โปรแกรมฝึกนี้ใช้ระยะเวลาในการฝึกวันละ 30 นาที
                สัปดาห์ละ 5 วัน เป็นเวลา 5 สัปดาห์ โดยเมื่อกดปุ่มเพื่อเริ่มฝึก
                คำศัพท์จะปรากฏขึ้นบนหน้าจอคอมพิวเตอร์ทีละตัวอักษรพร้อมกับเสียงอ่านสะกดคำ
                เมื่อฟังเสียงอ่านคำจบแล้ว ให้น้องทำตามขั้นตอนดังนี้
            </span>
            <span>
                &emsp;&emsp;1.&nbsp;&nbsp;<span class="black"
                    >หากน้องต้องการฟังคำศัพท์นั้นซ้ำ</span
                >อีกครั้งให้กดปุ่ม
                <span class="blue">Backspace</span>

                เพื่อย้อนกลับไปดูและฟังเสียงคำนั้นใหม่อีกครั้งจนกว่าจะเข้าใจ
            </span>
            <span>
                &emsp;&emsp;2.&nbsp;&nbsp;<span class="black"
                    >เมื่อดูและฟังจนเข้าใจแล้ว</span
                >ให้น้องกดปุ่ม <span class="blue">Space bar</span> ค้างไว้
                แล้วอ่านออกเสียงคำตามที่เห็นและได้ยิน และปล่อยปุ่ม
                <span class="blue">Space bar</span>
                หลังจากที่น้องอ่านออกเสียงคำนั้นจบแล้ว
            </span>
            <span>
                &emsp;&emsp;3.&nbsp;&nbsp;<span class="black"
                    >ถ้าหากน้องไม่ต้องการฟังคำศัพท์นั้นซ้ำ</span
                >
                ก็สามารถกดปุ่ม
                <span class="blue">Space bar</span> เพื่อทำตามขั้นตอนที่ 2
                ได้เลยค่ะ ทำแบบนี้จนครบ 30 นาที ก็เป็นอันจบการฝึกในแต่ละวัน
            </span>
            <span>
                &emsp;&emsp;เมื่อน้องเข้าใจวิธีการฝึกแล้ว ให้กดปุ่ม <span class="blue">Enter</span>
                เพื่อเริ่มฝึกกันได้เลยค่ะ ขอให้น้องๆ โชคดี
                และสนุกกับการฝึกนี้นะคะ
            </span>
            <div class="btn-wrapper">
                <div class="btn" @click="_replay()">
                    <span>
                        ฟังซ้ำกด
                    </span>
                    <b>
                        Backspace ←
                    </b>
                </div>
                <div class="btn" @click="_routeToLearn()">
                    <span>
                        เริ่มฝึกกด
                    </span>
                    <b>
                        Enter ↵
                    </b>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Instruction",
    data() {
        return {
            instructionSound: new Audio(),

            // event
            onKeyup: null,
            onSoundEnded: null,

            // sound
            currentSound: 1,
        };
    },
    methods: {
        _playInstructionSound() {
            this.instructionSound.src = require(`../assets/instruction/paragraph${this.currentSound}.mp3`);
            this.instructionSound.play();
        },

        _replay() {
            this.currentSound = 1;
            this.instructionSound.src = require(`../assets/instruction/paragraph${this.currentSound}.mp3`);
            if (this.instructionSound.paused) {
                this.instructionSound.play();
            } else {
                this.instructionSound.currentTime = 0;
            }
        },

        _routeToLearn() {
            this.$router.replace({ name: "Learn", params: { id: 2 } });
        },
    },
    mounted() {
        this.onKeyup = (ev) => {
            if (ev.code === "Enter") {
                this._routeToLearn();
            }

            if (ev.code === "Backspace") {
                this._replay();
            }
        };

        this.onSoundEnded = () => {
            if (this.currentSound > 10) {
                return;
            }
            this.currentSound += 1;
            this.instructionSound.src = require(`../assets/instruction/paragraph${this.currentSound}.mp3`);
            this.instructionSound.play();
        };
        setTimeout(() => {
            this.instructionSound.addEventListener("ended", this.onSoundEnded);
            window.addEventListener("keyup", this.onKeyup);
            this._playInstructionSound();
        }, 500);
    },
    beforeDestroy() {
        window.removeEventListener("keyup", this.onKeyup);
        this.instructionSound.removeEventListener;
        this.instructionSound.pause();
    },
};
</script>

<style lang="scss" scoped>
.blue {
    color: #4795f3;
    font-weight: 500 !important;
}
.black {
    color: #000 !important;
    font-weight: 500 !important;
}
.instruction-container {
    font-family: "Sarabun";
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 1.2rem;
    background-color: white;
    .text-container {
        border: 1px solid rgb(231, 231, 231);
        border-radius: 20px;
        background-color: transparent;
        display: flex;
        max-width: 900px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: "Sarabun";
        font-size: 1.2rem;
        padding: 2.2rem 3rem;
        color: #727272;
        b {
            font-size: 1.65rem;
            margin-bottom: 2rem;
            color: #000;
        }
        span {
            line-height: 1.7rem;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
            font-weight: 400;
        }
        .btn-wrapper {
            margin-top: 2rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 2.5rem;

            .btn {
                padding: 0.4rem 1.2rem;
                background-color: #fafafa;
                border-radius: 7px;
                color: #fff;
                width: 290px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                gap: 0.9rem;
                cursor: pointer;
                &:hover {
                    background-color: #f3f3f3;
                    b {
                        &:hover {
                            background-color: #000;
                        }
                    }
                }

                span {
                    font-size: 1.2rem;
                    font-weight: 600;
                    margin: 0;
                    color: #5a5959;
                }
                b {
                    font-size: 1.2rem;
                    font-weight: 900;
                    margin: 0;
                    padding: 0.3rem 1rem;
                    color: #fff;
                    background-color: rgb(46, 46, 46);
                    border-radius: 7px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
