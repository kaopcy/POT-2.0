<template>
    <div class="test">
        <div class="wrapper">
            <img class="center smile" id="pic"  v-show="control.isShowEmoji"/>
            <div class="center nav"  v-show="!showText && control.isStart">
                <span>{{text.nav}}</span>
            </div>
            <div class="center test" v-show="showText && control.isStart">
                <span>{{text.test}}</span>
            </div>
            <div class="center timer">{{getTime}}</div>
            <button class="center btn" v-show="!control.isStart" @click="start">
                <span>START</span>
            </button>
        </div>
    </div>
</template>

<script>
import json1 from '../assets/test-letter/block1.json'
import json2 from '../assets/test-letter/block2.json'
import json3 from '../assets/test-letter/block3.json'
import json4 from '../assets/test-letter/block4.json'
import XLSX from 'xlsx'

export default {
    name: 'Test',
    data() {
        return {
            timer: null,
            data: [],
            text:{
                test: '',
                nav: '',
                src: '',
                block: null,
                time: 0,
            },
            word:{
                eachData: [],
                pool: [],
            },
            voice: new Audio(),
            showText: false,
            control:{
                canChoose: false,
                isStart: false,
                isShowEmoji: false,
            },
            student:{
                maxScore: 0,
                score: 0,
                result: [],
                time: 0,
            },
            json : [
                { name: 'Dady', age: '21' },
                { name: 'Jonh', age: '25' },
                { name: 'James', age: '17' },
            ]
        }
    },
    computed:{
        getTime(){
            return this.text.time / 10;
        }
    },
    methods: {
        initData(){
            this.data[0] = json1.block1;
            this.data[1] = json2.block2;
            this.data[2] = json3.block3;
            this.data[3] = json4.block4;
            var length = 0
            this.word.eachData.push(length)
            this.data.forEach(i => {
                length += i.length
                this.word.eachData.push(length)
            });
            this.student.maxScore = length
            for (let i = 0; i < length; i++) {
                this.word.pool.push(i)
            }
            console.log(`word pool each data is ${this.word.eachData}`);
        },
        playSound(src){
            this.voice = new Audio();
            this.voice.src = src;  
            this.voice.play();
            this.voice.addEventListener('ended' , ()=>{
                this.control.canChoose = true;
                console.log(`endded aaa`)
                this.startTimer()
            })
        },

        checkForEnd(){
            if(this.word.pool.length != 0 ){
                return
            }
            else this.onExport()
        },

        getRandomWord() {
            var index = Math.floor(Math.random() * this.word.pool.length)
            var value = this.word.pool[index];
            var block = 0;
            this.word.pool.splice(index , 1);
            for (let i = 0; i < 4; i++) {
                if(value >= this.word.eachData[i] && value < this.word.eachData[i+1]){
                    block = i
                    value = value - this.word.eachData[i]
                }
            }
            block ==1 || block == 0 ? this.text.block = true : this.text.block = false;
            return [this.data[block][value].name , this.data[block][value].source]
        },

        removeEventListener(){
            window.removeEventListener('keyup' , this.wrongAns)
            window.removeEventListener('keyup' , this.rightAns)
        },

        setWord(){
            const [text , src] = this.getRandomWord();
            this.text.test = text
            this.text.src = src
        },

        clearTimer(){
            clearInterval(this.timer);
        },
        start(src){
            this.control.canChoose = false;
            document.getElementById('pic').src = src
            this.control.isStart = true;
            this.showText = false;
            setTimeout(() => {
                this.control.isShowEmoji = false;
            }, 1500);
            setTimeout(() => {
                this.showText = true;
                this.setWord()
                console.log(`text test is : ${this.text.test}`);
                this.playSound(this.text.src);
            }, 2000);
        },

        rightAns(event){
            if(this.control.canChoose && event.code =='ArrowRight'){
                this.clearTimer()
                this.control.isShowEmoji = true;
                this.pushData('ถูก')
                this.checkForEnd()
                this.start(this.text.block ?  "assets/smile.png" : "assets/disappoint.png" )
            }
        },

        wrongAns(event){
            if(this.control.canChoose && event.code =='ArrowLeft'){
                this.clearTimer()
                this.control.isShowEmoji = true;
                this.pushData('ผิด')
                this.checkForEnd() 
                this.start(this.text.block ?  "assets/disappoint.png" : "assets/smile.png" )
            }
        },

        startTimer(){
            this.text.time = 0;
            this.timer = setInterval(() => {
                this.text.time++;
            }, 100);
        },

        pushData(ans){
            this.student.time += this.getTime;
            this.student.result.push({word: this.text.test, time: `${this.getTime} sec` ,ans: ans})
        },
        onExport() {
            this.student.result.push({ans: "Time : "+this.student.time+" sec"});
            this.student.result.push({ans: "Score: "+this.student.score+"/"+this.student.maxScore+ "point"});
            const dataWS = XLSX.utils.json_to_sheet(this.student.result);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, dataWS);
            XLSX.writeFile(wb,`${this.setFileName()}.xlsx`);
        },
        setFileName(){
            var datetime = new Date();
            let date = ("0" + datetime.getDate()).slice(-2);
            let month = ("0" + (datetime.getMonth() + 1)).slice(-2);
            let year = datetime.getFullYear();
            let hours = datetime.getHours();
            let minutes = datetime.getMinutes();
            return `${this.$store.state.username} ${date}-${month}-${year}-${hours}.${minutes}`;
        }
    },
    mounted(){
        this.initData();
        let pushedArray = [];
        for (let i = 0; i < this.data.length; i++) {
            pushedArray.push(this.data[i])
        }
        console.table(pushedArray)
        window.addEventListener( 'keyup' , this.rightAns)
        window.addEventListener( 'keyup' , this.wrongAns)
    },
    beforeDestroy(){
        this.removeEventListener();
        this.voice.pause();
        this.voice = new Audio();
    },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
.wrapper{
    padding: 0;
    margin: 0;
    
    font-family: 'Sarabun' , sans-serif !important;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #1d1d1d;
    overflow: hidden;
    display: flex;
    .center{
        cursor: pointer;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50% ,-50%);
        font-size: 250px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
            font-size: 250px;
        }
        
    }
    .smile{
        max-width: 250px;
        z-index: 100;
    }
    .nav{
        color: #303030;
    }
    .test{
        color: #fff;
    }
    .btn{
        width: auto;
        background-color:#fff;
        outline: none;
        border: 10px solid #fff;
        border-radius: 70px;
        transition: 0.5s;
        span{
            font-family: 'Poppin' , sans-serif;
            color: #2d2d2d;
            font-size: 100px;
            padding: 20px 50px;
        }
        &:hover{
            background-color: rgb(124, 252, 120);
            border-color: rgb(124, 252, 120);
            span{
                color: #fff;
                font-weight: 900;
            }
        }
    }
    .timer{
        top: 80%;
        font-size: 50px;    
        background-color: #fff;
        border-radius: 40px;
        padding: 20px 40px;
        width: auto;
    }
}
.exportbtn{
    z-index: 1000000;
    position: absolute;
    top: 50%;
    left: 0;
    max-height: 100px;
}
</style>