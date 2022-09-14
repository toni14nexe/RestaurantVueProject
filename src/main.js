import {createApp} from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import HomeUser from './components/HomeUser.vue'
import Order from './components/Order.vue'
import Account from './components/Account.vue'
import Cart from './components/Cart.vue'
import Payment from './components/Payment.vue'
import OrderSuceed from './components/OrderSuceed.vue'
import RegistrationSuceed from './components/RegistrationSuceed.vue'
import Administrator from './components/Administrator.vue'
import NotFound from './components/NotFound.vue'
import PasswordReset from './components/PasswordReset.vue'
import '@/axios'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/home',
        component: HomeUser
    },
    {
        path: '/order',
        component: Order
    },
    {
        path: '/account',
        component: Account
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/payment',
        component: Payment
    },
    {
        path: '/orderSuceed',
        component: OrderSuceed
    },
    {
        path: '/registrationSuceed',
        component: RegistrationSuceed
    },
    {
        path: '/administrator',
        component: Administrator
    },
    {
        path: '/passwordReset',
        component: PasswordReset
    },
    {
        path: '/:notFound(.*)',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

const app = createApp(App);
app.use(router);
app.mount('#app');


//npm i vue-router --save
//npm install axios
//npm install json-server -g
//npm install vue-cookies
//npm install cypress --save-dev
//npm i cypress-real-events
//to run db server: json-server dbMenu.json
//to run server: npm run dev