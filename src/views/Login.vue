<template>
  <div class="login">
      <div class="content">
        <h1>LOGIN</h1>
        <input type="text" class="login-input" v-model="username">
        <div class="btn" @click="login">GO</div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            username: '',
        }
    },
    methods: {
        login(){
            this.$store.commit('updateUsername',this.username );
            this.$store.commit('updateLogin',true );
            this.$router.replace({ name: 'Home'})      
        }
    },
    created() {
        this.username = this.$store.state.username;
    },

}
</script>

<style lang="scss" scoped>
.login{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .content{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        h1{
            font-size: 60px;
            font-weight: 900;
            color: #fff;
            align-self: flex-start;
        }
        input[type=text]{
            font-size: 40px;
            padding: 5px 20px;
        }
        .btn{
            align-self: flex-end;
            color: #fff;
            font-size: 30px;
            text-align: center;
            margin-top: 5px;
            padding: 5px 20px;
            background-color: rgb(78, 255, 87);
            border-radius: 20px;
            cursor: pointer;
            font-weight: 800;
            letter-spacing: 3px;
            transition: 0.2s all ;
            &:hover{
                padding: 5px 50px;
            }
            &:active{
                background-color: rgb(255, 62, 62);
            }
        }

    }
}
</style>