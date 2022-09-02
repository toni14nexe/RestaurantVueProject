<template>
  <div>
    <center>
      <navbar-component/>

      <div id="main">
        <div class="col-12 title-div">
          <h1 class="title" id="title">Cart</h1>
          <table id="table">
            <tr>
              <td>Name</td>
              <td>Quantity</td>
              <td>Price</td>
              <td>Total</td>
              <td></td>
            </tr>
            <tr v-for="cartItem of cartItems" :key="cartItem.id" :id="'tr' + cartItem.id">
                <td v-if="cartItem.username == username">{{cartItem.name}}</td>
                <td v-if="cartItem.username == username">{{cartItem.quantity}}</td>
                <td v-if="cartItem.username == username">{{cartItem.price}}$</td>
                <td v-if="cartItem.username == username">{{cartItem.totalPrice.toFixed(2)}}$</td>
                <td v-if="cartItem.username == username">
                  <button class="sign-in-btn" @click="removeFromCart(cartItem.id)">Remove</button>
                </td>
            </tr>
            <tr id="empty-td">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Total:</td>
              <td>{{totalPrice.toFixed(2)}}$</td>
              <td></td>
            </tr>
          </table>
        </div>

        <div>
          <div class="align-right">
            <a href="./order"><button class="sign-in-btn margin-btn">Back to order</button></a>
            <a href="./payment" id="payment-btn"><button class="sign-in-btn margin-btn">Proceed to payment</button></a>
          </div>
        </div>

      </div>
      <footer-component/>
    </center>
  </div>
</template>



<script>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import axios from 'axios';
import User from '../assets/user.js';

var cartURL = "cartItems";

export default {
  data(){
    return{
      cartItems: [],
      totalPrice: 0,
      cartItemNumber: 0,
      username: null
    }
  },
  components:{
    'navbar-component': Navbar,
    'footer-component': Footer,
  },
  mounted(){
    User.start();
    this.username = $cookies.get("username");
    this.checkIsEmpty()
  },
  async created(){
    try{
        const res = await axios.get(cartURL);
        this.cartItems = res.data
    }
    catch(e){
        console.error(e);
    }
    for (var i = 0; i < this.cartItems.length; i++) {
      if(this.cartItems[i].username == this.username){
        this.totalPrice +=  this.cartItems[i].totalPrice;
      }
    }
    if(this.cartItems.length == 0){
      document.getElementById("payment-btn").style.display = "none";
      document.getElementById("table").style.display = "none";
      document.getElementById("title").innerHTML = "Cart is empty!";
    }
  },
  methods:{
    async removeFromCart(id){
      try{
        const res = await axios.get(cartURL);
        this.cartItems = res.data;
      }
      catch(e){
          console.error(e);
      }
      for (var i = 0; i < this.cartItems.length; i++) {
        if(this.cartItems[i].id == id){
          if(this.cartItems[i].username == this.username){
            axios.delete(cartURL + '/' + id);
            document.getElementById('tr'+id).style.display = 'none';
          }
        }
      }
      try{
        const res = await axios.get(cartURL);
        this.cartItems = res.data;
      }
      catch(e){
          console.error(e);
      }
      this.totalPrice = 0;
      this.cartItemNumber = 0;
      for (var i = 0; i < this.cartItems.length; i++) {
        if(this.cartItems.length == 1){
          document.getElementById("payment-btn").style.display = "none";
          document.getElementById("table").style.display = "none";
          document.getElementById("title").innerHTML = "Cart is empty!";
          document.getElementById("cart-num").innerHTML = "0";
        }
        try{
            const res = await axios.get(cartURL);
            this.cartItems = res.data;
        }
        catch(e){
            console.error(e);
        }
        if(this.cartItems[i].username == this.username){
          this.cartItemNumber += this.cartItems[i].quantity;
          this.totalPrice +=  this.cartItems[i].totalPrice;
        }
      }
      document.getElementById('cart-num').innerText = this.cartItemNumber;
      this.checkIsEmpty()
    },

    async checkIsEmpty(){
      try{
        const res = await axios.get(cartURL);
        this.cartItems = res.data;
      }
      catch(e){
        console.error(e);
      }
      if(this.totalPrice == 0){
        document.getElementById("payment-btn").style.display = "none";
        document.getElementById("table").style.display = "none";
        document.getElementById("title").innerHTML = "Cart is empty!";
      }
    }
  }
}
</script>



<style scoped>
  #main{
    min-height: 100vh;
  }

  .title{
    font-size: 4rem;
    color: #C7493A;
  }

  table{
    width: 90%;
    text-align: center;
    color: white;
  }

  table, th {
    border: 2px solid #C7493A;
    border-collapse: collapse;
  }

  table tr:first-child{
    background-color: rgb(199, 73, 58, 0.25);
    font-size: 2.3rem;
    font-weight: bold;
    color: #C7493A;
  }

  table tr{
      font-size: 1.5rem;
      color: #C7493A;
  }

  #empty-td{
    border: 2px solid #C7493A;
  }

  .sign-in-btn{
    letter-spacing: 0;
  }

  .align-right{
    margin-right: 5%;
  }

  .margin-btn{
    margin: 2% 0 2% 2%;
    font-size: 2rem;
  }

  @media screen and (max-width: 1099px) {
        td{
            font-size: 1.3rem;
        }

        .sign-in-btn{
          font-size: 1.2rem;
        }
    }

    @media screen and (max-width: 789px) {
        td{
            font-size: 1.1rem;
        }

        .sign-in-btn{
          font-size: 0.8rem;
        }
    }

    @media screen and (max-width: 549px) {
        td{
            font-size: 1rem;
        }

        .sign-in-btn{
          font-size: 0.5rem;
          padding-left: 5px;
          padding-right: 4px;
        }
    }

    @media screen and (max-width: 389px) {
        td{
              font-size: 0.7rem;
          }

        .sign-in-btn{
          font-size: 0.5rem;
        }
    }
</style>