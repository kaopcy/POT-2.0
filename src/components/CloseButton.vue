<template>
    <span class="cross-stand-alone">
        <span class="span1"></span>
        <span class="span2"></span>
    </span>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.cross-stand-alone{
    position: absolute;
    right: 0;
    width: 30px;
    height: 30px;
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
        border-radius: 20px;
        position: absolute;
        height: 3px;
        width: 100%;
        background-color: red;
        &.span1{
            transform: rotate(45deg);
        }
        &.span2{
            transform: rotate(-45deg);
        }
    }
}
</style>
