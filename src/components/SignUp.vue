<template>
    <div @mouseover="listener">
        <h5><b>Email</b></h5>
        <input type="email" placeholder="Email" id="email">
        <div class="input-message" v-if="email_message"><h7>{{email_message}}</h7></div>
        <br><br>
        <h5><b>Username</b></h5>
        <input type="username" placeholder="Username" id="username-sign-up">
        <div class="input-message" v-if="username_message"><h7>{{username_message}}</h7></div>
        <br><br>
        <h5><b>Password</b></h5>
        <input type="password" placeholder="Password" id="password-sign-up">
        <div class="input-message" v-if="password_message"><h7>{{password_message}}</h7></div>
        <br><br>
        <h5><b>Confirm password</b></h5>
        <input type="password" placeholder="Confirm password" id="password2">
        <div class="input-message" v-if="password2_message"><h7>{{password2_message}}</h7></div>
        <br><br>
        <h5><b>Adress</b></h5>
        <input type="adress" placeholder="Adress" id="adress">
        <div class="input-message" v-if="adress_message"><h7>{{adress_message}}</h7></div>
        <br><br>
        <h5><b>Zip code</b></h5>
        <input type="number" placeholder="Zip code" id="zip">
        <div class="input-message" v-if="zip_message"><h7>{{zip_message}}</h7></div>
        <br><br>
        <h5><b>City</b></h5>
        <input type="city" placeholder="City" id="city">
        <div class="input-message" v-if="city_message"><h7>{{city_message}}</h7></div>
        <br><br>
        <h5><b>Phone number</b></h5>
        <input type="number" placeholder="Phone number" id="phone">
        <div class="input-message" v-if="phone_message"><h7>{{phone_message}}</h7></div>
        <br><br>
        <button type="input" class="sign-in-btn" @click="signUp">Register</button>
        <br><br>
    </div>
</template>

