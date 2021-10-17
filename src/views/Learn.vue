<template>
    <div class="learn" id="learn">
        <div id="time">
            <Timer :time="timer.maxTime - timer.time" class="timer"/>
            <div class="difficult-wrapper">
                <div class="difficult">Difficult: {{difficult}}</div>
                <div class="plus-difficult" @click="difficult > 1 ? levelUp(): null" disabled>+</div>
            </div>
        </div>
        <div class="btn-wrapper" v-if="!timer.isStart" @click="clickToStart">
            <div class="bg" id="bg-fade"></div>
            <div class="btn" style="color:#fff;">start</div>
        </div>
        <div class="wrapper" v-show="timer.isStart">
            <div id="para" v-if="!plusSign"></div>
            <img src="../assets/voice.png" class="voice-img" v-if="voiceImg">
        </div>
        <div class="title" v-if="title !== ''"><p>{{title}}</p></div>
    </div>
</template>

<script>
import json1 from   "../assets/letter/level1.json";
import json2 from   "../assets/letter/level2.json";
import json3 from   "../assets/letter/level3.json";
import json4 from   "../assets/letter/level4.json";
import json5 from   "../assets/letter/level5.json";
import json6 from   "../assets/letter/level6.json";
import json7 from   "../assets/letter/level7.json";
import json8 from   "../assets/letter/level8.json";
import json9 from   "../assets/letter/level9.json";
import json10 from  "../assets/letter/level10.json";

import Timer from '../components/Timer.vue'

