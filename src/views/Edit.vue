<template>
  <div class="edit">
      <div class="wrapper">
          <div id="para2"></div>
      </div>
      <form action="">
          <div class="show-data">
          </div>
      </form>
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
    name: 'Edit',
    data() {
        return {
            data1: null,
            data2: null,
            data3: null,
            data4: null,
            data5: null,
            data6: null,
            data7: null,
            data8: null,
            data9: null,
            data10: null,
            innerText: '',
            word: {},
            upperLetter: ['่' , '้' , '๊' , "๋" , "ิ" , 'ี' , 'ึ' , 'ื' , 'ั' , 'ํ' , '็' , '์'  ],
            lowerLetter: [ 'ุ', 'ู'],
            textProperty: {
                letterSpacing: 30,
                fontSize: 250,
            },

            track: null,
            dataIndex: 0,
        }
    },
    methods: {
        initialData(){
            this.data1 = json1.level1
            this.data2 = json2.level2
            this.data3 = json3.level3
            this.data4 = json4.level4
            this.data5 = json5.level5
            this.data6 = json6.level6
            this.data7 = json7.level7
            this.data8 = json8.level8
            this.data9 = json9.level9
            this.data10 = json10.level10
        },
        
        handleInnerText(data , index){
            console.log(`length is ${data[index].length}`)
            let length = data[index].length;
            let para = document.getElementById("para2")
            let tempText = [];
            let tempColor = [];
            let tempSwap = [];
            
            console.log(`temp string before swap :${tempText}`)
            for(let i = 0 ; i < length; i++){
                if(data[index][i].char !== ''){
                    console.log(`datachar [${i}]: ${data[index][i].char}`)
                    tempText.push(data[index][i].char);
                    tempColor.push(data[index][i].color);
                    tempSwap.push(data[index][i].swap);
                }
            }         
            console.log(`temp string before swap :${tempText}`)
            for(let i = 0; i< tempColor.length; i++){
                if(tempSwap[i] != 0){
                    let swap = tempSwap[i]
                    console.log(`we have to swap ${tempText[i]} and ${tempText[(i-swap)]}`)
                    tempText.splice(i-swap , 0 , tempText[i])
                    tempColor.splice(i-swap , 0 , tempColor[i])
                    tempText.splice(i+1 , 1 )
                    tempColor.splice(i+1 , 1)
                } 
            }
            
            console.log(` temp color: ${tempColor} temp text: ${tempText} swap: ${tempSwap}`)
            for(let i = 0 ; i < tempColor.length; i++){
            //ถ้าตัวเองหรือตัวหลังไม่เป็น
                if(this.upperLetter.indexOf(tempText[i]) === -1 || this.upperLetter.indexOf(tempText[i-1]) === -1){
            //ถ้าตัวต่อหลังเป็น uppercase แต่ตัวเองก็ไม่ได้เป็น uppercase ให้ letter space เป็น เช่น กิน หิว หัว
                    if(this.upperLetter.indexOf(tempText[i+1]) === -1 && this.lowerLetter.indexOf(tempText[i+1]) === -1)
                    this.innerText =  this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize+(i*0.5)}px; 
                        letter-spacing:${this.textProperty.letterSpacing}px;
                        opacity:70%;
                        color:${tempColor[i]}
                        ">${tempText[i]}</span>`);
            //ถ้าตัวต่อหลังเป็น uppercase และตัวเองก็เป็น uppercase เหมือนกัน ให้ตัวเองมี letter space เป็น 0 เช่น มั่ว จั่ว ติ๋ม
                    else
                    this.innerText =  this.innerText.concat(`<span style="
                        font-size:${this.textProperty.fontSize+(i*0.5)}px; 
                        letter-spacing:${this.textProperty.letterSpacing*0}px;
                        color:${tempColor[i]}
                        ">${tempText[i]}</span>`);
                }
                else {
                    this.innerText =  this.innerText.concat(`<sup style="
                        font-size:${this.textProperty.fontSize + 10}px; 
                        letter-spacing:${this.textProperty.letterSpacing}px;
                        color:${tempColor[i]}
                        ">${tempText[i]}</sup>`);
                    console.log(`vowel state is ${tempText[i]}`)

                }
            }
            console.log(`finally string is ${this.innerText}`)
            para.innerHTML = this.innerText
        },

        clearInnerText(){
            this.innerText = '';
        },
        getDataByNum(num){
            switch (num) {
                case 1: return this.data1;
                case 2: return this.data2;
                case 3: return this.data3;
                case 4: return this.data4;
                case 5: return this.data5;
                case 6: return this.data6;
                case 7: return this.data7;
                case 8: return this.data8;
                case 9: return this.data9;
                case 10: return this.data10;
                default: return this.data1;
            }
        },

        playSound(src){
            this.track = new Audio();
            this.track.src = src;
            this.track.play();
        }


    },
    mounted() {
        

        let dataIndex = 6;
        let data = this.getDataByNum(dataIndex);
        let length = data.length
        let index = 0;
        window.addEventListener('keyup' , (e)=>{
            if(e.code === 'ArrowRight'){
                index++;
                if(index < length){
                    this.handleInnerText(data , index);
                    this.clearInnerText();
                }
                else {
                    alert('index out of bound')
                    index = length-1;
                }
            }
            if(e.code === 'ArrowLeft'){
                index--;
                if(index < length ){
                    this.handleInnerText(data , index);
                    this.clearInnerText();
                }
                else alert('index out of bound')
            }
            
        })
        
    },
    created() {
        this.initialData();
        for(let i = 0; i< this.data1.length; i++){
            for(let j = 0; j< this.data1[i].length; j++){
                console.log(this.data1[i][j])
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
.edit{
    font-family: 'Sarabun' , sans-serif !important;
    font-size: 250px;
    letter-spacing: 30px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgb(184, 184, 184);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    .wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 5;
        #para2{
            
            
        }
    }
    form{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
    }
}
</style>