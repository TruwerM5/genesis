<script setup lang="ts">
import { ref } from 'vue';
import {useAppStore} from '@/stores/store';
const selected = ref< {mode: 'leads' | 'companies' | 'contacts' | 'none'} >({mode: 'none'});

const appStore = useAppStore();

function handleChange(e:Event) {
    e.preventDefault();
    appStore.mode = selected.value.mode;
    appStore.buttonState = 'active';
}

</script>
<template>
    <select class="select" @change="handleChange" v-model="selected">
        <option class="option" selected disabled :value="{mode: 'none'}">Не выбрано</option>
        <option :value="{mode: 'leads'}" class="option">Сделка</option>
        <option :value="{mode: 'contacts'}" class="option">Контакт</option>
        <option :value="{mode: 'companies'}" class="option">Компания</option>
    </select>
</template>
<style scoped lang="sass">
.select
    height: 40px
    width: 150px
    font-size: 18px
</style>