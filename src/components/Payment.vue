<template>
  <div>
    <center>
      <navbar-component/>
      <div id="main">
          
        <div class="col-12 title-div">
          <h1 class="title" id="title">Payment: {{totalPrice.toFixed(2)}}$</h1>
          <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-5">
                  <form id="form-1">
                        <h3>Order details:</h3>
                        <br>
                        <h5><b>Name and surname</b></h5>
                        <input type="name" placeholder="Name Surname" id="name-surname">
                        <div class="input-message input-width" v-if="nameSurnameMessage"><h7>{{nameSurnameMessage}}</h7></div><br><br>
                        <h5><b>Adress</b></h5>
                        <input type="adress" placeholder="Adress" id="adress">
                        <div class="input-message input-width" v-if="adressMessage"><h7>{{adressMessage}}</h7></div><br><br>
                        <h5><b>Zip code</b></h5>
                        <input type="number" placeholder="Zip code" id="zip">
                        <div class="input-message input-width" v-if="zipMessage"><h7>{{zipMessage}}</h7></div><br><br>
                        <h5><b>City</b></h5>
                        <input type="city" placeholder="City" id="city">
                        <div class="input-message input-width" v-if="cityMessage"><h7>{{cityMessage}}</h7></div><br><br>
                        <h5><b>Phone number</b></h5>
                        <input type="number" placeholder="Phone number" id="phone">
                        <div class="input-message input-width" v-if="phoneMessage"><h7>{{phoneMessage}}</h7></div><br><br>
                  </form>
              </div>
              <div class="col-md-5">
                  <form id="form-2">
                        <h3>Payment details:</h3>
                        <br>
                        <h5><b>Card number</b></h5>
                        <input type="number" placeholder="Card number" id="card-number">
                        <div class="input-message input-width" v-if="cardNumberMessage"><h7>{{cardNumberMessage}}</h7></div><br><br>
                        <h5><b>CVC</b></h5>
                        <input type="number" placeholder="123" id="cvc">
                        <div class="input-message input-width" v-if="cvcMessage"><h7>{{cvcMessage}}</h7></div><br><br>
                        <h5><b>Expiration date</b></h5>
                        <input class="card-date inline" type="number" placeholder="mm" id="mm">
                        <div class="input-message input-width" v-if="mmMesaage"><h7>{{mmMesaage}}</h7></div>
                        <input class="card-date inline" type="number" placeholder="yy" id="yy">
                        <div class="input-message input-width" v-if="yyMesaage"><h7>{{yyMesaage}}</h7></div>
                  </form>
              </div>
              <div class="col-md-1"></div>

          </div>
          <br><br>
          <button type="input" class="sign-in-btn" id="btn-order" @click="order">Order</button>
          <a href="./order"><button type="input" class="sign-in-btn" id="btn-back">Back to order</button></a>
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
import VueCookies from 'vue-cookies'

var cartURL = "cartItems";

