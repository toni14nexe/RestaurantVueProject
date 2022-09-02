<template>
  <div id="app">
    <center>
      <component v-bind:is="Component"/>
      <about/>
      <dishes/>
      <find-us/>
      <footer-component/>
    </center>
  </div>
</template>



<script>
import Head from "./Head.vue"
import AboutUs from './About.vue'
import Dishes from './Dishes.vue'
import FindUs from './FindUs.vue'
import Footer from './Footer.vue'
import LoggedOut from '../assets/loggedOut.js'

export default {
  data(){
    return{
      Component: 'header',
    }
  },
  components:{
    'header': Head,
    'about': AboutUs,
    'dishes': Dishes,
    'find-us': FindUs,
    'footer-component': Footer
  },
  mounted(){
    LoggedOut.check();
  }
}
</script>



<style scoped>
  #app{
    background-color: black;
  }
</style>