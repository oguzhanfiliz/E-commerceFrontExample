<template>
  <v-app>
    <v-main>
      <Menu></Menu>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import Menu from "@/components/Menu.vue";

</script>

<style>
body{
  margin:0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>