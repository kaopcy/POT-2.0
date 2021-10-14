<template>
  <div class="app" id="app">
    <Navbar id="nav-bar"/>
    <div id="warn">please login first</div>
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
  mounted() {
    var timeout;
    window.onmousemove = function(){
        document.getElementById('nav-bar').style.transform = 'translateX(0%)'
        document.getElementById('app').style.cursor = 'unset'
        clearTimeout(timeout);
        timeout = setTimeout(function(){ 
            document.getElementById('nav-bar').style.transform = 'translateX(-101%)'
            document.getElementById('app').style.cursor = 'none'
            console.log('not moving')
        }, 1500);
    }
  },

  created() {
    if(!this.$store.state.login && this.$route.name !== 'Login'){
      this.$router.replace({ name: 'Login'})
    }
  },
  
  watch:{
    $route(){
      if(this.$route.name !== 'Login' && this.$store.state.username === ''){
        document.getElementById('warn').style.opacity = '100%'
        this.$router.replace( {name: 'Login'})
        setTimeout(() => {
          document.getElementById('warn').style.opacity = '0%'
        }, 2000);
      }
    }
  }

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
  cursor: unset;
  #nav-bar{
    transition: 0.5s all;
  }
  #warn{
    z-index: 10000;
    font-size: 20px;
    font-weight: 700;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    color: rgb(233, 59, 59);
    opacity: 0%;
    transition: .5s ease-in-out;
  }
}
// .router{    
//   animation: fadein 1s;
// }
// @keyframes fadein {
//   0%{
//     opacity: 0;
    
//   }
//   100%{
//     opacity: 100%;
    
//   }
// }
</style>