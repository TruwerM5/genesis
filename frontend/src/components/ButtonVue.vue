<script setup lang="ts">
import {useAppStore} from '@/stores/store';

const appStore = useAppStore();

</script>

<template>
    <div class="wrapper">
    <button class="button" 
    :class="appStore.buttonState"
     @click="appStore.create()"
     v-if="appStore.buttonState != 'loading'">
        Создать
    </button>
    <img v-else="appStore.getBtnState == 'loading'" src="/loading.png" alt="loading" class="loading">
    </div>
</template>

<style scoped lang="sass">
.wrapper
    position: relative
    width: 100px
    height: 40px
    display: flex
    background-color: #0092ca
.button
    display: block
    width: 100%
    height: 100%
    font-size: 20px
    justify-content: center
    align-items: center
    border: none
    &.active
        background-color: #0092ca
        color: #fff
    &.inactive
        background-color: #444
        opacity: 0.8
.loading
    position: absolute
    left: 50%
    top: 5px
    animation: 1.5s infinite reverse spin
    width: 30px
    height: 30px
    transform: translateX(-50%)
    
@keyframes spin 
    from
        transform: rotate(0)
    
    to 
        transform: rotate(360deg) 
    
</style>