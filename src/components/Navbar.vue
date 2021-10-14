<template>
<div class="nav-wrapper">
    <div class="button" >
        <input type="checkbox" id="burger-toggle" @click="toggle">
        <label for="burger-toggle" class="burger-menu">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </label>
    </div>

    

    <div class="nav-bar">
        <header>
            POT
        </header>
        <div class="nav-content">
            <ul>
                <router-link :to="{ name: 'Home'}" class="link">Home</router-link>
                <router-link :to="{ name: 'Learn'}" class="link">Learn</router-link>
                <!-- <router-link :to="{ name: 'Practice'}" class="link">Practice</router-link> -->
                <router-link :to="{ name: 'Test'}" class="link">Test</router-link>
                    <!-- <router-link :to="{ name: 'Edit'}" class="link">Edit</router-link> -->
            </ul>
        </div>
        <footer>
            <div class="user-wrapper" v-if="this.$store.state.login">
                <div class="user">
                    <span>User: {{this.$store.state.username}}</span>
                </div>
                <div class="signout" @click="signout">
                    <span>SignOut</span>
                </div>
            </div>
            <router-link v-else class="login-btn" :to="{ name:'Login'}">
                Login
            </router-link>
        </footer>
    </div>
</div>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            isNav: false,
        }
    },
    methods: {
        toggle(){
            let nav = document.querySelector('.nav-bar');
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
}
</script>


<style lang="scss" scoped>

.nav-wrapper{
    z-index: 100000 !important;
    position: relative;
    width: 250px;
    height: 100%;
    .button{
        
    }
}

.nav-bar{
    position: relative;
    left: -100%;
    height: 100%;
    background-color: rgb(65, 65, 65);
    display: flex;
    flex-direction: column;
    transition: 0.5s all;
    border-bottom-right-radius: 50px;
    border-top-right-radius: 50px;
    header{
        width: 100%;
        font-size: 50px;
        text-align: center;
        font-weight: 900;
        pointer-events: none;
        flex: 1;
        
        background-color: #fff;
    }
    .nav-content{
        width: 100%;
        padding: 10px 20px;
        flex: 5;
        ul{
            display: flex;
            flex-direction: column;

            .link{
                text-decoration: none;
                color: #fff;
                margin-bottom: 10px;
                margin-left: 0;
                padding-left: 15px;
                font-size: 25px;
                font-weight: 900;
                transition: 0.3s all;
                border-radius: 20px;
                cursor: pointer;
                &:hover{
                    background-color: #fff;
                    color: #303030;
                }
                
            }
        }
    }
    footer{
        flex: 1;
        
        width: 100%;
        background-color: #fff;
        
        .user-wrapper{
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
            width: 100%;
            height: 100%;

            
            .user{
                position: absolute;
                top: 0;
                left: 0;
                width: 80%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                span{
                    font-size: 20px;
                    font-weight: 600;
                }
            }
            .signout{
                position: absolute;
                top: 0;
                left: 80%;
                width: 20%;
                height: 100%;
                background-color: rgb(255, 64, 64);
                transition: 0.25s all;
                transform-origin: right;
                cursor: pointer;
                &:hover{
                    background-color: rgb(255, 9, 9);
                    span{
                        color: #fff;
                    }
                }
                span{
                    transition: 0.25s all;
                    position: absolute;
                    transform-origin: top left;
                    top: 15px;
                    left: 30%;
                    
                    transform: rotate(-90deg) translateX(-100%);

                }
                
            }
        }

        .login-btn{
            text-decoration: none;
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
            margin-left: 0;
            justify-content: center;
            
            font-size: 40px;
            text-transform: uppercase;
            font-weight: 900;
            background-color: rgb(120, 243, 104);
            color: #fff;
            transition: 0.2s all ;
            
            &:hover{
                background-color: rgba(250, 61, 61, 0.993);
                
            }
            
        }
    }
    
}
.nav-bar.on{
    left: 0%;
}
.burger-menu.on{
    left: 100%;
}

// Burger Menu
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
    transition: 0.45s;

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