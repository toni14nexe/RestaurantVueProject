<template>
    <section id="order">
        <div>
            <h1 class="item-group-title">Soups</h1>
            <table>
                <tr>
                    <td>Name</td>
                    <td class="ingredients">Ingredients</td>
                    <td>Price</td>
                    <td>Order</td>
                </tr>
                <tr v-for="menu of menus" :key="menu.id">
                    <td v-if="menu.category == 'soup'" :key="menu.id">{{menu.name}}</td>
                    <td v-if="menu.category == 'soup'" :key="menu.id" class="ingredients">{{menu.ingredients}}</td>
                    <td v-if="menu.category == 'soup'" :key="menu.id">{{menu.price}}$</td>
                    <td v-if="menu.category == 'soup'" :key="menu.id" class="order-tr">
                        <input v-model="orders[menu.id]" type="number" class="add-input" onKeyDown="return false" min="1" max="10">
                        <a>
                            <Button class="add-btn" @click="addToCart(menu.name, menu.price, orders[menu.id], menu.id)">Add</Button>
                        </a>
                    </td>
                </tr>
            </table>



            <h1 class="item-group-title">Sushi</h1>
            <table>
                <tr>
                    <td>Name</td>
                    <td class="ingredients">Ingredients</td>
                    <td>Price</td>
                    <td>Order</td>
                </tr>
                <tr v-for="menu of menus" :key="menu.id">
                    <td v-if="menu.category == 'sushi'" :key="menu.id">{{menu.name}}</td>
                    <td v-if="menu.category == 'sushi'" :key="menu.id" class="ingredients">{{menu.ingredients}}</td>
                    <td v-if="menu.category == 'sushi'" :key="menu.id">{{menu.price}}$</td>
                    <td v-if="menu.category == 'sushi'" :key="menu.id" class="order-tr">
                        <input v-model="orders[menu.id]" type="number" class="add-input" onKeyDown="return false" min="1" max="10">
                        <a>
                            <Button class="add-btn" @click="addToCart(menu.name, menu.price, orders[menu.id], menu.id)">Add</Button>
                        </a>
                    </td>
                </tr>
            </table>



            <h1 class="item-group-title">Cooked/Grilled</h1>
            <table>
                <tr>
                    <td>Name</td>
                    <td class="ingredients">Ingredients</td>
                    <td>Price</td>
                    <td>Order</td>
                </tr>
                <tr v-for="menu of menus" :key="menu.id">
                    <td v-if="menu.category == 'cook-grill'" :key="menu.id">{{menu.name}}</td>
                    <td v-if="menu.category == 'cook-grill'" :key="menu.id" class="ingredients">{{menu.ingredients}}</td>
                    <td v-if="menu.category == 'cook-grill'" :key="menu.id">{{menu.price}}$</td>
                    <td v-if="menu.category == 'cook-grill'" :key="menu.id" class="order-tr">
                        <input v-model="orders[menu.id]" type="number" class="add-input" onKeyDown="return false" min="1" max="10">
                        <a>
                            <Button class="add-btn" @click="addToCart(menu.name, menu.price, orders[menu.id], menu.id)">Add</Button>
                        </a>
                    </td>
                </tr>
            </table>



            <h1 class="item-group-title">Non-alcoholic drinks</h1>
            <table>
                <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Order</td>
                </tr>
                <tr v-for="menu of menus" :key="menu.id">
                    <td v-if="menu.category == 'non-alc-drink'" :key="menu.id">{{menu.name}}</td>
                    <td v-if="menu.category == 'non-alc-drink'" :key="menu.id">{{menu.price}}$</td>
                    <td v-if="menu.category == 'non-alc-drink'" :key="menu.id" class="order-tr">
                        <input v-model="orders[menu.id]" type="number" class="add-input" onKeyDown="return false" min="1" max="10">
                        <a>
                            <Button class="add-btn" @click="addToCart(menu.name, menu.price, orders[menu.id], menu.id)">Add</Button>
                        </a>
                    </td>
                </tr>
            </table>



            <h1 class="item-group-title">Alcoholic drinks</h1>
            <table>
                <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Order</td>
                </tr>
                <tr v-for="menu of menus" :key="menu.id">
                    <td v-if="menu.category == 'alc-drink'" :key="menu.id">{{menu.name}}</td>
                    <td v-if="menu.category == 'alc-drink'" :key="menu.id">{{menu.price}}$</td>
                    <td v-if="menu.category == 'alc-drink'" :key="menu.id" class="order-tr">
                        <input v-model="orders[menu.id]" type="number" class="add-input" onKeyDown="return false" min="1" max="10">
                        <a>
                            <Button class="add-btn" @click="addToCart(menu.name, menu.price, orders[menu.id], menu.id)">Add</Button>
                        </a>
                    </td>
                </tr>
            </table>
            <br><br>
        </div>
    </section>
</template>



<script>
import axios from 'axios';
var baseURL = "menus";
var cartURL = "cartItems";

