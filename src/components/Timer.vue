<template>
<div class="wrapper">
    <div class="minute">
        {{minute}}
    </div>
    <span>:</span>
    <div class="second">
        {{second}}
    </div>
</div>
</template>

<script>
export default {
    props: ["time"],
    data() {
        return {
            
        }
    },
    computed: {
        minute: function(){
            const minute =  parseInt(this.time / 60)
            return minute >= 10 ? minute : `0${minute}`
        },

        second: function(){
            const second = this.time % 60
            return second >= 10 ? second : `0${second}`
        }
    },
    mounted(){

    }
}
</script>

<style lang="scss" scoped>
.wrapper{
    padding: .5rem 1rem;
    z-index: 1001;
    width: 140px;
    position: absolute;
    font-size: 2rem;
    font-family: 'Poppin' , sans-serif;
    letter-spacing: 5px;
    font-weight: 500;
    background-color: #fff;
    color: #555d78;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    border-radius: 4px;
    .minute{
        position: relative;
        &::before{
            content: 'min';
            position: absolute;
            font-size: .6rem;
            top: 79%;
            left: 50%;
            transform: translate(-50% , 0);
        }
    }
    .second{
        position: relative;
        &::before{
            content: 'sec';
            position: absolute;
            font-size: .6rem;
            top: 79%;
            left: 50%;
            transform: translate(-50% , 0);
        }
    }

}
</style>