<template>
  <div>
    <center>
      <navbar-component/>
      <div id="main">
          
        <div class="col-12 title-div">
          <h3>Your account was created successfully.</h3>
          <br><br>
          <a href="./"><button class="sign-in-btn">Home</button></a>
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
import LoggedOut from '../assets/loggedOut.js'

export default {
  data(){
    return{
      username: 'username',
      cartItems: [],
    }
  },
  components:{
    'navbar-component': Navbar,
    'footer-component': Footer,
  },
  mounted(){
    LoggedOut.check();
  }
}
</script>



<style scoped>
    #main{
        min-height: 100vh;
        color: #C7493A;
    }
</style>