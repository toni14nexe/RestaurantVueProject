<template>
    <center>
        <div id="main">
            <navbar/>

            <br><br><br><br><br><br>
            <div id="form">
                <p class="small-text"><b>Reset password</b></p>
                <p class="small-text">Email</p>
                <input type="email" placeholder="Email" v-model="email">
                <div class="input-message" v-if="email_message"><h7>{{email_message}}</h7></div>
                <br><br>
                <p class="small-text">Username</p>
                <input type="username" placeholder="Username" v-model="username">
                <div class="input-message" v-if="username_message"><h7>{{username_message}}</h7></div>
                <br><br>
                <p class="small-text">Password</p>
                <input type="password" placeholder="Password" v-model="password">
                <br><br>
                <p class="small-text">Confirm password</p>
                <input type="password" placeholder="Password" v-model="confirmationPassword">
                <div class="input-message" v-if="password_message"><h7>{{password_message}}</h7></div>
                <br>
                <div class="input-message" v-if="valid_message"><h7>{{valid_message}}</h7></div>
                <br><br>
                <button class="sign-in-btn" @click="reset">Reset</button>
            </div>

        </div>

        <end/>
    </center>
</template>

<script>
import Navbar from './Navbar.vue'
import LoggedOut from '../assets/loggedOut.js'
import Footer from './Footer.vue'
import axios from 'axios';

var userURL = 'users';

export default {
    data(){
        return{
            users: [],
            email: '',
            username: '',
            password: '',
            confirmationPassword: '',
            email_message: null,
            username_message: null,
            password_message: null,
            valid_message: null,
            valid: false,
            user: null
        }
    },
    components:{
        'navbar': Navbar,
        'end': Footer
    },
    mounted(){
        LoggedOut.check()
    },
    methods:{
        async reset(){
            this.checkEmail()
            this.checkUsername()
            this.checkPassword()
            this.valid = false
            this.user = null
            try{
                const res = await axios.get(userURL);
                this.users = res.data;
            }
            catch(e){
                console.error(e);
            }
            for (var i = 0; i < this.users.length; i++) {
                if(this.users[i].username == this.username && this.users[i].email == this.email){
                    this.valid = true
                    this.user = this.users[i]
                    break;
                }
            }
            if(this.valid == false){
                this.valid_message = 'Wrong email or username!'
            }else{ this.valid_message = null }
            if(this.valid_message == null && this.email_message == null && this. username_message == null && this.password_message == null){
                await axios.put(userURL + "/" + this.user.id, {
                    email: this.user.email,
                    username: this.user.username,
                    password: this.password,
                    adress: this.user.adress,
                    zipCode: this.user.zipCode,
                    city: this.user.city,
                    phone: this.user.phone,
                    category: this.user.category,
                    id: this.user.id
                });
                this.user = null
                this.username = null
                this.email = null
                this.password = null
                this.confirmationPassword = null
            }
        },
        checkEmail(){
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(this.email.length==0){ this.email_message = "Empty email!"; }
            else if (this.email.match(validRegex)) { this.email_message = null } 
            else { this.email_message = "Invalid email!"; }
        },
        checkUsername(){
            if(this.username.length==0){ this.username_message = "Empty username!"; }
            else if(this.username.length>0 && this.username.length<6){ this.username_message = "Username must be at least 6 characters long!"; }
            else if(this.username.length>10){ this.username_message = "Username must be less than 11 characters long!"; }
            else{ this.username_message = null }
        },
        checkPassword(){
            this.password_message = null
            if(this.password.length == 0){
                this.password_message = 'Empty password!';
            }else if(this.password.length < 8){
                this.password_message = 'Password must be at least 8 characters long!';
            }else if(!this.password.match(/[A-Z]/g) || !this.password.match(/[a-z]/g) || !this.password.match(/[0-9]/g)){
                this.password_message = "Password still missing: "
                if(!this.password.match(/[A-Z]/g)){ this.password_message += " capital letter"; }
                if(!this.password.match(/[a-z]/g)){ 
                    if(this.password_message != "Password still missing: "){ this.password_message += ','; }
                    this.password_message += " lowercase letter"; 
                }
                if(!this.password.match(/[0-9]/g)){ 
                    if(this.password_message != "Password still missing: "){ this.password_message += ','; }
                    this.password_message += " number"; 
                }
            }else if(this.password != this.confirmationPassword){
                this.password_message = 'Passwords do not match!';
            }
        }
    }
}
</script>

<style scoped>
    #main{
        min-height: 100vh;
        height: fit-content;
        background-image: url(../assets/images/head-background.jpg);
        padding-bottom: 60px;
    }

    #form{
        background: #212529;
        width:fit-content;
        max-width: 274px;
        padding: 15px 15px 15px 15px;
        border-radius: 20px;
        z-index: 3;
    }
</style>