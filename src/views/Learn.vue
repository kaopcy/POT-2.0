<template>
    <div class="learn" id="learn">
        <div id="time">
            <div class="text-container difficult-wrapper">
                <TimerComponent :time="$store.state.timeLeft" />
                <div class="difficult">Difficult: {{ myVocab.curLevel }}</div>
                <div class="plus-difficult">+</div>
            </div>
            <div class="text-container username-container">
                Name: {{ $store.state.username }}
            </div>
            <div class="text-container end-container" @click="$router.replace({name: 'EndScore'})">
                end
            </div>
        </div>
        <!-- showing text -->
        <div id="kumthai"></div>
        <img src="../assets/voice.png" class="voice-img" v-if="voiceImg">
    </div>
</template>

<script>
import Vocaburaly from '../composables/Vocabulary.js'
import TimerComponent from  '../components/TimerComponent.vue'
import WordTimer from '../composables/wordTimer'

export default {
    name: 'Learn',
    components:{
        TimerComponent,
    },
    data() {
        return {
            myVocab: null,
            level: null,
            
            // text property
            innerText: '',
            toneLetter: ["่", "้", "๊", "๋"],
            upperLetter: ['่' , '้' , '๊' , "๋" , "ิ" , 'ี' , 'ึ' , 'ื' , 'ั' , 'ํ' , '็' , '์',],
            lowerLetter: [ 'ุ', 'ู'],
            longLetter: ['ป','ฬ','ฝ','ฟ'],
            textProperty: {
                letterSpacing: 60,
                fontSize: 250,
                textDelay: 500,
                wordDelay: 2000,
            },

            // voice
            voiceImg: false,
            voice: new Audio(),

            // Event
            onVoiceError: null,
            onVoiceEnd: null,
            onKeyDown: null,
            onKeyUp: null,

            // Timeout
            characterTimeout: null,
            wordTimeout: null,

            // interval
            wordTimer: null,
            categoryTimer: null,
            timerInterval: null,
        }
    },

    methods: {
        handleInnerText(character){
            let sequence = 0;
            let temp= {
                tempText: [],
                tempColor: [],
                tempSwap: [],
                tempSequence: [],
                tempSequenceSwap: [],
                opacity: '0',
            }

            for(let i = 0 ; i < this.myVocab.wordLength; i++){
                if(this.myVocab.word[i].char !== ''){
                    temp.tempText.push(this.myVocab.word[i].char);
                    temp.tempColor.push(this.myVocab.word[i].color);
                    temp.tempSwap.push(this.myVocab.word[i].swap);
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
                // if (!temp.tempText[i+1] && !this.upperLetter.includes(temp.tempText[i])){
                //     this.innerText = this.innerText.concat(`<span style="
                //         font-size:${this.textProperty.fontSize + i * 0.5}px; 
                //         letter-spacing: 0;
                //         opacity:${temp.opacity}%;
                //         color:${temp.tempColor[i]};
                //         "
                //         id="text${i}";
                //         >${temp.tempText[i]}</span>`);
                //     continue;
                // }

                // ป่าว ฝ้า ฟ้าผ่า
                if (
                    this.longLetter.includes(temp.tempText[i - 1]) &&
                    this.upperLetter.includes(temp.tempText[i]) &&
                    !this.upperLetter.includes(temp.tempText[i + 1])
                ) {
                    this.innerText = this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize + i * 0.5}px; 
                        letter-spacing:${this.textProperty.letterSpacing * 2}px;
                        opacity:${temp.opacity}%;
                        color:${temp.tempColor[i]};
                        "
                        id="text${i}";
                        >${temp.tempText[i]}</span>`);
                    continue;
                }

                if (
                    this.longLetter.includes(temp.tempText[i - 2]) &&
                    this.lowerLetter.includes(temp.tempText[i - 1]) &&
                    this.upperLetter.includes(temp.tempText[i]) &&
                    !this.upperLetter.includes(temp.tempText[i + 1])
                ) {
                    this.innerText = this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize + i * 0.5}px; 
                        letter-spacing:${this.textProperty.letterSpacing * 2}px;
                        opacity:${temp.opacity}%;
                        color:${temp.tempColor[i]};
                        "
                        id="text${i}";
                        >${temp.tempText[i]}</span>`);
                    continue;
                }

                if (
                    this.longLetter.includes(temp.tempText[i - 1]) &&
                    this.lowerLetter.includes(temp.tempText[i]) &&
                    this.toneLetter.includes(temp.tempText[i + 1])
                ) {
                    this.innerText = this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize + i * 0.5}px; 
                        letter-spacing:${this.textProperty.letterSpacing * 0}px;
                        margin-right:${this.textProperty.letterSpacing * -1}px;
                        opacity:${temp.opacity}%;
                        color:${temp.tempColor[i]};
                        "
                        id="text${i}";
                        >${temp.tempText[i]}</span>`);
                    continue;
                }

                // ถ้าตัวเองเป็น long letter
                if(this.longLetter.indexOf(temp.tempText[i]) !== -1 ){
                    if (this.upperLetter.indexOf(temp.tempText[i+1]) !== -1) //ถ้าตัวหลังเป็น upper ให้ letter spacing = -60
                        this.innerText =  this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize+(i*0.5)}px; 
                        letter-spacing:${this.textProperty.letterSpacing * (-1)}px;
                        opacity:${temp.opacity}%;
                        color:${temp.tempColor[i]};
                        "
                        id="text${i}";
                        >${temp.tempText[i]}</span>`);
                    else if( this.lowerLetter.indexOf(temp.tempText[i+1]) !== -1 ) //ถ้าตัวหลังเป็น lower ให้ letter spacing = 0
                        this.innerText =  this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize+(i*0.5)}px; 
                        letter-spacing:${this.textProperty.letterSpacing * 0}px;
                        opacity:${temp.opacity}%;
                        color:${temp.tempColor[i]};
                        "
                        id="text${i}";
                        >${temp.tempText[i]}</span>`);
                    else                                                          //ถ้าตัวหลังไม่เป็น lower , upper ให้ letter spacing = 60
                        this.innerText =  this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize+(i*0.5)}px; 
                        letter-spacing:${this.textProperty.letterSpacing}px;
                        opacity:${temp.opacity}%;
                        color:${temp.tempColor[i]};
                        "
                        id="text${i}";
                        >${temp.tempText[i]}</span>`);
                }
                //ถ้าตัวเองหรือตัวหลังไม่เป็น Upper , Lower
                else if(this.upperLetter.indexOf(temp.tempText[i]) === -1 || this.upperLetter.indexOf(temp.tempText[i-1]) === -1){
                    //ถ้าตัวต่อไปไม่เป็น upper , lower 
                    if(this.upperLetter.indexOf(temp.tempText[i+1]) === -1 && this.lowerLetter.indexOf(temp.tempText[i+1]) === -1){
                        
                        if (this.longLetter.indexOf(temp.tempText[i-1]) !== -1 ){
                            this.innerText =  this.innerText.concat(`<span style="
                            font-size:${this.textProperty.fontSize+(i*0.5)}px; 
                            letter-spacing:${this.textProperty.letterSpacing}px;
                            opacity:${temp.opacity}%;
                            color:${temp.tempColor[i]};
                            "
                            id="text${i}";
                            >${temp.tempText[i]}</span>`);
                        }
                        else{

                            this.innerText =  this.innerText.concat(`<span style="
                            font-size:${this.textProperty.fontSize+(i*0.5)}px; 
                            letter-spacing:${this.textProperty.letterSpacing}px;
                            opacity:${temp.opacity}%;
                            color:${temp.tempColor[i]};
                            "
                            id="text${i}";
                            >${temp.tempText[i]}</span>`);
                        } 

                    }
                    //ถ้าตัวต่อหลังเป็น uppercase และตัวเองก็เป็น uppercase เหมือนกัน ให้ตัวเองมี letter space เป็น 0 เช่น มั่ว จั่ว ติ๋ม
                    else 
                        this.innerText =  this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize+(i*0.5)}px; 
                        letter-spacing:${this.textProperty.letterSpacing*0}px;
                        opacity:${temp.opacity}%;
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
                            opacity:${temp.opacity}%;
                            color:${temp.tempColor[i]}
                            "
                            id="text${i}";
                            >${temp.tempText[i]}</sup>`);
                    else
                        this.innerText =  this.innerText.concat(`<sup style="
                            font-size:${this.textProperty.fontSize + 0.5}px; 
                            letter-spacing:${this.textProperty.letterSpacing}px;
                            opacity:${temp.opacity}%;
                            color:${temp.tempColor[i]}
                            "
                            id="text${i}";
                            >${temp.tempText[i]}</sup>`);
                } 
            }
            
            // set text opacity to 1
            document.getElementById("kumthai").innerHTML = this.innerText;
            for (let i = 0; i < character+1; i++) {
                if(temp.tempSequence[i] != -1){
                    document.getElementById(`text${temp.tempSequence[i]}`).style.opacity = '1'
                }
            }
        },

        clearInnerText(){
            this.innerText = '';
        },
        
        start(){
            let char = 0;
            let isListenKeyDown = false;
            let isListenKeyUp = false;
            this.startVoice(char);
            this.clearInnerText();

            this.onVoiceError = ()=>{
                if(!this.myVocab.word[char+1]){
                    isListenKeyDown = true;
                }else {
                    char++;
                    this.startVoice(char);
                    this.clearInnerText();
                }
            }

            this.onVoiceEnd = ()=>{
                let curDelay = undefined
                if (this.myVocab.word[char] && this.myVocab.word[char].delay === 0) {
                    curDelay = this.myVocab.word[char].delay;
                }

                this.characterTimeout = setTimeout(() => {
                    if(!this.myVocab.word[char+1]){
                        isListenKeyDown = true;
                    } else {
                        char++;
                        this.startVoice(char);
                        this.clearInnerText();
                    }
                }, curDelay ?? this.textProperty.textDelay);
            }

            this.onKeyDown = (event)=>{
                if(event.code === 'Space'){
                    if(isListenKeyDown && !isListenKeyUp){
                        this.voiceImg = true;
                        // Start sound record here.....
                
                        // =============================
                        isListenKeyUp = true;
                    }
                }
            }

            this.onKeyUp = (event)=>{
                if (event.code === 'KeyU'){
                    console.log('changed');
                    this.$router.replace({ name: 'Learn' , params:{ id: this.level+1 } })
                }

                if( event.code === 'Space' && isListenKeyUp ){
                    isListenKeyDown = false;
                    isListenKeyUp = false;
                    this.voiceImg = false;
                    //Score up
                    this.$store.commit('LearnScoreUp')
                    if (this.wordTimer) {
                        this.$store.commit( 'updateResult' , { 
                            level: this.myVocab.curLevel,
                            word: this.myVocab.curWordID , 
                            time: this.wordTimer.deltaTime 
                        })
                        console.log(this.$store.state.result);
                    } 
                    // End sound record here.....

                    // =============================

                    //* Next word
                    this.wordTimer = new WordTimer()
                    document.getElementById('kumthai').innerHTML = '+'
                    this.wordTimeout = setTimeout(() => {
                        // check if vocab pass practice state
                        this.myVocab.setNewRandomWord();
                        char = 0;
                        this.startVoice(char);
                        this.clearInnerText();
                    }, this.textProperty.wordDelay);
                }

                if( event.code === 'KeyR'){
                    char = 0;
                    this.startVoice(char);
                    this.clearInnerText();
                }
            }

            this.voice.addEventListener( 'error' , this.onVoiceError )
            this.voice.addEventListener( 'ended' , this.onVoiceEnd )
            window.addEventListener( 'keydown' , this.onKeyDown )
            window.addEventListener('keyup' , this.onKeyUp )

        },

        startVoice(char){
            this.voice.src = this.myVocab.word[char].src ?? '';
            this.voice.play();  
            this.handleInnerText(char);
        },
    },

    created(){
        this.level = parseInt(this.$route.params.id)
        this.myVocab = new Vocaburaly(this.level)

        // initial category timer 
        switch (this.level) {
            case 2:
                this.categoryTimer = 20;     
                break;
            case 3:
                this.categoryTimer = 20;     
                break;
            case 4:
                this.categoryTimer = 20;     
                break;
            case 5:
                this.categoryTimer = 20;     
                break;
            case 6:
                this.categoryTimer = 20;     
                break;
            case 7:
                this.categoryTimer = 20;     
                break;
            case 8:
                this.categoryTimer = 20;     
                break;
            case 9:
                this.categoryTimer = 20;     
                break;
            case 10:
                this.categoryTimer = 20;     
                break;
        
            default:
                break;
        }
    },

    mounted() {
        // add idle listener
        const handleIdle = ()=>{
            var timeout;
            document.onmousemove = function(){
                document.getElementById('time').style.opacity = '1'
                clearTimeout(timeout);
                timeout = setTimeout(function(){ 
                    document.getElementById('time').style.opacity = '0'
                    console.log('not moving')
                }, 1500);
            }
        }

        // always delay before start
        document.getElementById('kumthai').innerHTML = '+'
        setTimeout(()=>{
            this.wordTimer = new WordTimer()
            this.start();
            handleIdle();
        } , 2000 )

        // set timer interval
        this.timerInterval = setInterval(() => {
            this.$store.commit('minusTime');
            this.categoryTimer -= 1

            // next category 
            if (this.categoryTimer <= 0){
                if(this.level < 10) {
                    this.$router.replace({ name: 'Learn' , params:{ id: this.level+1 } })
                } else {
                    this.$router.place({ name: 'EndScore' })
                }
            }

        }, 1000);

    },

    beforeDestroy(){
        // clear all eventlistener 
        this.voice.removeEventListener( 'error' , this.onVoiceError )
        this.voice.removeEventListener( 'ended' , this.onVoiceEnd )
        window.removeEventListener( 'keydown' , this.onKeyDown )
        window.removeEventListener('keyup' , this.onKeyUp )
        document.onmousemove = null

        // clear all timeout
        clearTimeout(this.characterTimeout);
        clearTimeout(this.wordTimeout);

        // clear all interval
        clearInterval(this.timerInterval);

        // reset voice
        this.voice.pause();
        this.voice = new Audio();
        this.innerText = '';
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

.learn{
    padding: 0;
    margin: 0;
    font-family: 'Sarabun' , sans-serif !important;
    font-size: 250px;
    letter-spacing: 30px;
    position: absolute;
    inset: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    transition: 0.5s all;
    overflow: hidden;

    #time{
        opacity: 0;
        transition: 0.5s opacity;
        position: absolute;
        right: 1rem;
        bottom: 1rem;
        display: flex;
        gap: 1rem;
    }

    .username-container{
        position: relative;
    }

    .end-container{
        position: relative;
        background: rgb(255, 62, 62);
        color: #fff;
        cursor: pointer;
        font-weight: 600;
        &:hover{
            background: rgb(255, 31, 31);
        }
    }

    .difficult-wrapper{
        position: relative;
        display: flex;
        flex-direction: row;
        font-family: 'Poppin' , sans-serif;
        align-items: center;
        font-size: 2rem;
        font-weight: 500;
        background-color: #fff;
        border: 1.5px solid rgb(209, 209, 209);
        border-radius: 8px;
        padding: 0.3rem 1rem;
        gap: .5rem;
        .difficult{
            letter-spacing: 0px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
            font-weight: normal;
            font-size: 1rem;
        }
        .plus-difficult{
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: 0;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            cursor: pointer;
            background-color: rgb(250, 62, 62);
            color: #fff;
            transition: .25s background-color;
            &:hover{
                background-color: rgb(255, 0, 0);
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
        #plus{
            font-size: 100px;

        }
    }

    .voice-img{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: auto;
        bottom: 3rem;
        border-radius: 50%;
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