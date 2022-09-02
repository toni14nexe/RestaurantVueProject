<template>
  <center>
    <div id="main">
      <navbar-component/>
        <div class="col-12 title-div">
          <h1 class="title" id="title">Account</h1>
          <table>
            <tr>
              <td>Username:</td>
              <td>{{username}}</td>
              <td></td>
            </tr>
            <tr>
              <td>E-mail:</td>
              <td>{{email}}</td>
              <td></td>
            </tr>
            <tr>
              <td>Adress:</td>
              <td>{{adress}}</td>
              <td><button class="sign-in-btn" @click="adressInput" id="adressChangeBtn">Change</button></td>
            </tr>
            <tr class="hide" id="adressTr">
              <td>New adress:</td>
              <td><input type="text" placeholder="Adress" id="adressInput"></td>
              <td><button class="sign-in-btn" @click="saveAdress">Save</button></td>
            </tr>
            <tr class="hide message" id="adressMessageTr">
              <td colspan="3">{{adressMessage}}</td>
            </tr>
            <tr>
              <td>Zip Code:</td>
              <td>{{zip}}</td>
              <td><button class="sign-in-btn" @click="zipInput"  id="zipChangeBtn">Change</button></td>
            </tr>
            <tr class="hide" id="zipTr">
              <td>New zip code:</td>
              <td><input type="number" placeholder="Zip code" id="zipInput"></td>
              <td><button class="sign-in-btn" @click="saveZip">Save</button></td>
            </tr>
            <tr class="hide message" id="zipMessageTr">
              <td colspan="3">{{zipMessage}}</td>
            </tr>
            <tr>
              <td>City:</td>
              <td>{{city}}</td>
              <td><button class="sign-in-btn"  @click="cityInput"  id="cityChangeBtn">Change</button></td>
            </tr>
            <tr class="hide" id="cityTr">
              <td>New city:</td>
              <td><input type="text" placeholder="City" id="cityInput"></td>
              <td><button class="sign-in-btn" @click="saveCity">Save</button></td>
            </tr>
            <tr class="hide message" id="cityMessageTr">
              <td colspan="3">{{cityMessage}}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>{{phone}}</td>
              <td><button class="sign-in-btn" @click="phoneInput"  id="phoneChangeBtn">Change</button></td>
            </tr>
            <tr class="hide" id="phoneTr">
              <td>New phone:</td>
              <td><input type="number" placeholder="Phone" id="phoneInput"></td>
              <td><button class="sign-in-btn" @click="savePhone">Save</button></td>
            </tr>
            <tr class="hide message" id="phoneMessageTr">
              <td colspan="3">{{phoneMessage}}</td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>{{passwordText}}</td>
              <td><button class="sign-in-btn" @click="passwordInput"  id="passwordChangeBtn">Change</button></td>
            </tr>
            <tr class="hide" id="passwordTr">
              <td>New password:</td>
              <td><input type="password" placeholder="Password" id="passwordInput"></td>
              <td></td>
            </tr>
            <tr class="hide" id="passwordConfirmTr">
              <td>Confirm password:</td>
              <td><input type="password" placeholder="Password" id="passwordConfirmInput"></td>
              <td><button class="sign-in-btn" @click="savePassword">Save</button></td>
            </tr>
            <tr class="hide message" id="passwordMessageTr">
              <td colspan="3">{{passwordMessage}}</td>
            </tr>
          </table>
          <br><br>
        </div>

    </div>
    <footer-component/>
  </center>
</template>



<script>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import User from '../assets/user.js';
import axios from 'axios';
import VueCookies from 'vue-cookies'

var userURL = "users";

