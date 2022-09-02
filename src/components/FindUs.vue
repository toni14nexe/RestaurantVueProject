<template>
    <section id="findus">
        
        <div class="row main">
            <div class="col-12 title-div">
                <h1 class="title">Find us</h1>
            </div>

            <div class="container-md">
                <div class="row row-margin">
                    <div class="col-1 col-lg-1"></div>
                    <div class="col-10 col-lg-5">
                        <br>
                        <p class="small-text align-left">ChineseFood Restaurant</p>
                        <p class="small-text align-left">Longstreet 123a, New York</p>
                        <p class="small-text align-left">United States</p>
                        <p class="small-text align-left">+0123456789</p>
                    </div>
                    <div class="col-1 lg-off"></div>
                    <div class="col-1 lg-off"></div>
                    <div class="col-10 col-lg-5">
                        <table>
                            <tr>
                                <div class="gmap_canvas">
                                <iframe width="100%" height="100%" id="gmap_canvas" 
                                    src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                                    frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                                </iframe><a href="https://123movies-to.org">
                                </a><br>
                                </div>
                            </tr>
                        </table>
                    </div>
                    <div class="col-1 col-lg-1"></div>
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
    .title{
        padding-top: 5%;
    }

    table{
        width: 100%;
        height: 100%;
    }

    .title-div{
        margin-bottom: -20%;
    }

    tr{
        width: 100%;
        height: 100%;
        text-align: center;
    }

    .gmap_canvas {
        overflow:hidden;
        background:none!important;
        height:100%;
        width:100%;
    }

    @media screen and (min-height: 1050px) {
        table{
            height: 200%;
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

        .align-left{
            text-align: center;
        }
    }

    @media screen and (max-width: 785px){
        iframe{
            margin: 0 5% 0 5%;
            width: 300px;
            height: 300px;
        }
    }

    @media screen and (max-width: 400px){
        iframe{
            margin: 0 5% 0 5%;
            width: 200px;
            height: 200px;
        }
    }

    @media screen and (max-height: 700px){
        .gmap_canvas{
            height: 20vh;
        }
    }

    @media screen and (max-width: 287px){
    .gmap_canvas{
        display: none;
    }  

}
</style>