<template>
  <div id="app">
    <center>
      <component v-bind:is="Component"/>
      <order-tables/>
      <footer-component/>
    </center>
  </div>
</template>



<script>
import Head from "./Head.vue"
import Footer from './Footer.vue'
import OrderTables from './OrderTables.vue'
import User from '../assets/user.js';

export default {
  data(){
    return{
      Component: 'header'
    }
  },
  components:{
    'header': Head,
    'footer-component': Footer,
    'order-tables': OrderTables
  },
  mounted(){
    User.start();

    document.getElementById('big-btn').innerHTML = 'Order';
    document.getElementById('big-btn-href').href = ('#order');
  }
}
</script>



<style scoped>
    #app{
        background-color: black;
    }

    .dropdown-menu{
        width: 100vh;
    }
</style>