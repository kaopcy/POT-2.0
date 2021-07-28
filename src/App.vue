<template>
  <div class="app">
    <Navbar/>
    <router-view class="router"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  name: 'app' ,

  components:{
    Navbar,
  },
  created() {
    if(!this.$store.state.login && this.$route.name !== 'Login'){
      this.$router.replace({ name: 'Login'})
    }
  },

}
</script>

<style lang="scss">
@font-face {
    font-family: 'Poppin';
    src: url('./assets/font/Poppins-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app{
  font-family: 'Poppin';
  background-color: rgb(20, 20, 20);
  width: 100vw;
  height: 100vh;
}
.router{    
  animation: fadein 1s;
}
@keyframes fadein {
  0%{
    opacity: 0;
    
  }
  100%{
    opacity: 100%;
    
  }
}
</style>