export default {
    name: 'Learn',
    components:{
        Timer,
    },
    data() {
        return {
            data: [],
            innerText: '',
            wordPool: [],
            plusSign: false,
            difficult: 1,
            upperLetter: ['่' , '้' , '๊' , "๋" , "ิ" , 'ี' , 'ึ' , 'ื' , 'ั' , 'ํ' , '็' , '์',],
            lowerLetter: [ 'ุ', 'ู'],
            longLetter: ['ป','ฬ','ฝ','ฟ'],
            textProperty: {
                letterSpacing: 60,
                fontSize: 250,
                textDelay: 500,
                wordDelay: 2000,
            },
            timer: {
                maxTime: 1800,
                // maxTime: 40,
                isStart: false,
                timerInterval: null,
                time: 0,
            },
            title: '',
            voiceImg: false,
            voice: new Audio(),
            letterIndex: null,
        }
    },
    methods: {
        initialData(){
            this.letterIndex = 1;
            this.data[0] = json1.level1
            this.data[1] = json2.level2
            this.data[2] = json3.level3
            this.data[3] = json4.level4
            this.data[4] = json5.level5
            this.data[5] = json6.level6
            this.data[6] = json7.level7
            this.data[7] = json8.level8
            this.data[8] = json9.level9
            this.data[9] = json10.level10
        },
        
        handleInnerText(data , index , character){
            let length = data[index].length-1;
            let para = document.getElementById("para")
            let sequence = 0;
            let temp= {
                tempText: [],
                tempColor: [],
                tempSwap: [],
                tempSequence: [],
                tempSequenceSwap: [],
            }

            for(let i = 0 ; i < length+1; i++){
                if(data[index][i].char !== ''){
                    console.log(`datachar [${i}]: ${data[index][i].char}`)
                    temp.tempText.push(data[index][i].char);
                    temp.tempColor.push(data[index][i].color);
                    temp.tempSwap.push(data[index][i].swap);
                    temp.tempSequence.push(sequence)
                    sequence++
                    temp.tempSequenceSwap.push(0)
                }
                else {
                    temp.tempSequenceSwap.push(-1)
                }

            }     
            
            for(let i = 0; i< temp.tempColor.length; i++){
                if(temp.tempSwap[i] != 0){
                    let swap = temp.tempSwap[i]
                    let temptemp = temp.tempSequence[i-swap]
                    console.log(`we have to swap ${temp.tempText[i]} and ${temp.tempText[(i-swap)]}`)
                    temp.tempText.splice(i-swap , 0 , temp.tempText[i])
                    temp.tempColor.splice(i-swap , 0 , temp.tempColor[i])
                    temp.tempSequence.splice(i-swap,1)
                    temp.tempText.splice(i+1 , 1 )
                    temp.tempColor.splice(i+1 , 1)
                    temp.tempSequence.splice(i , 0 , temptemp)
                } 
            }
            
            for (let i = 0; i < temp.tempSequenceSwap.length; i++) {
                if(temp.tempSequenceSwap[i] == -1){
                    temp.tempSequence.splice(i , 0 , -1)
                }
            }
            for(let i = 0 ; i < temp.tempColor.length; i++){
                // ถ้าตัวเองเป็น long letter
                if(this.longLetter.indexOf(temp.tempText[i]) !== -1 ){
                    if (this.upperLetter.indexOf(temp.tempText[i+1]) !== -1) //ถ้าตัวหลังเป็น upper ให้ letter spacing = -60
                        this.innerText =  this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize+(i*0.5)}px; 
                        letter-spacing:${this.textProperty.letterSpacing * (-1)}px;
                        opacity:2%;
                        color:${temp.tempColor[i]};
                        "
                        id="text${i}";
                        >${temp.tempText[i]}</span>`);
                    else if( this.lowerLetter.indexOf(temp.tempText[i+1]) !== -1 ) //ถ้าตัวหลังเป็น lower ให้ letter spacing = 0
                        this.innerText =  this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize+(i*0.5)}px; 
                        letter-spacing:${this.textProperty.letterSpacing * 0}px;
                        opacity:2%;
                        color:${temp.tempColor[i]};
                        "
                        id="text${i}";
                        >${temp.tempText[i]}</span>`);
                    else                                                          //ถ้าตัวหลังไม่เป็น lower , upper ให้ letter spacing = 60
                        this.innerText =  this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize+(i*0.5)}px; 
                        letter-spacing:${this.textProperty.letterSpacing}px;
                        opacity:2%;
                        color:${temp.tempColor[i]};
                        "
                        id="text${i}";
                        >${temp.tempText[i]}</span>`);
                }
                //ถ้าตัวเองหรือตัวหลังไม่เป็น Upper , Lower
                else if(this.upperLetter.indexOf(temp.tempText[i]) === -1 || this.upperLetter.indexOf(temp.tempText[i-1]) === -1){
                    //ถ้าตัวต่อหลังเป็น uppercase แต่ตัวเองก็ไม่ได้เป็น uppercase ให้ letter space เป็น เช่น กิน หิว หัว
                    if(this.upperLetter.indexOf(temp.tempText[i+1]) === -1 && this.lowerLetter.indexOf(temp.tempText[i+1]) === -1)
                        if (this.longLetter.indexOf(temp.tempText[i-1]) !== -1 )
                            this.innerText =  this.innerText.concat(`<span style="
                            font-size:${this.textProperty.fontSize+(i*0.5)}px; 
                            letter-spacing:${this.textProperty.letterSpacing * 2}px;
                            opacity:2%;
                            color:${temp.tempColor[i]};
                            "
                            id="text${i}";
                            >${temp.tempText[i]}</span>`);
                        else 
                            this.innerText =  this.innerText.concat(`<span style="
                            font-size:${this.textProperty.fontSize+(i*0.5)}px; 
                            letter-spacing:${this.textProperty.letterSpacing}px;
                            opacity:2%;
                            color:${temp.tempColor[i]};
                            "
                            id="text${i}";
                            >${temp.tempText[i]}</span>`);
                    //ถ้าตัวต่อหลังเป็น uppercase และตัวเองก็เป็น uppercase เหมือนกัน ให้ตัวเองมี letter space เป็น 0 เช่น มั่ว จั่ว ติ๋ม
                    else
                        this.innerText =  this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize+(i*0.5)}px; 
                        letter-spacing:${this.textProperty.letterSpacing*0}px;
                        opacity:2%;
                        color:${temp.tempColor[i]}
                        "
                        id="text${i}";
                        >${temp.tempText[i]}</span>`);
                }
                else {
                    if(this.longLetter.indexOf(temp.tempText[i-2]) !== -1)
                        this.innerText =  this.innerText.concat(`<sup style="
                            font-size:${this.textProperty.fontSize + 0.5}px; 
                            letter-spacing:${this.textProperty.letterSpacing * 2}px;
                            opacity:2%;
                            color:${temp.tempColor[i]}
                            "
                            id="text${i}";
                            >${temp.tempText[i]}</sup>`);
                    else
                        this.innerText =  this.innerText.concat(`<sup style="
                            font-size:${this.textProperty.fontSize + 0.5}px; 
                            letter-spacing:${this.textProperty.letterSpacing}px;
                            opacity:2%;
                            color:${temp.tempColor[i]}
                            "
                            id="text${i}";
                            >${temp.tempText[i]}</sup>`);
                } 
            }
            para.innerHTML = this.innerText
            for (let i = 0; i < character+1; i++) {
                if(temp.tempSequence[i] != -1){
                    this.controlDom(`${temp.tempSequence[i]}`);
                }
            }
        },

        clearInnerText(){
            this.innerText = '';
        },

        getDataByNum(num){
            return this.data[num-1];
        },

        playSound(src){
            this.voice.src = src;
            this.voice.play();    
        },

        controlDom(index){
            let text = document.getElementById(`text${index}`)
            text.style.opacity = '1'
        },

        start(){
            let group = this.getDataByNum(this.difficult);
            let vocab = this.getRandomWord(0,group.length-1);
            // let vocab = 0;
            let char = 0;
            // let group = this.getDataByNum(7);
            // let char = 0;
            let isListenKeyDown = false;
            let isListenKeyUp = false;
            this.startVoice(group , vocab , char);
            this.clearInnerText();

            this.voice.addEventListener( 'error' , ()=>{
                if(char >= group[vocab].length-1){
                    isListenKeyDown = true;
                }else {
                    char++;
                    this.startVoice(group , vocab , char);
                    this.clearInnerText();
                }
            })

            this.voice.addEventListener( 'ended' , ()=>{
                setTimeout(() => {
                    if(char >= group[vocab].length-1){
                        isListenKeyDown = true;
                    }else {
                        char++;
                        this.startVoice(group , vocab , char);
                        this.clearInnerText();
                    }
                }, this.textProperty.textDelay);
            })
    
            window.addEventListener( 'keydown' ,(event) => {
                if(event.code === 'Space'){
                    if(isListenKeyDown){
                        if(!isListenKeyUp){
                            this.voiceImg = true;
                            isListenKeyUp = true;
                        }
                    }
                }
            })

            window.addEventListener('keyup' , (event) => {
                if( event.code === 'Space'){
                    if(isListenKeyUp){
                        isListenKeyDown = false;
                        isListenKeyUp = false;
                        this.voiceImg = false;
                        document.getElementById('para').innerHTML = '+'
                        //Score up
                        this.$store.commit('LearnScoreUp')
                        setTimeout(() => {
                            if (this.difficult == 1){
                                if( this.wordPool.length >= 3 ) {
                                    this.levelUp()
                                    this.setTimer()
                                }
                            }
                            group = this.getDataByNum(this.difficult);
                            char = 0;
                            vocab = this.getRandomWord(0,group.length-1);
                            this.startVoice(group , vocab , char);
                            this.clearInnerText();
                        }, this.textProperty.wordDelay);
                    }
                }

                if( event.code === 'KeyR'){
                    char = 0;
                    this.startVoice(group , vocab , char);
                    this.clearInnerText();
                }
            })

        },

        startVoice(group ,vocab, char ){
            let src = null;
            if(group[vocab][char].src !== ''){
                src = group[vocab][char].src
            }else src = "";

            this.playSound(src)
            this.handleInnerText(group , vocab , char);
        },

        clickToStart(){
            this.timer.isStart = true;
            document.getElementById('para').innerHTML = '+'
            let bg = document.getElementById('learn')
            bg.classList.add('after-start');
            setTimeout(()=>{
                this.start();
                var timeout;
                document.onmousemove = function(){
                    document.getElementById('time').style.opacity = '1'
                    clearTimeout(timeout);
                    timeout = setTimeout(function(){ 
                        document.getElementById('time').style.opacity = '0'
                        console.log('not moving')
                    }, 1500);
                }
            } , 2000 )
            
        },

        getRandomWord(min,max) {
            var i = Math.floor(Math.random()*(max-min))+min;
            for (let j = 0 ; j < this.wordPool.length ; ){
                if(i === this.wordPool[j]){
                    i = Math.floor(Math.random()*(max-min))+min;
                    j = 0;
                }
                else{
                    j++;
                }
                
            }
            this.wordPool.push(i);
            return i;
        },

        levelUp(){
            console.log(`Levelup! :${this.difficult}`);
            this.wordPool = [];
            if (this.difficult < 10) this.difficult++;
        },

        setTimer(){
            let markTime = 0
            this.timer.timerInterval = setInterval(() => {
                const timeLeft = this.timer.maxTime - this.timer.time
                if ( this.timer.time - markTime == 120 && this.difficult == 2 )  { //level 1 => 2
                    this.levelUp()    
                    markTime = this.timer.time
                }
                if ( this.timer.time - markTime == 60 && this.difficult == 3 )  { //level 2 => 3
                    this.levelUp()    
                    markTime = this.timer.time
                }
                if ( this.timer.time - markTime == 180 && this.difficult == 4 )  { //level 3 => 4
                    this.levelUp()    
                    markTime = this.timer.time
                }
                if ( this.timer.time - markTime == 180 && this.difficult == 5 )  { //level 4 => 5
                    this.levelUp()    
                    markTime = this.timer.time
                }
                if ( this.timer.time - markTime == 180 && this.difficult == 6 )  { //level 5 => 6
                    this.levelUp()    
                    markTime = this.timer.time
                }
                if ( this.timer.time - markTime == 180 && this.difficult == 7 )  { //level 6 => 7
                    this.levelUp()    
                    markTime = this.timer.time
                }
                if ( this.timer.time - markTime == 180 && this.difficult == 8 )  { //level 7 => 8
                    this.levelUp()    
                    markTime = this.timer.time
                }
                if ( this.timer.time - markTime == 180 && this.difficult == 9 )  { //level 8 => 9
                    this.levelUp()    
                    markTime = this.timer.time
                }
                
                // end game
                if ( timeLeft == 0) this.$router.replace({name: 'EndScore'})
                this.timer.time++;
            }, 1000);
        }

    },

    created() {
        this.initialData();
    },

    beforeDestroy(){
        document.onmousemove = null
        this.voice.pause();
        this.voice = new Audio();
        this.innerText = '';
        this.data = [];
        this.wordPool = [];
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
@font-face {
    font-family: 'Poppin';
    src: url('../assets/font/Poppins-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
.after-start{
    background-color: #fff !important;
}
.learn{
    padding: 0;
    margin: 0;
    font-family: 'Sarabun' , sans-serif !important;
    font-size: 250px;
    letter-spacing: 30px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #12122a;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    transition: 0.5s all;
    overflow: hidden;

    #time{
        opacity: 0;
        transition: 0.5s opacity;
    }
    .timer{
        position: absolute;
        right: 1rem;
        bottom: 1rem;
    }
    .difficult-wrapper{
        display: flex;
        flex-direction: row;
        font-family: 'Poppin' , sans-serif;
        position: absolute;
        font-size: 2rem;
        right: 11rem;
        bottom: 1rem;
        font-weight: 500;
        background-color: #fff;
        color: #555d78;
        .difficult{
            box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
            padding: .5rem 1rem;
            letter-spacing: 0px;
            border-radius: 4px;
        }
        .plus-difficult{
            padding: .5rem .5rem;
            letter-spacing: 0;
            cursor: pointer;
            background-color: hsl(360, 100, 70);
            color: #fff;
            transition: .25s background-color;
            &:hover{
                background-color: hsl(360, 100, 50);
            }
        }
    }

    .btn-wrapper{
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        
        
        .btn{
            font-family: 'Poppin';
            text-align: center;
            z-index: 2;
            padding: 0;
            margin: 0;
            cursor: pointer;
        }

    }

    .wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        #para{
        }
        #plus{
            font-size: 100px;

        }
    }

    .voice-img{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: auto;
        bottom: 20px;
        background-color: rgba(94, 94, 94, 0.096);
        border-radius: 50%;
        box-shadow: 0px 5px 7px -4px rgba(0,0,0,0.71);
    }

    .title{
        position: absolute;
        top: 0;
        padding: 10px 20px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 20px;
        background-color: #303030;
        color: #fff;
        display: flex;
        opacity: 0;
        p{
            font-size: 40px;
            font-family: 'Poppin';
            letter-spacing: normal;
        }
        animation: moving-text 2s;
    }

    @keyframes moving-text {
        0%{
            opacity: 0;
        }
        30%{
            opacity: 100%;        
        }
        70%{
            opacity: 100%;        
        }
        100%{
            opacity: 0;
        }
    }

}
</style>