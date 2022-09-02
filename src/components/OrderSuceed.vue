<template>
  <div>
    <center>
      <navbar-component/>
      <div id="main">
          
        <div class="col-12 title-div">
          <h3>Your order has been successfully received.</h3>
          <h3>Thank you</h3>
          <br><br>
          <a href="./home"><button class="sign-in-btn">Home</button></a>
        </div>
        <br>

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
      username: 'username',
      cartItems: [],
      username: null
    }
  },
  components:{
    'navbar-component': Navbar,
    'footer-component': Footer,
  },
  mounted(){
    User.start()
    this.username = $cookies.get("username");
  },
  async created(){
    if($cookies.get("clearData")){
      try{
        const res = await axios.get(cartURL);
        this.cartItems = res.data;
      }
      catch(e){
          console.error(e);
      }
      for (var i = 0; i < this.cartItems.length; i++) {
        if(this.cartItems[i].username == this.username){
          axios.delete(cartURL + '/' + this.cartItems[i].id);
        }
      }
    }else{
      window.location.href = './home'
    }
  }
}
</script>



<style scoped>
    #main{
        min-height: 100vh;
    }

    h3{
        color: #C7493A;
    }

    tr{
      display: none;
    }
</style>