export default {
  data(){
    return{
      Component: 'header',
      username: null,
      email: null,
      adress: null,
      zip: null,
      city: null,
      phone: null,
      password: null,
      category: null,
      index: null,
      passwordText: '',
      passwordMessage: null,
      phoneMessage: null,
      cityMessage: null,
      zipMessage: null,
      adressMessage: null,
      users:[]
    }
  },
  components:{
    'navbar-component': Navbar,
    'footer-component': Footer
  },
  async mounted(){
    User.start();

    this.username = $cookies.get("username");
    this.password = $cookies.get("password");

    try{
      const res = await axios.get(userURL);
      this.users = res.data;
    }
    catch(e){
      console.error(e);
    }
    for (var i = 0; i < this.users.length; i++) {
      if(this.users[i].username == this.username && this.users[i].password == this.password){
        this.email = this.users[i].email;
        this.adress = this.users[i].adress;
        this.zip = this.users[i].zipCode;
        this.city = this.users[i].city;
        this.phone = this.users[i].phone;
        this.category = this.users[i].category;
        this.index = i+1;
        break;
      }
    }

    for(var i = 0; i < this.password.length; i++){
      this.passwordText += '*';
    }
  },
  methods:{
    adressInput(){
      if(document.getElementById("adressTr").style.display == 'table-row'){
        document.getElementById("adressTr").style.display = 'none'
        document.getElementById("adressMessageTr").style.display = 'none'
        document.getElementById("adressChangeBtn").innerHTML = 'Change';
      }else{
        document.getElementById("adressTr").style.display = 'table-row';
        document.getElementById("adressChangeBtn").innerHTML = 'Close';
        if(this.adressMessage != null){ document.getElementById("adressMessageTr").style.display = 'table-row'; }
      }
    },
    async saveAdress(){
      if(document.getElementById('adressInput').value.length == 0){
        document.getElementById('adressMessageTr').style.display = 'table-row'
        this.adressMessage = 'Adress is empty!'
      }else if(document.getElementById('adressInput').value.length < 5){
        document.getElementById('adressMessageTr').style.display = 'table-row'
        this.adressMessage = 'Adress is too short!'
      }else if(!document.getElementById('adressInput').value.match(/[A-Z]/g) && !document.getElementById('adressInput').value.match(/[a-z]/g)){
        document.getElementById('adressMessageTr').style.display = 'table-row'
        this.adressMessage = 'Adress is missing street name!'
      }else if(!document.getElementById('adressInput').value.match(/[0-9]/g)){
        document.getElementById('adressMessageTr').style.display = 'table-row'
        this.adressMessage = 'Adress is missing a house number!'
      }else{
        this.adress = document.getElementById('adressInput').value;
        await axios.put(userURL + "/" + this.index, {
          email: this.email,
          username: this.username,
          password: this.password,
          adress: this.adress,
          zipCode: this.zip,
          city: this.city,
          phone: this.phone,
          category: this.category,
          id: this.index
        });
        document.getElementById("adressTr").style.display = 'none'
        document.getElementById("adressMessageTr").style.display = 'none'
        document.getElementById("adressInput").value = null
        document.getElementById("adressChangeBtn").innerHTML = 'Change';
        this.adressMessage = null;
      }
    },


    zipInput(){
      if(document.getElementById("zipTr").style.display == 'table-row'){
        document.getElementById("zipTr").style.display = 'none'
        document.getElementById("zipMessageTr").style.display = 'none'
        document.getElementById("zipChangeBtn").innerHTML = 'Change';
      }else{
        document.getElementById("zipTr").style.display = 'table-row';
        document.getElementById("zipChangeBtn").innerHTML = 'Close';
        if(this.zipMessage != null){ document.getElementById("zipMessageTr").style.display = 'table-row'; }
      }
    },
    async saveZip(){
      if(document.getElementById('zipInput').value.length == 0){
        document.getElementById('zipMessageTr').style.display = 'table-row'
        this.zipMessage = "Zip code is empty!"
      }else if(document.getElementById('zipInput').value < 10000 || document.getElementById('zipInput').value > 99999){
        document.getElementById('zipMessageTr').style.display = 'table-row'
        this.zipMessage = "Zip code must be from 10000 to 99999!"
      }else{
        this.zip = document.getElementById('zipInput').value;
        await axios.put(userURL + "/" + this.index, {
          email: this.email,
          username: this.username,
          password: this.password,
          adress: this.adress,
          zipCode: this.zip,
          city: this.city,
          phone: this.phone,
          category: this.category,
          id: this.index
        });
        document.getElementById("zipTr").style.display = 'none'
        document.getElementById("zipMessageTr").style.display = 'none'
        document.getElementById("zipInput").value = null
        document.getElementById("zipChangeBtn").innerHTML = 'Change';
        this.zipMessage = null;
      }
    },


    cityInput(){
      if(document.getElementById("cityTr").style.display == 'table-row'){
        document.getElementById("cityTr").style.display = 'none'
        document.getElementById("cityMessageTr").style.display = 'none'
        document.getElementById("cityChangeBtn").innerHTML = 'Change';
      }else{
        document.getElementById("cityTr").style.display = 'table-row';
        document.getElementById("cityChangeBtn").innerHTML = 'Close';
        if(this.cityMessage != null){ document.getElementById("cityMessageTr").style.display = 'table-row'; }
      }
    },
    async saveCity(){
      if(document.getElementById('cityInput').value.length == 0){
        document.getElementById('cityMessageTr').style.display = 'table-row'
        this.cityMessage = "City name is empty!"
      }else if(document.getElementById('cityInput').value.length < 3){
        document.getElementById('cityMessageTr').style.display = 'table-row'
        this.cityMessage = "City name is too short!"
      }else if(document.getElementById('cityInput').value.match(/[0-9]/ig)){
        document.getElementById('cityMessageTr').style.display = 'table-row'
        this.cityMessage = "Wrong city name!"
      }else{
        this.city = document.getElementById('cityInput').value;
        await axios.put(userURL + "/" + this.index, {
          email: this.email,
          username: this.username,
          password: this.password,
          adress: this.adress,
          zipCode: this.zip,
          city: this.city,
          phone: this.phone,
          category: this.category,
          id: this.index
        });
        document.getElementById("cityTr").style.display = 'none'
        document.getElementById("cityMessageTr").style.display = 'none'
        document.getElementById("cityInput").value = null
        document.getElementById("cityChangeBtn").innerHTML = 'Change';
        this.cityMessage = null;
      }
    },

    
    phoneInput(){
      if(document.getElementById("phoneTr").style.display == 'table-row'){
        document.getElementById("phoneTr").style.display = 'none'
        document.getElementById("phoneMessageTr").style.display = 'none'
        document.getElementById("phoneChangeBtn").innerHTML = 'Change';
      }else{
        document.getElementById("phoneTr").style.display = 'table-row';
        document.getElementById("phoneChangeBtn").innerHTML = 'Close';
        if(this.phoneMessage != null){ document.getElementById("phoneMessageTr").style.display = 'table-row'; }
      }
    },
    async savePhone(){
      if(document.getElementById('phoneInput').value.length == 0){
        document.getElementById('phoneMessageTr').style.display = 'table-row';
        this.phoneMessage = "Phone number is empty!";
      }else if(document.getElementById('phoneInput').value.length < 9){
        document.getElementById('phoneMessageTr').style.display = 'table-row';
        this.phoneMessage = "Phone number is too short!";
      }else if(document.getElementById('phoneInput').value.length > 12){
        document.getElementById('phoneMessageTr').style.display = 'table-row';
        this.phoneMessage = "Phone number is too long!";
      }else if(!document.getElementById('phoneInput').value.match(/[0-9]/ig)){
        document.getElementById('phoneMessageTr').style.display = 'table-row';
        this.phoneMessage = "Wrong phone number!";
      }else{
        this.phone = document.getElementById('phoneInput').value;
        await axios.put(userURL + "/" + this.index, {
          email: this.email,
          username: this.username,
          password: this.password,
          adress: this.adress,
          zipCode: this.zip,
          city: this.city,
          phone: this.phone,
          category: this.category,
          id: this.index
        });
        document.getElementById("phoneTr").style.display = 'none'
        document.getElementById("phoneInput").value = null
        document.getElementById("phoneMessageTr").style.display = 'none'
        document.getElementById("phoneChangeBtn").innerHTML = 'Change';
        this.phoneMessage = null;
      }
    },


    passwordInput(){
      if(document.getElementById("passwordTr").style.display == 'table-row'){
        document.getElementById("passwordTr").style.display = 'none'
        document.getElementById("passwordMessageTr").style.display = 'none'
        document.getElementById("passwordConfirmTr").style.display = 'none'
        document.getElementById("passwordChangeBtn").innerHTML = 'Change';
      }else{
        document.getElementById("passwordTr").style.display = 'table-row';
        document.getElementById("passwordTr").style.borderBottom = 'none';
        document.getElementById("passwordConfirmTr").style.borderTop = 'none';
        document.getElementById("passwordConfirmTr").style.display = 'table-row';
        document.getElementById("passwordChangeBtn").innerHTML = 'Close';
        if(this.passwordMessage != null){ document.getElementById("passwordMessageTr").style.display = 'table-row'; }
      }
    },
    async savePassword(){
      this.password = document.getElementById('passwordInput').value;
      if(this.password.length == 0){
        document.getElementById('passwordMessageTr').style.display = 'table-row';
        this.passwordMessage = 'Empty password!';
      }else if(this.password.length < 8){
        document.getElementById('passwordMessageTr').style.display = 'table-row';
        this.passwordMessage = 'Password must be at least 8 characters long!';
      }else if(!this.password.match(/[A-Z]/g) || !this.password.match(/[a-z]/g) || !this.password.match(/[0-9]/g)){
        document.getElementById('passwordMessageTr').style.display = 'table-row';
        this.passwordMessage = "Password still missing: "
        if(!this.password.match(/[A-Z]/g)){ this.passwordMessage += " capital letter"; }
        if(!this.password.match(/[a-z]/g)){ 
          if(this.passwordMessage != "Password still missing: "){ this.passwordMessage += ','; }
          this.passwordMessage += " lowercase letter"; 
        }
        if(!this.password.match(/[0-9]/g)){ 
          if(this.passwordMessage != "Password still missing: "){ this.passwordMessage += ','; }
          this.passwordMessage += " number"; 
        }
      }else if(this.password != document.getElementById('passwordConfirmInput').value){
        document.getElementById('passwordMessageTr').style.display = 'table-row';
        this.passwordMessage = 'Passwords do not match!';
      }else{
        await axios.put(userURL + "/" + this.index, {
        email: this.email,
        username: this.username,
        password: this.password,
        adress: this.adress,
        zipCode: this.zip,
        city: this.city,
        phone: this.phone,
        category: this.category,
        id: this.index
      });
      this.passwordText = '';
      for(var i = 0; i < this.password.length; i++){
        this.passwordText += '*';
      }
      VueCookies.set('password' , this.password, "15min");
      document.getElementById("passwordTr").style.display = 'none'
      document.getElementById("passwordInput").value = null;
      document.getElementById("passwordConfirmTr").style.display = 'none'
      document.getElementById("passwordConfirmInput").value = null
      document.getElementById("passwordMessageTr").style.display = 'none'
      document.getElementById("passwordChangeBtn").innerHTML = 'Change';
      this.passwordMessage = null;
      }
    },
  }
}
</script>



<style scoped>
  #main{
    min-height: 100vh;
  }

  table{
    color: #C7493A;
    font-size: 2rem;
    text-align: center;
  }

  table tr td{
    padding: 10px;
  }

  .sign-in-btn:hover{
    letter-spacing: 0;
  }

  .hide{
    display: none;
    border: 2px solid #C7493A;
  }

  .message{
    background-color: white;
    color: red;
    font-weight: bold;
    font-size: 1.3rem;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  @media screen and (max-width: 889px) {
    h1{
      font-size: 3rem;
    }

    td{
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: 649px) {
    h1{
      font-size: 2rem;
    }

    td{
      font-size: 1rem;
    }

    .sign-in-btn{
      font-size: 0.7rem;
    }
  }

  @media screen and (max-width: 399px) {
    h1{
      font-size: 1.6rem;
    }

    td{
      font-size: 0.6rem;
    }

    .sign-in-btn{
      font-size: 0.4rem;
    }
  }
</style>