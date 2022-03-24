export default class {
    constructor() {
        console.log('start timer');
        this.time = new Date();
    }
    get deltaTime() {
        console.log('stop timer');
        return (Date.now() - this.time) / 1000;
    }
}
