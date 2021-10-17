<template>
<div class="wrapper">
    <div class="score">
        {{$store.state.learnScore}}
    </div>
</div>
</template>

<script>
export default {
    name: 'EndScore',
    data() {
        return {
            
        }
    },
}
</script>

<style lang="scss" scoped>
.wrapper{
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    .score{
        color: #fff;
    }
}
</style>