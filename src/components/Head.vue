<template>
    <section id="home">

        <div class="main">
            <navbar/>
            
            <a href="#about" id="big-btn-href"><button class="big-btn" id="big-btn">About</button></a>

        </div>

    </section>
</template>

<script>
import Navbar from './Navbar.vue'

export default {
    components:{
        'navbar': Navbar
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Quicksand:400,500,700');

    .main{
        background-image: url(../assets/images/head-background.jpg);
    }

    .big-btn{
        margin-top: 50vh;
    }

    @media screen and (max-width: 991px) {
        .main-switch{
            display: flex;
        }
    }

    @media screen and (max-width: 464px) {
        .img-first{
            display: none;
        }

        #title-a:hover .img-second{
            transition: 0.8s ease;
            display: none;
        }

        #title-a{
            font-size: 100%;
        }
    }

    @media screen and (max-width: 351px) {
        .big-btn{
            font-size: 2rem;
        }
    }

    @media screen and (max-width: 293px) {
        #title-a{
            font-size: 80%;
        }
    }
</style>