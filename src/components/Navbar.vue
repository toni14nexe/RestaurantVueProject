<template>
     <nav class="navbar navbar-expand-lg" @click="listener">
            <a id="title-a"
                class="navbar-brand" href="#home">&ensp;<b>...ChineseFood... </b>
                <img src="../assets/images/logo.png" alt="Card Back" class="img-first">
                <img src="../assets/images/logo-hover.png" class="img-second" alt="Card Front">&ensp;
            </a>
            
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item" id="home-dropdown">
                        <div class="dropdown show" id="main-div">
                            <a class="li-btn" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <button class="li-btn" @click="listener">
                                    <a class="nav-link">
                                        <img src="../assets/images/user.png" alt="Card Back" class="img-first">
                                        <img src="../assets/images/user-hover.png" class="img-second" alt="Card Front">&ensp;
                                    </a>
                                </button>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <keep-alive><log-in v-if="state === true"></log-in></keep-alive>
                                <keep-alive><sign-up v-if="state === false"></sign-up></keep-alive>
                                <button type="button" class="switch-btn" id="btn-switch" @click="switchState">Registration</button>                                                        
                            </div>
                        </div>
                    </li>
                    <div>
                        <li class="nav-item" id="user-dropdown">
                            <div class="dropdown show" id="main-div">
                                <a class="li-btn" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <button class="li-btn" @click="listener">
                                        <a class="nav-link">
                                            <div id="username-div"></div>
                                            <img src="../assets/images/user.png" alt="Card Back" class="img-first">
                                            <img src="../assets/images/user-hover.png" class="img-second" alt="Card Front">&ensp;
                                        </a>
                                    </button>
                                </a>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <user-dropdown/>                                                   
                                </div>
                            </div>
                        </li>
                    </div>
                    <li class="nav-item">
                        <button class="li-btn" id="order-btn">
                            <a class="nav-link" href="/order#order"><b>Order</b></a>
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="li-btn">
                            <a class="nav-link" id="home-href" href="#home"><b>Home</b></a>
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="li-btn">
                            <a class="nav-link" id="about-href" href="#about"><b>About</b></a>
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="li-btn">
                            <a class="nav-link" id="dishes-href" href="#dishes"><b>Dishes</b></a>
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="li-btn">
                            <a class="nav-link" id="findus-href" href="#findus"><b>Find us</b></a>
                        </button>
                    </li>
                    <div>
                        <li class="nav-item" id="user-cart-btn" @click="showDropdownCart">
                            <div class="dropdown show" id="main-div">
                                <a class="li-btn" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <button class="li-btn" @click="listener">
                                        <a class="nav-link" @click="dropdownCartList">
                                            <img src="../assets/images/cart.png" alt="Card Back" class="img-first">
                                            <img src="../assets/images/cart-hover.png" class="img-second" alt="Card Front">&ensp;
                                            <h4 id="cart-num">{{cartItemNumber}}</h4>
                                        </a>
                                    </button>
                                </a>
                                <div class="dropdown-menu dropdown-cart" aria-labelledby="dropdownMenuLink">
                                    <div>
                                        <center>
                                            <table>
                                                <tr v-for="cartItem of cartItems" :key="cartItem.id">
                                                    <td v-if="cartItem.username == username">{{cartItem.name}}&emsp;</td>
                                                    <td v-if="cartItem.username == username">{{cartItem.quantity}} pcs&emsp;</td>
                                                    <td v-if="cartItem.username == username">{{cartItem.totalPrice.toFixed(2)}}$</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td v-if="totalPrice" class="bold">Total: </td>
                                                    <td v-if="totalPrice" class="bold" id="total">{{totalPrice.toFixed(2)}}$</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td><a href="/cart"><button v-if="totalPrice" class="sign-in-btn">Go to cart</button></a></td>
                                                </tr>
                                                <tr>
                                                    <p v-if="!totalPrice" class="small-text">Cart is empty!</p>
                                                </tr>
                                            </table>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                </ul>
            </div>
        </nav>
</template>

<script>
import LogIn from './LogIn.vue';
import SignUp from './SignUp.vue';
import UserDropdown from './UserDropdown.vue';
import axios from 'axios';

var cartURL = "cartItems";

export default {
    components:{
        'log-in': LogIn,
        'sign-up': SignUp,
        'user-dropdown': UserDropdown
    },
    data(){
        return{
            component: 'log-in',
            state: true,
            cartItems: [],
            cartItemNumber: 0,
            totalPrice: 0,
            username: null,
        }
    },
    async mounted(){
        this.username = $cookies.get("username");
        try{
            await this.updateCart();
        }
        catch(e){
            console.error(e);
        }
        for (var i = 0; i < this.cartItems.length; i++) {
            if(this.cartItems[i].username == this.username){
                this.cartItemNumber += this.cartItems[i].quantity;
                this.totalPrice +=  this.cartItems[i].totalPrice;
            }
        }
    },
    methods:{
        switchState(){
            this.state = !this.state;
            if(this.state == 0){ document.getElementById('btn-switch').innerHTML = "Log in"; }
            if(this.state == 1){ document.getElementById('btn-switch').innerHTML = "Registration"; }
        },
        listener(){
            const btn = document.querySelector('.switch-btn');
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
            });
        },
        async updateCart(){
            const res = await axios.get(cartURL);
            this.cartItems = res.data;
        },

        async dropdownCartList(){
            this.totalPrice = 0;
            this.cartItemNumber = 0;
            try{
                const res = await axios.get(cartURL);
                this.cartItems = res.data;
            }
            catch(e){
                console.error(e);
            }
            for (var i = 0; i < this.cartItems.length; i++) {
                if(this.cartItems[i].username == this.username){
                    this.cartItemNumber += this.cartItems[i].quantity;
                    this.totalPrice +=  this.cartItems[i].totalPrice;
                }
            }
            document.getElementById("cart-num").innerHTML = this.cartItemNumber;
            document.getElementById("total").innerHTML = this.totalPrice;
        },
        orderSuceed(){
            document.getElementById("cart-num").innerHTML = 0;
        }
    }
}
</script>

