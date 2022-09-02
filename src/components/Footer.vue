<template>
    <div class='footer'>
        <br>
        <div class="container-md">
            <div class="row">
                <div class="col-3">
                    <a href="https://www.facebook.com/" target="_blank"><img src="../assets/images/favicon-facebook.png" alt="Our Facebook page"></a>
                </div>
                <div class="col-3">
                    <a href="https://www.instagram.com/" target="_blank"><img src="../assets/images/favicon-instagram.png" alt="Our Instagram page"></a>
                </div>
                <div class="col-3">
                    <a href="https://twitter.com/?lang=en" target="_blank"><img src="../assets/images/favicon-twitter.png" alt="Our Twitter page"></a>
                </div>
                <div class="col-3">
                    <a href="https://www.pinterest.com/" target="_blank"><img src="../assets/images/favicon-pinterest.png" alt="Our Pinterest page"></a>
                </div>
            </div>
        </div>
        <br>
        <a href="/home#home">
            <h3>...ChineseFood... © </h3>
            <h6> All rights reserved.</h6>
        </a>
        <br><br>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    div{
        background-color: #C7493A;
    }

    h3{
        display: inline;
        color: rgb(33, 37, 41);
    }

    h6{
        display: inline;
        color: rgb(33, 37, 41);
    }

    img{
        border-radius: 100%;
        background-color: rgb(33, 37, 41);
        width: 50%;
        transition: transform 0.7s ease-in-out;
        max-width: 70px;
    }

    a{
        text-decoration: none;
    }

    a:hover{
        text-decoration: underline;
        color: rgb(33, 37, 41);
    }

    img:hover {
        transform: rotate(360deg);
    }

    @media screen and (max-height: 660px) {
    .big-text{
      font-size: 1.7rem;
    }
  }
</style>