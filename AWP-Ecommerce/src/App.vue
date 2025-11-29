<script setup>
import { RouterLink } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

function LogOut() {
  if (localStorage.getItem('user') != null) {
    localStorage.removeItem("user")
    router.push("main")
  }
}
</script>

<template>

  <!-- Insert Header component -->

  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />

  <nav>
    <RouterLink to="/log-in" id="log-in-link">Log In</RouterLink> | <RouterLink to="/sign-up">Sign Up</RouterLink> | <button @click="LogOut">Log Out</button>
  </nav>

  <RouterView/> <!-- This tag indicates the spot where each view will be rendered -->
  <!-- Every view component will be rendered between above h2 and below default vue template, for reference + id will be kept as html tag -->

  <h2>Secret message that i want below every view...</h2>

  <!-- Onclick or on change use fetch to re-retrieve data, can be modeled with other HTTP requests -->

  <!-- Insert Footer component -->

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
