<template>

    <main>
        <h1>Sign Up</h1>

        <form action="javascript:;" @submit.prevent="trySign" enctype="multipart/form-data">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="username"></input><br/>
            <small v-if="EmptyUsername" class="error-msg">Username field is empty.</small><br v-if="EmptyUsername"/>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="email"></input><br/>
            <small v-if="EmptyEmail" class="error-msg">Password field is empty.</small><br v-if="EmptyEmail"/>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="password"></input><br/>
            <small v-if="EmptyPassword" class="error-msg">Password field is empty.</small><br v-if="EmptyPassword"/>
            <label for="passwordconf">Confirm Password</label>
            <input type="password" id="passwordconf" name="passwordconf" v-model="passwordconf"></input><br/>
            <small v-if="EmptyConfirmPassword" class="error-msg">Please confirm your password.</small>
            <small v-else-if="WrongPassword" class="error-msg">Passwords do not match.</small>
            <small v-if="InternalError" class="error-msg">Internal Server Error. Please try later or contact us.</small>
            <small v-else-if="DuplicateError" class="error-msg">Email or Username already in use.</small><br/>
            <input type="submit" value="Submit"></input>
        </form>
    </main>

</template>

<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'

const EmptyPassword = ref(false)
const EmptyUsername = ref(false)
const InternalError = ref(false)
const EmptyConfirmPassword = ref(false)
const WrongPassword = ref(false)
const EmptyEmail = ref(false)
const DuplicateError = ref(false)
var ErrorVariables = [EmptyPassword, EmptyConfirmPassword, EmptyEmail, WrongPassword, EmptyUsername, InternalError, DuplicateError]

const username = defineModel('username')
const password = defineModel('password')
const passwordconf = defineModel('passwordconf')
const email = defineModel('email')
const router = useRouter()

function trySign() {
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
    if (passwordconf.value === "" | passwordconf.value === undefined) {
        EmptyConfirmPassword.value = true
        return
    }
    if (email.value === "" | email.value === undefined) {
        EmptyEmail.value = true
        return
    }
    if (password.value !== passwordconf.value) {
        WrongPassword.value = true
        return
    }

    axios({
        method: "put",
        url: "http://localhost:5000/users",
        data: { username: username.value, password: password.value, email: email.value},
    }).then(res => {
        console.log(res.data); 
        router.push("/log-in")
    }).catch (err => {
        console.error(err);
        console.log(err.response.data)
        console.log(err.response.status)
        switch (err.response.status) {
            case 500:
                InternalError.value = true
                break
            case 400:
                DuplicateError.value = true
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

input[type=password], input[type=text], input[type=email] {
    width: 80%;
    padding: 1em;
}

label {
    margin-bottom: 1em;
    margin-top: 1em;
    display: block;
}


</style>