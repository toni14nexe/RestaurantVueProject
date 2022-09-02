<template>
    <div @mouseover="listener">
        <h5><b>Username</b></h5>
        <input type="username" placeholder="Username" id="username-log-in" v-model="username">
        <div class="input-message" v-if="username_message"><h7>{{username_message}}</h7></div>
        <br><br>
        <h5><b>Password</b></h5>
        <input type="password" placeholder="Password" id="password-log-in" v-model="password">
        <div class="input-message" v-if="password_message"><h7>{{password_message}}</h7></div>
        <br><br>
        <button type="input" class="sign-in-btn" @click="logIn">Log in</button>
        <br><br>
        <a href="/passwordReset"><button type="button" class="switch-btn" @click="switchState">Forgot password</button></a>                                                      
    </div>
</template>

<script>
import axios from 'axios';
import VueCookies from 'vue-cookies'

var userURL = "users";

export default {
    data(){
        return{
            username_message: null,
            password_message: null,
            go: null,
            users: [],
            usernameOK: false,
            passwordOK: false,
        }
    },
    methods:{
        async logIn(){
            var username = document.getElementById('username-log-in').value;
            if(username.length==0){ this.username_message = "Empty username!"; }
            else if(username.length>0 && username.length<6){ this.username_message = "Username is too short!"; }
            else if(username.length>10){ this.username_message = "Username is too long!"; }
            else{ this.username_message = null }

            var password = document.getElementById('password-log-in').value;
            if(password.length==0){ this.password_message = "Empty password!"; }
            else if(password.length>0 && password.length<8){ this.password_message = "Password is too short!"; }
            else{ this.password_message = null }

            if(this.username_message==null && this.password_message==null)
            {
                try{
                    const res = await axios.get(userURL);
                    this.users = res.data;
                }
                catch(e){
                    console.error(e);
                }
                this.usernameOK = false
                for (var i = 0; i < this.users.length; i++) {
                    if(this.users[i].username == document.getElementById('username-log-in').value) {
                        if(this.users[i].password == document.getElementById('password-log-in').value) {
                            this.passwordOK = true;
                            VueCookies.set('username' , document.getElementById('username-log-in').value, "15min");
                            VueCookies.set('password' , document.getElementById('password-log-in').value, "15min");
                            if(this.users[i].category == "user") {
                                window.location.href = '/home';
                            }
                            else if(this.users[i].category == "admin"){
                                window.location.href = '/administrator';
                            }
                        }
                    }
                }
                if(this.passwordOK == false){ this.password_message = "Wrong username or password!" }
            }

            
        },
        listener(){
            const btn = document.querySelector('.sign-in-btn');
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
            });
            $('#main-div').on('click', function(event){
            event.stopPropagation();
            });
        }
    }
}
</script>

<style scoped>
    input{
        min-width: 200px;
        width: 100%;
    }

    .switch-btn{
        letter-spacing: 0.32px;
    }
</style>