export default class Timer {
    constructor(maxTime) {
        this.plainTime = 0;
        this.timerInterval;
        this.maxTime = maxTime;
    }
    // getter
    getPlainTime = () => this.plainTime;
    getRemainTime = () => this.maxTime - this.plainTime;
    getMinuteLeft = () => {
        const minute = Math.floor(this.getRemainTime() / 60);
        return minute < 10 ? `0${minute}` : minute;
    };
    getSecondLeft = () => {
        const second = this.getRemainTime() - this.getMinuteLeft() * 60;
        return second < 10 ? `0${second}` : second;
    };
    isStart = () => (this.timerInterval ? true : false);

    // setter
    start = () => {
        if (!this.timerInterval) {
            this.timerInterval = setInterval(() => {
                if (this.getRemainTime() <= 0) this.stop();
                this.plainTime += 1;
                console.log(
                    `myinterval: ${this.getMinuteLeft()}-${this.getSecondLeft()}`
                );
            }, 200);
        }
    };
    stop = () => {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    };
}