export default {
    data(){
        return{
            menus: [],
            cartItems: [],
            orders: {},
            exist: false,
            cartItemNumber: 0,
            username: null
        }
    },
    mounted(){
        this.username = $cookies.get("username");
        $("[type='number']").keypress(function (evt) {
            evt.preventDefault();
        });
        this.cartItemNumber = 0;
        for (var i = 0; i < this.cartItems.length; i++) {
            this.cartItemNumber += this.cartItems[i].quantity;
        }
        document.getElementById('cart-num').innerText = this.cartItemNumber;
    },
    async created(){
        try{
            const res = await axios.get(baseURL);
            this.menus = res.data;
            this.menus.forEach(element => {
                this.orders[element.id] = 1;
            });
        }
        catch(e){
            console.error(e);
        }
        try{
            const res = await axios.get(cartURL);
            this.cartItems = res.data;
        }
        catch(e){
            console.error(e);
        }
    },
    methods:{
        async addToCart(cartItemName, cartItemPrice, cartItemQuantity, menuID){
            this.cartItemNumber = 0;
            for (var i = 0; i < this.cartItems.length; i++) {
                try{
                    const res = await axios.get(cartURL);
                    this.cartItems = res.data;
                }
                catch(e){
                    console.error(e);
                }
                if (this.cartItems[i].menuID === menuID) {
                    if(this.cartItems[i].username == document.getElementById('username-div').innerHTML){
                        await axios.put(cartURL + "/" + this.cartItems[i].id, {
                        username: document.getElementById('username-div').innerHTML,
                        name: this.cartItems[i].name,
                        price: this.cartItems[i].price,
                        quantity: this.cartItems[i].quantity + cartItemQuantity,
                        menuID: this.cartItems[i].menuID,
                        totalPrice: (parseFloat(this.cartItems[i].quantity) + parseFloat(cartItemQuantity)) * parseFloat(this.cartItems[i].price),
                        id: this.cartItems[i].id
                    });
                    this.exist = true;
                    break;
                    }
                }
            }
            if(this.exist == false){
                const res = await axios.post(cartURL, {
                    username: document.getElementById('username-div').innerHTML,
                    name: cartItemName, 
                    price: cartItemPrice, 
                    quantity: cartItemQuantity, 
                    menuID: menuID, 
                    totalPrice: parseFloat(cartItemQuantity) * parseFloat(cartItemPrice)});
                this.cartItems = [...this.cartItems, res.data];
            }
            this.exist = false;

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
                }
            }
            document.getElementById('cart-num').innerText = this.cartItemNumber;
        }
    }
}
</script>



<style scoped>
    #order{
        background-color: #212529;
    }

    table{
        width: 90%;
        text-align: center;
    }

    table, th, td {
        border: 2px solid #C7493A;
        border-collapse: collapse;
    }

    .item-group-title{
        padding: 6.5rem 0 2rem 0;
        font-size: 3rem;
        font-weight: bold;
        color: #C7493A;
    }

    table tr:nth-child(even){
        font-size: 2rem;
        color: #C7493A;
    }

    table tr:nth-child(odd){
        background-color: rgb(199, 73, 58, 0.25);
        font-size: 2rem;
        color: #C7493A;
    }

    table tr:first-child{
        background-color: rgb(199, 73, 58, 0.25);
        font-size: 2.3rem;
        font-weight: bold;
        color: #C7493A;
    }

    .ingredients{
        font-size: 1.4rem;
        text-align: left;
        padding: 0 1rem 0 1rem;
    }

    .add-btn{
        transition: 0.8s ease;
        border: 0;
        max-height: 50px;
        width: auto;
        border: 2px solid #C7493A;
        background-color: #212529;
        color: #C7493A;
        border-radius: 10%;
        margin-left: 10%;
    }

    .add-btn:hover{
        transition: 0.8s ease;
        border: 2px solid #212529;
        background-color: #C7493A;
        color: #212529;
        border-radius: 20%;
        margin-left: 10%;
    }

    .add-input{
        height: 40px;
        padding-top: 10px;
        width: 5rem;
        background-color: #edd2ce;
        z-index: -1;
    }

    .order-tr{
        min-width: 200px;
    }

    @media screen and (max-width: 1099px) {
        .item-group-title{
            font-size: 2rem;
        }

        td{
            font-size: 1.3rem;
        }

        input{
            max-width: 50px;
        }

        .ingredients{
            font-size: 1.2rem;
        }
    }

    @media screen and (max-width: 789px) {
        td{
            font-size: 1.1rem;
        }

        input{
            max-width: 50px;
        }

        .ingredients{
            font-size: 1rem;
        }

        .order-tr{
            min-width: 150px;
        }
    }

    @media screen and (max-width: 549px) {
        .item-group-title{
            font-size: 1.5rem;
        }

        td{
            font-size: 1rem;
        }

        input{
            max-width: 40px;
        }

        .ingredients{
            font-size: 1rem;
        }

        .order-tr{
            min-width: 100px;
        }
    }

    @media screen and (max-width: 549px) {
        .item-group-title{
            font-size: 1.5rem;
        }

        td{
            font-size: 0.7rem;
        }

        input{
            max-width: 30px;
        }

        .ingredients{
            font-size: 0.7rem;
        }

        .order-tr{
            min-width: 100px;
        }
    }

    @media screen and (max-width: 389px) {
        .ingredients{
            display: none;
        }

        .order-tr{
            min-width: fit-content;
        }
    }
</style>