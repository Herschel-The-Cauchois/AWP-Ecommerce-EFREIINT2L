import { createRouter, createWebHistory } from 'vue-router'
import LogInView from '../views/LogIn.vue'
import SignUpView from '../views/SignUp.vue'
import MainView from '../views/Main.vue'

const routes = [
    {
        path: "/",
        name: "index",
        component: MainView
    },
    {
        path: "/main",
        name: "main",
        component: MainView
    },
    {
        path: "/log-in",
        name: "log-in",
        component: LogInView
    }, 
    {
        path: "/sign-up",
        name: "sign-up",
        component: SignUpView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router