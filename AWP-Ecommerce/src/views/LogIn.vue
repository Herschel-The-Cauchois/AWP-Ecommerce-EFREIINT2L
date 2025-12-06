<template>

    <main>
        <h1>Log In</h1>

        <form action="javascript:;" @submit.prevent="tryLog" enctype="multipart/form-data">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="username"></input><br/>
            <small v-if="EmptyUsername" class="error-msg">Username field is empty.</small><br v-if="EmptyUsername"/>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="password"></input><br/>
            <small v-if="EmptyPassword" class="error-msg">Password field is empty.</small><br v-if="EmptyPassword"/>
            <small v-if="InternalError" class="error-msg">Internal Server Error. Please try later or contact us.</small>
            <small v-else-if="Forbidden" class="error-msg">You have been forbidden to use this service.</small>
            <small v-else-if="NotFound" class="error-msg">Your credentials does not match existing records. Please check the data you have entered.</small>
            <small v-else-if="InvalidPassword" class="error-msg">Password is not valid.</small><br/>
            <input type="submit" value="Submit"></input>
        </form>
    </main>

</template>

<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'

const username = defineModel('username')
const password = defineModel('password')
const router = useRouter()

const InternalError = ref(false)
const Forbidden = ref(false)
const NotFound = ref(false)
const InvalidPassword = ref(false)
const EmptyPassword = ref(false)
const EmptyUsername = ref(false)
var ErrorVariables = [InternalError, Forbidden, NotFound, InvalidPassword, EmptyPassword, EmptyUsername]

function tryLog() {
    console.log(username.value)
    ErrorVariables.forEach((elem) => elem.value = false) //Sets to false every error flag before attempting new request

    if (username.value === "" | username.value === undefined) {
        EmptyUsername.value = true
        return
    }
    if (password.value === "" | password.value === undefined) {
        EmptyPassword.value = true
        return
    }

    axios({
        method: "post",
        url: "http://localhost:5000/users",
        data: { username: username.value, password: password.value},
    }).then(res => {
        console.log(res.data);
        if (localStorage.getItem('user') != null) {
            localStorage.removeItem("user") //Removes token if was already logged in, to prevent simultaneous sessions
        }
        localStorage.setItem("user", res.data.accessToken)
        router.push("/main")
    }).catch (err => {
        console.error(err);
        console.log(err.response.data)
        console.log(err.response.status)
        switch (err.response.status) {
            case 500:
                InternalError.value = true
                break
            case 404:
                NotFound.value = true
                break
            case 401:
                InvalidPassword.value = true
                break
            case 403:
                Forbidden.value = true
                break
            default:
                console.error("Invalid HTTP response status")
                break
        }
    })
}

</script>

<style scoped>

main {
    border: solid black;
    border-radius: 5px;
    margin-top: 3em;
    margin-bottom: 1em;
    padding-bottom: 2rem;
    padding-left: 2rem;
    text-align: left;
}

.error-msg {
    color:red;
    text-decoration: underline;
}

input[type=submit] {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.25s ease;
  margin-top: 1rem;
}

input[type=submit]:hover {
  background: #4338ca;
  transform: scale(1.03);
}

input[type=submit]:active {
  transform: scale(0.98);
}

input[type=password], input[type=text] {
    width: 80%;
    padding: 1em;
}

label {
    margin-bottom: 1em;
    margin-top: 1em;
    display: block;
}

</style>