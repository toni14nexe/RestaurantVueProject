import axios from 'axios';
import VueCookies from 'vue-cookies'

var userURL = "users";

export default{
    data(){
        return{
            username: null,
            password: null,
            validation: false,
            users:[]
        }
    },
    async start(){
        this.username = $cookies.get("username");
        this.password = $cookies.get("password");
        VueCookies.set('username' , $cookies.get("username"), "15min");
        VueCookies.set('password' , $cookies.get("password"), "15min");

        try{
            const res = await axios.get(userURL);
            this.users = res.data;
        }
        catch(e){
            console.error(e);
        }
        for (var i = 0; i < this.users.length; i++) {
            if(this.users[i].username == this.username && this.users[i].password == this.password){
                this.validation = true;
                if(this.users[i].category == 'admin'){
                    window.location.href = '/administrator'; 
                }
                break;
            }
        }

        if(this.validation != true){  
            $cookies.remove('username');
            $cookies.remove('password');
            window.location.href = '/';
        }
    
        document.querySelector("#home-dropdown").style.display = "none";
        document.querySelector("#user-dropdown").style.display = "inherit";
        document.querySelector("#user-cart-btn").style.display = "inherit";
        document.querySelector("#order-btn").style.display = "inherit";
        document.getElementById('username-div').innerHTML += this.username;
        document.getElementById('title-a').href = ('/home#home');
        document.getElementById('home-href').href = ('/home#home');
        document.getElementById('about-href').href = ('/home#about');
        document.getElementById('dishes-href').href = ('/home#dishes');
        document.getElementById('findus-href').href = ('/home#findus');
    }
}