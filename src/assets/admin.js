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
        VueCookies.set('username' , $cookies.get("username"), "30min");
        VueCookies.set('password' , $cookies.get("password"), "30min");

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
                if(this.users[i].category == 'user'){
                    window.location.href = '/home'; 
                }
                break;
            }
        }


        if(this.validation != true){  
            $cookies.remove('username');
            $cookies.remove('password');
            window.location.href = '/'; 
        }
    }
}