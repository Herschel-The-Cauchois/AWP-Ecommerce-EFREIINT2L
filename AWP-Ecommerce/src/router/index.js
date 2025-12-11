import { createRouter, createWebHistory } from 'vue-router'
import LogInView from '../views/LogIn.vue'
import SignUpView from '../views/SignUp.vue'
import MainView from '../views/Main.vue'
import CartView from '../views/Cart.vue'
import NewProductView from '../views/NewProduct.vue'
import AdminView from '../views/AdminDashboard.vue'

import VueJwtDecode from 'vue-jwt-decode'
import Header from '../components/Header.vue'

const routes = [
    {
        path: "/",
        name: "index",
        component: MainView,
        meta: {
            requiresAuth : false,
            is_admin: false,
            is_provider: false
        }
    },
    {
        path: "/main",
        name: "main",
        component: MainView,
        meta: {
            requiresAuth : false,
            is_admin: false,
            is_provider: false,
        }
    },
    {
        path: "/cart",
        name: "cart",
        component: CartView,
        meta: {
            requiresAuth : true,
            is_admin: false,
            is_provider: false,
        }
    },
    {
        path: "/log-in",
        name: "log-in",
        component: LogInView,
        meta: {
            requiresAuth : false,
            is_admin: false,
            is_provider: false
        }
    }, 
    {
        path: "/sign-up",
        name: "sign-up",
        component: SignUpView,
        meta: {
            requiresAuth : false,
            is_admin: false,
            is_provider: false
        }
    },
    {
        path: "/admin-dashboard",
        name: "admin-dashboard",
        component: AdminView,
        meta: {
            requiresAuth : true,
            is_admin: true,
            is_provider: false
        }
    },
    {
        path: "/provider-dashboard",
        name: "provider-dashboard",
        component: MainView, 
        meta: {
            requiresAuth : true,
            is_admin: false,
            is_provider: true
        }
    },
    {
        path: "/new",
        name: "new",
        component: NewProductView,
        meta: {
            requiresAuth : true,
            is_admin: false,
            is_provider: true
        }
    },
    { 
        path: '/:pathMatch(.*)*', 
        redirect: '/main',
        meta: {
            requiresAuth: false,
            is_admin: false,
            is_provider: false
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => { 
    if (to.matched.some(record => record.meta.requiresAuth)) { 
        if (localStorage.getItem('user') == null) { 
            next({ 
                path: '/log-in', 
                params: { nextUrl: to.fullPath } 
            }) 
        } else { 
            let user = VueJwtDecode.decode(localStorage.getItem('user')) // Decodes and retrieves JWT token
            console.log(VueJwtDecode.decode(localStorage.getItem('user')))
            if (to.matched.some(record => record.meta.is_admin)) { // Is admin page ?
                if (user.isAdmin) { // If user token states he's an admin, go forth
                    next() 
                } else { 
                    next({ name: 'main' }) //Ideally would be cool to add a "acces forbidden page..."
                } 
            } else { 
                next() 
            } 
            if (to.matched.some(record => record.meta.is_provider)) { // Is provider page ?
                if (user.isProvider) { // If user token states he's an admin, go forth
                    next() 
                } else { 
                    next({ name: 'main' }) //Ideally would be cool to add a "acces forbidden page..."
                } 
            } else { 
                next() 
            }
        } 
    } else { 
        next() 
    }
})

export default router
