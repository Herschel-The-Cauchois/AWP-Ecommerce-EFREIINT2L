<script setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router'
import { defineProps, ref } from 'vue'
import {user_login, LoadUserLogin, UnloadUserLogin} from './login_info'

LoadUserLogin()
console.log("showing user_login")
console.log(user_login.value)
console.log("end showing user_login")

const router = useRouter()

function LogOut() {
  if (localStorage.getItem('user') != null) {
    localStorage.removeItem("user")
    UnloadUserLogin()
    router.push("main")
  }
}
</script>

<template>

  <!-- Insert Header component -->

  <nav>
    <RouterLink to="/main" id="main-link">Home</RouterLink>
    <template v-if="user_login.isLoggedIn">
    | <RouterLink to="/cart" id="cart-link">Cart</RouterLink>
    </template>
    <template v-if="user_login.isAdmin">
    | <RouterLink to="/admin-dashboard" id="admin-link">Admin Dashboard</RouterLink>
    </template>
    | <RouterLink to="/log-in" id="log-in-link">Log In</RouterLink>
    | <RouterLink to="/sign-up">Sign Up</RouterLink>
    <template v-if="user_login.isLoggedIn">
    | <button @click="LogOut">Log Out</button>
    </template>
  </nav>

  <RouterView/> <!-- This tag indicates the spot where each view will be rendered -->
  <!-- Every view component will be rendered between above h2 and below default vue template, for reference + id will be kept as html tag -->

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
