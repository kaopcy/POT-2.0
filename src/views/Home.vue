<template>
  <div class="home">
    <div class="content-wrapper">
      <div class="btn" id="learn-btn">
        <img src="../../public/assets/learn_black.svg" alt="" class="icon" id="learn-icon"> 
        <router-link :to="{ name: 'Learn'}" class="text" >Learn</router-link>
      </div>
      <div class="btn" id="test-btn">
        <img src="../../public/assets/test_black.svg" alt="" class="icon" id="test-icon"> 
        <router-link :to="{ name: 'Test'}" class="text" >Test</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      
    }
  },
  mounted() {
    const learn = document.getElementById("learn-btn")
    const test = document.getElementById("test-btn")
    const learnIcon = document.getElementById("learn-icon")
    const testIcon = document.getElementById("test-icon")
    learn.onmouseover = ()=>{
      learnIcon.src = require('../../public/assets/learn_white.svg')
    }
    learn.onmouseout = ()=>{
      learnIcon.src = require('../../public/assets/learn_black.svg')
    }
    test.onmouseover = ()=>{
      testIcon.src = require('../../public/assets/test_white.svg')
    }
    test.onmouseout = ()=>{
      testIcon.src = require('../../public/assets/test_black.svg')
    }
  },
}
</script>

<style lang="scss" scoped>
.home{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  

  .content-wrapper{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    .btn{
      display: flex;
      flex-direction: row;
      width: 300px;
      justify-content: center;
      align-items: center;
      margin: 50px;
      background-color: #fff;
      border-radius: 20px;
      cursor: pointer;
      transition: 0.3s all;
      &:hover{
        background-color: rgb(85, 238, 124);
        .text{
          color: #fff;
        }
      }
      .text{
        margin-left: 1rem;
        text-decoration: none;
        font-weight: 900;
        font-size: 60px;
        color: #303030;
      }
      .icon{
        max-height: 3rem;
      }
    }
  }

}
</style>