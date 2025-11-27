<template>

    <h1>Log In</h1>

    <form action="javascript:;" @submit.prevent="tryLog" enctype="multipart/form-data">
        <label for="username">Username</label><br/>
        <input type="text" id="username" name="username" v-model="username"></input><br/>
        <label for="password">Password</label><br/>
        <input type="text" id="password" name="password" v-model="password"></input><br/>
        <input type="submit" value="Submit"></input>
    </form>

</template>

<script setup>
import axios from 'axios'

const username = defineModel('username')
const password = defineModel('password')

function tryLog() {
    console.log(username.value)

    axios({
        method: "post",
        url: "http://localhost:5000/users",
        data: { username: username.value, password: password.value},
    }).then(res => {
        console.log(res); //TODO : handle following status code rendering response on form
    }).catch (err => {
        console.error(err);
        console.log(err.response.data)
    })
}

</script>

<style scoped>

</style>