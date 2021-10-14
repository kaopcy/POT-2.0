<template>
  <div class="edit">
      <div class="wrapper">
          <button id="btn">Click to save</button>
          <input type="button" id="btn-createfile" value="Create new file">
      </div>
  </div>
</template>

<script>
import exampleJSON from '../assets/letter/level1.json'


export default {
    name: 'Edit',
    data() {
        return {
            
            examData: exampleJSON.level1,
            pushData:
            {
                "char": "ค",
                "color": "black",
                "src":"consonant/คอ.mp3",
                "swap":"0"
            },
        }
    },
    mounted(){
        
        
    }
}
</script>

<style lang="scss" scoped>

</style>