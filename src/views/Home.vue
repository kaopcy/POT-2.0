<template>
  <div class="home">
    <div class="content-wrapper">
      <router-link :to="{ name: 'Test'}" class="btn">Test</router-link>
      <router-link :to="{ name: 'Practice'}" class="btn">Practice</router-link>
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
      color: #303030;
      width: 300px;
      text-align: center;
      margin: 50px;
      background-color: #fff;
      border-radius: 20px;
      text-decoration: none;
      font-weight: 900;
      font-size: 60px;
      cursor: pointer;
      transition: 0.3s all;
      &:hover{
        background-color: rgb(85, 238, 124);
        color: #fff;
      }
    }
  }

}
</style>