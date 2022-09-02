<template>
    <div id="main">
        <a href="/account"><button class="sign-in-btn">Account</button></a>
        <a href="/cart"><button class="sign-in-btn">Cart</button></a>
        <button class="sign-in-btn" @click='logOut'>Log out</button>
    </div>
</template>

<script>

export default {
    methods:{
        logOut(){
            $cookies.remove('username');
            $cookies.remove('password');
            window.location.href = '/'; 
        }
    }
}
</script>

<style scoped>
    #main{
        width: 100%;
    }

    .sign-in-btn{
        width: 100%;
    }
</style>