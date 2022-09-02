export default{
    data(){
        return{
            username: null,
            password: null,
            validation: false,
        }
    },
    check(){
        this.username = $cookies.get("username");
        this.password = $cookies.get("password");
        
        if(this.username != null || this.password != null){
            window.location.href = '/home';
        }

        document.getElementById('title-a').href = ('/#home');
        document.getElementById('home-href').href = ('/#home');
        document.getElementById('about-href').href = ('/#about');
        document.getElementById('dishes-href').href = ('/#dishes');
        document.getElementById('findus-href').href = ('/#findus');
    }
}