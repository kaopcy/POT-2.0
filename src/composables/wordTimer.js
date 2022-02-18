export default class {
    constructor() {
        this.time = new Date();
    }
    get deltaTime() {
        return (Date.now() - this.time) / 1000;
    }
}
