<template>
    <div class="practice">
        <div id="wrapper">
            <div class="content" id="para"> </div>
           
        </div>
        <div class="test">{{word}}</div>
        
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

export default {
    name: 'Practice',
    data() {
        return {
            difficult: 1,
            currentJson: null,
            innertext: '',
            upperLetter: ['่' , '้' , '๊' , "๋" , "ิ" , 'ี' , 'ึ' , 'ื' , 'ั' , 'ํ' , '็' , '์' ],
            lowerLetter: [ 'ุ', 'ู'],
        }
    },

    methods: {
        handleJson(){
            if(this.difficult === 1 )  this.currentJson = json1;
            if(this.difficult === 2 )  this.currentJson = json2;
            if(this.difficult === 3 )  this.currentJson = json3;
            if(this.difficult === 4 )  this.currentJson = json4;
            if(this.difficult === 5 )  this.currentJson = json5;
            if(this.difficult === 6 )  this.currentJson = json6;
            if(this.difficult === 7 )  this.currentJson = json7;
            if(this.difficult === 8 )  this.currentJson = json8;
            if(this.difficult === 9 )  this.currentJson = json9;
            if(this.difficult === 10)  this.currentJson = json10;
        }
    },

    mounted() {
        this.handleJson();
        let length = this.word.length;
        let para = document.getElementById("para")
        let wrapper = document.getElementById('wrapper')
        console.log(`test of ${this.word.charAt(1)} :${this.lowerLetter.indexOf(this.word.charAt(1)) !== -1}`)
        wrapper.style.width = "500px";
        wrapper.style.height = "500px";
        
        for(let i = 0 ; i < length; i++){
            if(this.lowerLetter.indexOf(this.word.charAt(i)) === -1  && this.upperLetter.indexOf(this.word.charAt(i)) === -1){
                this.innertext=  this.innertext.concat(`<span style="
                    font-size:250px; 
                        letter-spacing:50px
                    ">${this.word.charAt(i)}</span>`);
            }  
            console.log(this.word.charAt(i))
        }
        para.innerHTML = this.innertext
    },

}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');



.practice{
    font-family: 'Sarabun' , sans-serif !important;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #303030;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    #wrapper{
        position: relative;
        border: 2px solid red;
    }
    .test{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        color: #fff;
        font-size: 250px;
        font-weight: normal;
        letter-spacing: 50px;
    }
    
}

</style>