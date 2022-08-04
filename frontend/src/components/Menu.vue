<template>
  <div>
    <nav>
      <ul>
        <router-link v-for="(menu,key) in menus" :key="key" class="li" :to="menu.to">{{menu.title}}</router-link>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
 defineProps(['menus']);
</script>

<style scoped>
ul {
  display:flex;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

.li {
  float: left;
}

.li {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.li:hover {
  background-color: #fb641b;
}

/*.active {*/
/*  background-color: #04AA6D;*/
/*}*/
</style>