export default {
  data(){
    return{
      username: null,
      cartItems: [],
      totalPrice: 0,
      nameSurnameMessage: null,
      adressMessage: null,
      zipMessage: null,
      cityMessage: null,
      phoneMessage: null,
      cardNumberMessage: null,
      cvcMessage: null,
      mmMesaage: null,
      yyMessage: null
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
    try{
        const res = await axios.get(cartURL);
        this.cartItems = res.data;
    }
    catch(e){
        console.error(e);
    }
    this.totalPrice = 0;
    for (var i = 0; i < this.cartItems.length; i++) {
        if(this.cartItems[i].username == this.username){
            this.totalPrice += this.cartItems[i].totalPrice;
        }
    }

    if(this.cartItems.length == 0){
        document.getElementById("form-1").style.display = "none";
        document.getElementById("form-2").style.display = "none";
        document.getElementById('title').innerHTML = 'Cart is empty!';
        document.getElementById('btn-order').style.display = 'none';
        document.getElementById('btn-back').style.display = 'inherit';
    }
  },
  methods:{
      async order(){
            var nameSurname = document.getElementById('name-surname').value;
            if(nameSurname.length==0){ this.nameSurnameMessage = "Empty field!"; }
            else if(nameSurname.length>0 && nameSurname.length<6){ this.nameSurnameMessage = "This field must be at least 6 characters long!"; }
            else{ this.nameSurnameMessage = null }

            var adress = document.getElementById('adress').value;
            if(adress.length==0){ this.adressMessage = "Empty adress!"; }
            else{
                if(adress.length>4){
                    if(adress.match(/[A-Z]/g) || adress.match(/[a-z]/g)){ 
                        if(adress.match(/[0-9]/g)){ 
                            this.adressMessage = null
                        }
                        else{
                            this.adressMessage = "Adress is missing a house number!"
                        }
                    }
                    else{
                        if(adress.match(/[0-9]/g)){ 
                            this.adressMessage = "Adress is missing street name!" 
                        }
                        else{
                            this.adressMessage = "Adress is missing street name and a house number!"
                        }
                    }
                }
                else{
                    this.adressMessage = "Adress is too short!"
                }
            }

            var zip = parseInt(document.getElementById('zip').value)
            this.zipMessage = null
            if(zip){
                if(zip < 10000 || zip > 99999){
                    this.zipMessage = "Zip code must be from 10000 to 99999!";
                }
                else{ this.zipMessage = null }
            }
            else{ this.zipMessage = "Empty field!"; }

            var city = document.getElementById('city').value;   
            this.cityMessage = null;
            if(city.length!=0){
                if(city.length>2){
                    if(city.match(/[^A-Ž\s]/ig)){ this.cityMessage = "Wrong city name!"}
                    else{ this.cityMessage = null }
                }
                else{ this.cityMessage = "City  name is too short!" }
            }
            else{ this.cityMessage = "Empty field!" }

            var phone = document.getElementById('phone').value;
            this.phoneMessage = null
            if(phone){ 
                if(phone.match(/[0-9]/ig)){
                    if(phone.length > 8){
                        if(phone.length < 13){ this.phoneMessage = null }
                        else{ this.phoneMessage = "Phone number is too long!" }
                    }
                    else{ this.phoneMessage = "Phone number is too short!" }
                }
                else{ this.phoneMessage = "Phone number should contain numbers only!" }
            }
            else{ this.phoneMessage = "Empty field!" }

            var cardNumber = document.getElementById('card-number').value;
            this.cardNumberMessage = null;
            if(cardNumber.length == 0){
                this.cardNumberMessage = "Empty field!"
            }
            else if(cardNumber.length<16 || cardNumber.length>16){
                this.cardNumberMessage =  "Card number length must be 16 numbers!";
            }
            else{
                this.cardNumberMessage =  null;
            }

            var cvc = document.getElementById('cvc').value;
            this.cvcMessage = null;
            if(cvc.length == 0){
                this.cvcMessage = "Empty field!"
            }
            else if(cvc.length<3 || cvc.length>3){
                this.cvcMessage =  "CVC length must be 3 numbers!";
            }
            else{
                this.cvcMessage =  null;
            }

            var mm = document.getElementById('mm').value;
            this.mmMesaage = null
            if(mm.length == 0){
                this.mmMesaage = "Empty month field!"
            }
            else if(mm.length<2 || mm.length>2){
                this.mmMesaage =  "Month length must be 2 numbers!";
            }
            else if(mm == 0 || mm>12 || mm<1){
                this.mmMesaage =  "Wrong month value!";
            }
            else{
                this.mmMesaage =  null;
            }

            var yy = document.getElementById('yy').value;
            this.yyMessage = null;
            if(yy.length == 0){
                this.yyMessage = "Empty year field!"
            }
            else if(yy.length<2 || yy.length>2){
                this.yyMessage =  "Year length must be 2 numbers!";
            }
            else if(yy == 0 || yy>50 || yy<22){
                this.yyMessage =  "Wrong year value!";
            }
            else{
                this.yyMessage =  null;
            }

            if(this.nameSurnameMessage==null && this.adressMessage==null && this.zipMessage==null && this.cityMessage==null && this.yyMessage==null
                && this.phoneMessage==null && this.cardNumberMessage==null && this.cvcMessage==null && this.mmMesaage==null)
            {
                VueCookies.set('clearData' , 'clearData', 15);
                window.location.href = './orderSuceed'
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
        margin-bottom: 2rem;
    }

    h3{
        color: #C7493A;
    }

    h5{
        color: #C7493A;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    .input-width{
        width: 26%;
    }

    .card-date{
        width: 5rem;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    .inline{
        display: inline;
    }

    #btn-back{
        display: none;
    }

    a{
        text-decoration: none;
    }

    @media screen and (max-width: 1099px) {
        h1{
            font-size: 3rem;
        }
    }

    @media screen and (max-width: 599px) {
        h1{
            font-size: 1.8rem;
        }
    }
    </style>