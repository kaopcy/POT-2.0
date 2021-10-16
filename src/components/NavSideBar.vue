<template>
<div class="wrapper">
    <!-- Burger Button -->
    <div class="button" >
        <input type="checkbox" id="burger-toggle" @click="toggle">
        <label for="burger-toggle" class="burger-menu">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </label>
    </div>
    <!-- Side bar -->
    <div class="nav-side-bar">
        <div class="header">
            <span>PLD</span>
        </div>
        <div class="detail" v-for="link in linkData" :key="link.id">
            <div class="link" :class="curRoute == link.name ? 'active' : '' " >
                <img :src="require(`../../public/assets/${curRoute == link.name ? link.selectSrc: link.src}`)" class="icon" >
                <router-link :to="{ name: link.name }"  class="router-link" >{{ link.name }}</router-link>
            </div>
        </div>
        <footer class="user">
            <div class="user-name-wrapper" v-if="this.$store.state.login">
                <div class="user-name" >
                    <span style="font-size:20px">ID:</span> {{ this.$store.state.username }}
                </div>
                <div class="icon-wrapper" @click="signout()">
                    <img src="../../public/assets/logout_white.svg" alt="" class="icon"> 
                </div>
            </div>
            <div class="login-wrapper" v-else >
                <router-link class="login"  :to=" { name: 'Login' } ">LOGIN</router-link> 
                <img src="../../public/assets/login_white.svg" style="max-width:2rem;" class="icon">
            </div>
        </footer>
    </div>
</div>
</template>

<script>

export default {
    data() {
        return {
            curRoute: 'Home',

            linkData: [
                {
                    id: 1,
                    name: 'Home',
                    selectSrc: 'home_black.svg',
                    src: 'home_white.svg'
                },
                {
                    id: 2,
                    name: 'Learn',
                    selectSrc: 'learn_black.svg',
                    src: 'learn_white.svg'
                },
                {
                    id: 3,
                    name: 'Test',
                    selectSrc: 'test_black.svg',
                    src: 'test_white.svg'
                },
            ],
        }
    },
    methods: {
        toggle(){
            console.log('toggled');
            let nav = document.querySelector('.nav-side-bar');
            let btn = document.querySelector('.burger-menu');
            if(!nav.classList.contains('on')){
                nav.classList.add('on');
                btn.classList.add('on');
                return
            }
            else{
                nav.classList.remove('on');
                btn.classList.remove('on');
            } 
        },
        signout(){
            this.$store.commit('updateUsername' , '')
            this.$store.state.login = ('updateLogin' , false);
            this.$router.push({ name: 'Login'}); 
        }
    },
    watch:{
        $route(){
            if ( this.$route.name == 'Login' ) this.curRoute = 'Home'
            else this.curRoute = this.$route.name
        }
    }
}
</script>

<style lang="scss" scoped>
@font-face {
    font-family: 'Roboto-Regular';
    src: url('../../public/font/Roboto-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
.wrapper{
    z-index: 10001 !important;
    position: relative;
    width: 250px;
    height: 100%;
    .button{
        
    }
}
.nav-side-bar{
    font-family: 'Roboto-Regular' , sans-serif;
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-color: #12101d;
    transition: 0.5s all;
    display: flex;
    flex-direction: column;

    .header{
        background-color: #1d1a31;
        padding: .35rem  1rem;
        margin: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        span{
            font-size: 3rem;
            color: #fff;
            font-weight: 800;
            letter-spacing: 5px;
        }
    }

    .detail{
        display: flex;
        flex-direction: column;
        padding: 0 1rem;
        
        .active {
            width: 100%;
            background-color: #fff !important;
            color: #000 !important;
            .router-link{
                color: rgb(0, 0, 0) !important; 
            }
        }
        .link{
            display: flex;
            flex-direction: row;
            align-items: center;
            border-radius: 13px;
            padding: .35rem 0;
            margin: .25rem 0;

            &:hover{
                background-color: #1e1b30;
            }
            .icon{
                max-width: 1.5rem;
                margin: 0 1rem;   
                margin-left: 1.5rem;             
            }

            .router-link{
                text-decoration: none;
                color: #fff;
                font-size: 1.5rem;
                font-weight: 750;
                padding: 1rem .5rem ;
            }
        }
    }

    .user{
        position: absolute;
        width: 100%;
        height: 100px;
        bottom: 0;
        left: 0;
        background-color: #1e1b30;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 1.5rem;
        .user-name-wrapper{
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: space-between;
            padding: 0 .5rem 0 .5rem;
            .icon-wrapper{
                background-color: transparent;
                &:hover{
                    background-color: #332e53;
                }
                padding: .5rem .75rem .15rem .5rem;
                border-radius: 10px;
                .icon{
                    width: 2rem;
                }
            }
            .user-name{   
                font-size: 1rem;
                width: 70%;
                color: #fff;
                overflow-wrap: break-word;
            }   
        }
        .login-wrapper{
            display: flex;
            flex-direction: row;
            background-color: #f4b942;
            padding: 1rem 3rem;
            border-radius: 20px;
            transition: .5s background-color;
            align-items: center;
            justify-content: center;
            box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

            &:hover{
                background-color: #fab223;
            }
            .login{
                font-weight: 900;
                font-size: 2rem;
                color: #fff;
                text-decoration: none;
            }
            .icon{
                margin-left: 1rem;
            }

        }
    }
}

.nav-side-bar.on{
    left: 0%;
}

// Burger Menu
.burger-menu.on{
    left: 100%;
}
.burger-menu {
    --burger-menu-radius: 4em;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    display: block;
    width: var(--burger-menu-radius);
    height: var(--burger-menu-radius);
    outline: none;
    cursor: pointer;
    transition: 0.5s;

    &::before{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #fff;
        content: '';
        transform: scaleX(0);
        transition: 0.25s;
        transform-origin: left;
        border-radius: 20px;
    }

  .line {
    position: absolute;
    left: 25%;
    width: 50%;
    height: 3px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    transition: 0.5s;

    &:nth-child(1) {
      top: 30%;
    }

    &:nth-child(2) {
      top: 50%;
    }

    &:nth-child(3) {
      top: 70%;
    }

    &::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #303030;
      transform: translateX(-100%);
      transition: 0.25s;
    }

    @for $i from 2 through 3 {
      &:nth-child(#{$i})::after {
        transition-delay: 0.1s * ($i - 1);
      }
    }
  }

  &:hover {
    .line::after {
      transform: translateX(0);
    }
  }
}
#burger-toggle {
  position: absolute;
  appearance: none;

  &:checked {
    & ~ .burger-menu {
        &::before{
            transform: scaleX(100%);
        }
      .line {
        &::after {
          transform: translateX(0);
        }

        &:nth-child(1) {
          transform: translateY(calc(var(--burger-menu-radius) / 5))
            rotate(45deg);
        }

        &:nth-child(2) {
          transform: scaleX(0);
        }

        &:nth-child(3) {
            transform: translateY(calc(var(--burger-menu-radius) / -5))
            rotate(-45deg);
        }
      }
    }
  }
}
</style>