<template>
    <section id="dishes">
        
        <div class="main">
            <div class="row main-background">
                <div class="col-12 title-div">
                    <h1 class="title">Dishes</h1>
                </div>

                <div class="container-md">
                    <div class="row row-margin">
                        <div class="col-1 col-lg-1"></div>
                        <div class="col-10 col-lg-5">
                            <p class="big-text">Quality food and quality drinks with quality service in a pleasant atmosphere.</p>
                        </div>
                        <div class="col-1 lg-off"></div>
                        <div class="col-2 lg-off"></div>
                        <div class="col-8 col-lg-5 image-div">
                            <img src="../assets/images/dishes-img.jpg">
                        </div>
                        <div class="col-1 col-lg-1"></div>
                    </div>
                </div>
            </div>
        </div>

    </section>    
</template>

<script>
export default {

}
</script>
    
<style scoped>
    .main{
        background-image: url(../assets/images/head-background.jpg);
    }

    .lg-off{
        display: none;
    }

    .main-background{
        width: 100%; 
        height: 100vh; 
        background-color: rgb(33, 37, 41, 0.7);
    }

    .title{
        padding-top: 5%;
        background: none;
    }
    
    img{
        max-height: 35vh;
        max-width: 100%;
        width: auto;
    }

    @media screen and (min-height: 1050px) {
        .big-text{
            padding-top: 10%;
        }
    }

    @media screen and (max-width: 1399px){
        .big-text{
            font-size: 2.8rem;
        } 
    }

    @media screen and (max-width: 992px){
        .big-text{
            font-size: 2rem;
        }
        .lg-off{
            display:block;
        }
    }

    @media screen and (max-height: 660px) {
    .big-text{
      font-size: 1.7rem;
    }
  }
</style>