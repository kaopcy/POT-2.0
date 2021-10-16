<template>
  <div class="login">
      <div class="content">
        <h1>LOGIN</h1>
        <input type="text" class="login-input" v-model="username">
        <div id="validated">Please enter name.</div>
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
            if (this.username == '' || this.username == null){
                this.validated()
                return
            }
            this.$store.commit('updateUsername',this.username );
            this.$store.commit('updateLogin',true );
            this.$router.replace({ name: 'Home'})      
        },
        validated(){
            const validatedDOM = document.getElementById('validated')
            validatedDOM.style.opacity = '100%'
            setTimeout(() => {
                validatedDOM.style.opacity = '0'
            }, 1500);
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
    background-color: #12122a;
    .content{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 2rem 2rem;
        background-color: #202031;
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
        h1{
            font-size: 60px;
            font-weight: 900;
            color: #fff;
            align-self: flex-start;
        }
        input[type=text]{
            min-width: 550px;
            font-size: 20px;
            padding: 15px 20px;
            box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
        }
        #validated{
            align-self: start;
            color: hsl(0, 100, 60);
            opacity: 0;
            transition: .5s opacity;
        }
        .btn{
            align-self: flex-end;
            color: #fff;
            font-size: 30px;
            text-align: center;
            margin-top: 5px;
            padding: 5px 20px;
            background-color: #f4b942;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 800;
            letter-spacing: 3px;
            transition: 0.2s all ;
            box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
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