<style scoped>
    log-in{
        transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;

    }

    .navbar{
        z-index: 1;
        font-size: 180%;
        position: fixed;
        top: 0;
        width: 100%;
        background-color: #C7493A;
    }

    .navbar-brand{
        transition: 0.8s ease;
        font-size: 1.5rem;
        margin-left: 2%;
        color: rgb(33, 37, 41);
    }

    ul{
        margin-left: auto;
        margin-right: 2%;
    }

    .li-btn{
        border: 0;
        margin-top: 0;
        margin-bottom: 0;
        background-color: #C7493A;
        transition: 0.8s ease;
        border-radius: 5px;
    }

    .li-btn:hover{
        background-color: RGB(33,37,41);
        transition: 0.8s ease;
    }

    .li-btn:hover .nav-link{
        color: #C7493A;
        transition: 0.8s ease;
        letter-spacing: +4px;
        font-size: 2rem;
    }

    .nav-link{
        color: RGB(33,37,41);
        transition: 0.8s ease;
    }

    #title-a{
        font-size: 2.5rem;
        border-radius: 100px;
    }

    #title-a:hover{
        transition: 0.8s ease;
        background-color: RGB(33,37,41);
        color:#C7493A;
        letter-spacing: +2px;
    }

    .dropdown-menu{
        max-height: 60vh;
        text-align: center;
        padding: 10% 10% 10% 10%;
        background-color: #212529;
        border: 2px solid #C7493A;
        color: #C7493A;
        overflow: auto; 
    }

    .dropdown-menu::-webkit-scrollbar {
        width: 10px;
    }

    .dropdown-menu::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
    }
    
    .dropdown-menu::-webkit-scrollbar-thumb {
        background: #C7493A; 
        border-radius: 10px;
    }

    .dropdown-menu::-webkit-scrollbar-thumb:hover {
        background: #C7493A; 
    }

    .dropdown-cart{
        min-width: 100vh;
    }

    .dropdown-cart tr{
        font-size: 1.4rem;
        text-align: center;
    }

    #username-div{
        display: inline;
    }

    #user-dropdown{
        display: none;
    }

    #cart-num{
        display: inline;
    }

    .bold{
        font-weight: bold;
    }

    .sign-in-btn:hover{
        letter-spacing: 0;
    }



    
    
    @media screen and (max-width: 1399px) {
        #title-a{
            font-size: 1.8rem;
        }

        #title-a .img-first{
            height: 2.1rem;
        }

        #title-a .img-second{
            height: 2.1rem;
        }

        .li-btn{
            font-size: 1.3rem;
            margin-top: auto;
            margin-bottom: auto;
        }

        .li-btn:hover .nav-link{
            font-size: 1.5rem;
        }

        .li-btn .img-first{
            height: 1.3rem;
        }

        .li-btn .img-second{
            height: 1.5rem;
        }
    }

    @media screen and (max-width: 1449px) {
        #title-a{
            font-size: 2rem;
        }

        #title-a .img-first{
            height: 1.8rem;
        }

        #title-a .img-second{
            height: 1.8rem;
        }

        .li-btn{
            font-size: 1.2rem;
            margin-top: auto;
            margin-bottom: auto;
        }

        .li-btn:hover .nav-link{
            font-size: 1.2rem;
        }

        .li-btn .img-first{
            height: 1.2rem;
        }

        .li-btn .img-second{
            height: 1.4rem;
        }
    }

    @media screen and (max-width: 1199px) {
        #title-a{
            font-size: 0.9rem;
        }
    }

    @media screen and (min-width: 992px) {
        .dropdown-menu{
            position: static;
            right: 0%;
        }
    }

    @media screen and (max-width: 992px) {
        .dropdown-menu::-webkit-scrollbar-thumb {
            background: rgb(255, 255, 255, 0.7);
        }

        .dropdown-menu::-webkit-scrollbar-thumb:hover {
            background: rgb(255, 255, 255, 0.7);
        }
    }

    @media screen and (max-width: 425px) {
        #title-a{
            font-size: 1.3rem;
        }

        #title-a .img-first{
            height: 1.6rem;
        }

        #title-a .img-second{
            height: 1.6rem;
        }
    }

    @media screen and (max-width: 349px) {
        #title-a{
            font-size: 1rem;
        }

        #title-a .img-first{
            height: 1.2rem;
        }

        #title-a .img-second{
            height: 1.2rem;
        }

        .navbar-toggler{
            height: 2rem;
        }

        .navbar-toggler-icon{
            height: 1.5rem;
        }
    }
</style>