<script>
import axios from 'axios';
var userURL = "users";
var cartURL = "cartItems"
export default {
    data(){
        return{
            email_message: null,
            username_message: null,
            password_message: "",
            password_check: 0,
            password2_message: null,
            adress_message: null,
            zip_message: null,
            city_message: null,
            phone_message: null,
            users: [],
            regValid: true
        }
    },
    methods:{
        async signUp(){
            var email = document.getElementById('email').value;
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(email.length==0){ this.email_message = "Empty email!"; }
            else if (email.match(validRegex)) { this.email_message = null } 
            else { this.email_message = "Invalid email!"; }
            var username = document.getElementById('username-sign-up').value;
            if(username.length==0){ this.username_message = "Empty username!"; }
            else if(username.length>0 && username.length<6){ this.username_message = "Username must be at least 6 characters long!"; }
            else if(username.length>10){ this.username_message = "Username must be less than 11 characters long!"; }
            else{ this.username_message = null }
            var password = document.getElementById('password-sign-up').value;
            this.password_message = "";
            this.password_check = 0;
            if(password.length==0){ this.password_message = "Empty password!"; }
            else{
                this.password_message = "Password still missing: "
                if(password.match(/[A-Z]/g)){ this.password_check++; }
                    else{ this.password_message += " capital letter"; }
                if(password.match(/[a-z]/g)){ this.password_check++; }
                    else{ 
                        if(this.password_message.length == 39) { this.password_message += "," }
                        this.password_message += " lowercase letter"; 
                    }
                if(password.match(/[0-9]/g)){ this.password_check++; }
                    else{ 
                        if(this.password_message.length == 39 || this.password_message.length==41) { this.password_message += "," }
                        this.password_message += " number"; 
                    }
                if(this.password_check == 3){ this.password_message = null }
            }
            if(this.password_check == 3){
                if(password.length>7){ this.password_check++; }
                    else{ this.password_message += "Password must be at least 8 characters long!"; }
            }
            if(this.password_check == 4){ this.password_message = null; }
            var password2 = document.getElementById('password2').value;
            if(password2.length==0){ this.password2_message = "Empty password confirmation!"; }
            else if(password2 != password){ this.password2_message = "Passwords do not match!"; }
            else{ this.password2_message = null }
            var adress = document.getElementById('adress').value;
            if(adress.length==0){ this.adress_message = "Empty adress!"; }
            else{
                if(adress.length>4){
                    if(adress.match(/[A-Z]/g) || adress.match(/[a-z]/g)){ 
                        if(adress.match(/[0-9]/g)){ 
                            this.adress_message = null
                        }
                        else{
                            this.adress_message = "Adress is missing a house number!"
                        }
                    }
                    else{
                        if(adress.match(/[0-9]/g)){ 
                            this.adress_message = "Adress is missing street name!" 
                        }
                        else{
                            this.adress_message = "Adress is missing street name and a house number!"
                        }
                    }
                }
                else{
                    this.adress_message = "Adress is too short!"
                }
            }
            var zip = parseInt(document.getElementById('zip').value)
            this.zip_message = null
            if(zip){
                if(zip < 10000 || zip > 99999){
                    this.zip_message = "Zip code must be from 10000 to 99999!";
                }
                else{ this.zip_message = null }
            }
            else{ this.zip_message = "Zip code is empty!"; }
            var city = document.getElementById('city').value;   
            this.city_message = null;
            if(city.length!=0){
                if(city.length>2){
                    if(city.match(/[^A-Ž\s]/ig)){ this.city_message = "Wrong city name!"}
                    else{ this.city_message = null }
                }
                else{ this.city_message = "City  name is too short!" }
            }
            else{ this.city_message = "Empty city name!" }
            var phone = document.getElementById('phone').value;
            this.phone_message = null
            if(phone){ 
                if(phone.match(/[0-9]/ig)){
                    if(phone.length > 8){
                        if(phone.length < 13){ this.phone_message = null }
                        else{ this.phone_message = "Phone number is too long!" }
                    }
                    else{ this.phone_message = "Phone number is too short!" }
                }
                else{ this.phone_message = "Phone number should contain numbers only!" }
            }
            else{ this.phone_message = "Empty phone number!" }
            try{
                const res = await axios.get(userURL);
                this.users = res.data;
            }
            catch(e){
                console.error(e);
            }
            for (var i = 0; i < this.users.length; i++) {
                if(this.users[i].email == document.getElementById('email').value) { 
                    this.regValid = false; 
                    this.email_message = "This email is already registrated!"
                }
                if(this.users[i].username == document.getElementById('username-sign-up').value) { 
                    this.regValid = false; 
                    this.username_message = "This username is already in use!"
                }
            }
            if(this.email_message==null && this.username_message==null && this.password_check==4 && this.password2_message==null
            && this.adress_message==null && this.zip_message==null && this.city_message==null && this.phone_message==null){                
                if(this.regValid == true){
                    const res = await axios.post(userURL, {
                        email: document.getElementById('email').value, 
                        username: document.getElementById('username-sign-up').value, 
                        password: document.getElementById('password-sign-up').value, 
                        adress: document.getElementById('adress').value, 
                        zipCode: document.getElementById('zip').value,
                        city: document.getElementById('city').value, 
                        phone: document.getElementById('phone').value, 
                        category: "user"
                    });
                    this.users = [...this.users, res.data];
                    window.location = "https://toni14nexe.000webhostapp.com/addToDatabase.php?username=" + document.getElementById('username-sign-up').value + 
                        "&password=" + document.getElementById('password-sign-up').value + "&email=" + document.getElementById('email').value +
                        "&adress=" + document.getElementById('adress').value + "&zipCode=" + document.getElementById('zip').value + 
                        "&city=" + document.getElementById('city').value + "&phone=" + document.getElementById('phone').value;
                }
            }
        },
        listener(){
            const btn = document.querySelector('.sign-in-btn');
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
            });
            $('#main_div').on('click', function(event){
            event.stopPropagation();
            });
        }
    }
}
</script>

<style scoped>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type=number] {
        -moz-appearance: textfield;
    }
    input{
        min-width: 200px;
        width: 100%;
    }
</style>