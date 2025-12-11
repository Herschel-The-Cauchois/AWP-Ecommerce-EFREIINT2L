<template>

    <header>
        <section id="title">
            TicketBuro
        </section>

        <nav>
            <RouterLink to="/main" id="main-link">Home</RouterLink>
            <RouterLink to="/log-in" id="log-in-link" v-if="!user_login.isLoggedIn">Log In</RouterLink>
            <RouterLink to="/sign-up" v-if="!user_login.isLoggedIn">Sign Up</RouterLink>
            <RouterLink to="/cart" v-if="user_login.isLoggedIn">Cart</RouterLink>
            <RouterLink to="/admin-dashboard" v-if="user_login.isAdmin">Dashboard</RouterLink>
            <button v-if="user_login.isLoggedIn" @click="LogOut">Log Out</button>
        </nav>

    </header>

</template>

<script setup>
import {user_login, UnloadUserLogin} from '../login_info'
import { useRouter } from 'vue-router'

const router = useRouter()

function LogOut() {
  if (localStorage.getItem('user') != null) {
    localStorage.removeItem("user")
    UnloadUserLogin()
    window.location.reload()
  }
}
</script>

<style>

header {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    height: 5em; 
    box-sizing: border-box;
}

#title {
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    align-items: center;
    padding: 0 2em;
    font-size: 1.5em;
    font-weight: bold;
    color: white;
    background-color: #89F336;
}

nav {
    display: flex;
    align-items: center;
    gap: 1em;
    padding: 0 2em;
    background-color: #2b00b8;
}

nav > a {
    color:white;
    padding: 0.5em 0.4em;
}

nav > a:hover {
    background-color: #e1dee7;
    color:black;
}

button {
    padding: 0.5em 1em;
}

</style>