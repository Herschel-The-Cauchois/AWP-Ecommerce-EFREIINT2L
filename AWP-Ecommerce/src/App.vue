<script setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { defineProps, ref } from 'vue'
import {user_login, LoadUserLogin, UnloadUserLogin} from './login_info'

LoadUserLogin()
console.log("showing user_login")
console.log(user_login.value)
console.log("end showing user_login")

const router = useRouter()
</script>

<template>

  <Header />

  <RouterView/> <!-- This tag indicates the spot where each view will be rendered -->
  <!-- Every view component will be rendered between above h2 and below default vue template, for reference + id will be kept as html tag -->

  <!-- Onclick or on change use fetch to re-retrieve data, can be modeled with other HTTP requests -->

  <Footer />

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
