<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import DropDownVue from './components/DropDownVue.vue';
import ButtonVue from './components/ButtonVue.vue';
import axios from 'axios';
import {useAppStore} from '@/stores/store';

const appStore = useAppStore();
const modes = ['lead', 'contact', 'company'];




</script>

<template>
  <div class="app">
    <h1 class="title">Genesis Test App</h1>
    <span class="subtitle">by Khalimov Ilsur</span>
    <div class="head">
      <DropDownVue />
      <ButtonVue />
    </div>
    <div class="content" v-if="appStore.instances.length > 0">
      <h3>Добавленные сущности ({{ appStore.instances.length }})</h3>
      <ul>
        <li v-for="instance,i in appStore.instances" :key="i">
          {{ instance }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="sass">
.head
  display: flex
  gap: 30px
  margin-bottom: 50px

.title
  color: #0092ca

.subtitle
  display: block
  margin-bottom: 40px
</style>
