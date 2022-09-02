<template>
    <center>
        <div id="main">
            <div class="col-12 top">
                <h1>{{username}}</h1>
                <button class="sign-in-btn" id="log-out-btn" @click="logOut">Log-out</button>
            </div>
            <div class="col-1"></div>

            <div class="col-10 margin-top">
                <hr><br>
                <h3 class="choose">Choose what you want to do:</h3><br>
                <select class="choose" v-model="show" @change="showDiv">
                    <option value="none" selected>--Choose--</option>
                    <option value="addItem">Add new item</option>
                    <option value="changeItem">Change item</option>
                    <option value="deleteItem">Delete item</option>
                </select>
                <br><hr>
            </div>

            <div class="col-10 margin-top" id="add-div">
                <div class="inline">
                    <h3>Category</h3>
                    <select v-model="selected" @change="changeCategorySelected">
                        <option value="none">--Choose--</option>
                        <option value="soup">Soup</option>
                        <option value="sushi">Sushi</option>
                        <option value="cook-grill">Cook/grill</option>
                        <option value="non-alc-drink">Nonalcoholic drink</option>
                        <option value="alc-drink">Alcoholic drink</option>
                    </select>
                </div>
                <div id="new-first-div">
                    <div class="inline">
                        <h3>Name</h3>
                        <input type="text" id="new-name" placeholder="Item name">
                    </div>
                    <div class="inline" id="new-price-div">
                        <h3>Price</h3>
                        <input type="number"  id="new-price" placeholder="Item price" style="margin-left: 1.5rem">
                        <p class="dollar"> $</p>
                    </div>
                </div>
                <div id="new-last-div">
                    <div class="inline" id="new-ingredients-div">
                        <h3>Ingredients</h3>
                        <input class="ingredients" type="text"  id="new-ingredients" placeholder="Item ingredients">
                    </div>
                </div>
                <button class="sign-in-btn" id="new-btn" @click="saveNewItem">Save</button>
                <br><hr>
            </div>

            <div class="col-10 margin-top" id="change-div">
                <div class="inline">
                    <h3>Choose item</h3>
                    <select v-model="selected1" @change="changeCategorySelected1">
                        <option value="none">--Choose--</option>
                        <option v-for="menu of menus" :key="menu.id">{{menu.name}}</option>
                    </select>
                </div>
                <div class="inline" id="change-price">
                    <h3>Price</h3>
                    <input type="number"  id="change-price-input" placeholder="Item price" style="margin-left: 1.5rem">
                    <p class="dollar"> $</p>
                </div>
                <div class="inline" id="change-ingredients">
                    <h3>Ingredients</h3>
                    <input type="text" class="ingredients" id="change-ingredients-input" placeholder="Item ingredients">
                </div>
                <button class="sign-in-btn" id="change-btn" @click="saveChangedItem">Save</button>
                <br><hr>
            </div>

            <div class="col-10 margin-top" id="delete-div">
                <div class="inline">
                    <h3>Choose item</h3>
                    <select v-model="selected2" @change="changedCategorySelected2">
                        <option value="none">--Choose--</option>
                        <option v-for="menu of menus" :key="menu.id">{{menu.name}}</option>
                    </select>
                </div>
                <button class="sign-in-btn" id="ask-btn" @click="deleteAsk">Delete</button>
                <div id="ask-div">
                    <br><h3>Are you sure you want to delete '{{selected2}}'?</h3>
                    <button class="sign-in-btn" id="yes-btn" @click="deleteYes">Yes</button>
                    <button class="sign-in-btn" id="no-btn" @click="deleteNo">No</button>
                </div>
                <br><hr>
            </div>

            <div class="col-1"></div>
        </div>
        <br><br><end/>
    </center>
</template>

<script>
import Footer from './Footer.vue'
import Admin from '../assets/admin.js';
import axios from 'axios';
import { onMounted } from '@vue/runtime-core';

var baseURL = 'menus';

export default {
    components:{
        'end': Footer
    },
    data(){
        return{
            username: null,
            menus: [],
            show: 'none',
            selected: 'none',
            selected1: 'none',
            selected2: 'none'
        }
    },
    async mounted(){
        Admin.start()
        this.username = $cookies.get("username");

        try{
            const res = await axios.get(baseURL);
            this.menus = res.data;
        }
        catch(e){
            console.error(e);
        }

        document.getElementById('new-first-div').style.display = 'none';
        document.getElementById('new-last-div').style.display = 'none';
        document.getElementById('new-btn').style.display = 'none';
        document.getElementById('change-btn').style.display = 'none';
        document.getElementById('change-price').style.display = 'none';
        document.getElementById('change-ingredients').style.display = 'none';
        document.getElementById('ask-btn').style.display = 'none';
        document.getElementById('ask-div').style.display = 'none';
        document.getElementById('add-div').style.display = 'none';
        document.getElementById('change-div').style.display = 'none';
        document.getElementById('delete-div').style.display = 'none';
    },
    methods:{
        showDiv(){
            if(this.show == 'none'){
                document.getElementById('add-div').style.display = 'none';
                document.getElementById('change-div').style.display = 'none';
                document.getElementById('delete-div').style.display = 'none';
            }else if(this.show == 'addItem'){
                document.getElementById('add-div').style.display = 'inherit';
                document.getElementById('change-div').style.display = 'none';
                document.getElementById('delete-div').style.display = 'none';
            }else if(this.show == 'changeItem'){
                document.getElementById('add-div').style.display = 'none';
                document.getElementById('change-div').style.display = 'inherit';
                document.getElementById('delete-div').style.display = 'none';
            }else if(this.show == 'deleteItem'){
                document.getElementById('add-div').style.display = 'none';
                document.getElementById('change-div').style.display = 'none';
                document.getElementById('delete-div').style.display = 'inherit';
            }
        },



        changeCategorySelected(){
            if(this.selected == 'none'){
                document.getElementById('new-first-div').style.display = 'none';
                document.getElementById('new-last-div').style.display = 'none';
                document.getElementById('new-btn').style.display = 'none';
            }else if(this.selected == 'non-alc-drink' || this.selected == 'alc-drink'){
                document.getElementById('new-first-div').style.display = 'inherit';
                document.getElementById('new-last-div').style.display = 'none';
                document.getElementById('new-btn').style.display = 'inherit';
            }else{
                document.getElementById('new-first-div').style.display = 'inherit';
                document.getElementById('new-last-div').style.display = 'inherit';
                document.getElementById('new-btn').style.display = 'inherit';
            }
        },



        async changeCategorySelected1(){
            if(this.selected1 == 'none'){
                document.getElementById('change-price').style.display = 'none';
                document.getElementById('change-btn').style.display = 'none';
                document.getElementById('change-ingredients').style.display = 'none';
            }else{
                try{
                    const res = await axios.get(baseURL);
                    this.menus = res.data;
                }
                catch(e){
                    console.error(e);
                }
                for (var i = 0; i < this.menus.length; i++) {
                    if(this.menus[i].name == this.selected1){
                        document.getElementById('change-price-input').value = this.menus[i].price;
                        document.getElementById('change-ingredients-input').value = this.menus[i].ingredients;
                        break;
                    }
                }
                if(this.menus[i].category == 'non-alc-drink' || this.menus[i].category == 'alc-drink'){
                    document.getElementById('change-price').style.display = 'inherit';
                    document.getElementById('change-btn').style.display = 'inherit';
                    document.getElementById('change-ingredients').style.display = 'none';
                }else{
                    document.getElementById('change-price').style.display = 'inherit';
                    document.getElementById('change-btn').style.display = 'inherit';
                    document.getElementById('change-ingredients').style.display = 'inherit';
                }
            }
        },


        
        changedCategorySelected2(){
            if(this.selected2 == 'none'){
                document.getElementById('ask-btn').style.display = 'none';
                document.getElementById('ask-div').style.display = 'none';
            }else{
                document.getElementById('ask-btn').style.display = 'inherit';
                document.getElementById('ask-div').style.display = 'none';
            }
        },



        async saveNewItem(){
            var exist = false;
            try{
                const res = await axios.get(baseURL);
                this.menus = res.data;
            }
            catch(e){
                console.error(e);
            }
            for (var i = 0; i < this.menus.length; i++) {
                if(this.menus[i].name == document.getElementById('new-name').value){
                    var exist = true;
                }
            }
            if(this.selected == 'non-alc-drink' || this.selected == 'alc-drink'){
                document.getElementById('new-ingredients').value = ' '
            }
            if(exist == true){
                window.alert("ERROR: That name is already in use!");
            }else if(document.getElementById('new-name').value.length == 0){
                window.alert("ERROR: Empty name field!");
            }else if(document.getElementById('new-price').value.length == 0){
                window.alert("ERROR: Empty price field!");
            }else if(document.getElementById('new-ingredients').value.length == 0){
                window.alert("ERROR: Empty ingredients field!");
            }else{
                const res = await axios.post(baseURL, {
                    name: document.getElementById('new-name').value,
                    ingredients: document.getElementById('new-ingredients').value,
                    price: parseFloat(document.getElementById('new-price').value).toFixed(2),
                    category: this.selected
                });
                this.menus = [...this.menus, res.data];
                window.alert(document.getElementById('new-name').value + " saved successfully.");
                document.getElementById('new-name').value = null
                document.getElementById('new-ingredients').value = null
                document.getElementById('new-price').value = null
                document.getElementById('new-first-div').style.display = 'none';
                document.getElementById('new-last-div').style.display = 'none';
                document.getElementById('new-btn').style.display = 'none';
                this.selected = 'none'
                try{
                    const res = await axios.get(baseURL);
                    this.menus = res.data;
                }
                catch(e){
                    console.error(e);
                }
            }
        },



        async saveChangedItem(){
            try{
                const res = await axios.get(baseURL);
                this.menus = res.data;
            }
            catch(e){
                console.error(e);
            }
            for (var i = 0; i < this.menus.length; i++) {
                if(this.menus[i].name == this.selected1){
                    var id = this.menus[i].id
                    var tempCategory = this.menus[i].category
                }
            }
            if(document.getElementById('change-price-input').value.length == 0){
                window.alert("ERROR: Empty price field!");
            }else if(document.getElementById('change-ingredients-input').value.length == 0){
                window.alert("ERROR: Empty ingredients field!");
            }else{
                if(tempCategory == 'non-alc-drink' || tempCategory == 'alc-drink'){
                    await axios.put(baseURL + "/" + id, {
                        name: this.selected1,
                        price: parseFloat(document.getElementById('change-price-input').value).toFixed(2),
                        category: tempCategory,
                        id: id
                    });
                }else{
                    await axios.put(baseURL + "/" + id, {
                        name: this.selected1,
                        price: parseFloat(document.getElementById('change-price-input').value).toFixed(2),
                        category: tempCategory,
                        ingredients: document.getElementById('change-ingredients-input').value,
                        id: id
                    });
                }
                window.alert(this.selected1 + " changed successfully.");
                document.getElementById('change-ingredients').style.display = 'none'
                document.getElementById('change-btn').style.display = 'none'
                document.getElementById('change-price').style.display = 'none'
                this.selected1 = 'none'
                try{
                    const res = await axios.get(baseURL);
                    this.menus = res.data;
                }
                catch(e){
                    console.error(e);
                }
            }
        },



        deleteAsk(){
            document.getElementById('ask-btn').style.display = 'none';
            document.getElementById('ask-div').style.display = 'inherit';
        },



        deleteNo(){
            this.selected2 = 'none'
            document.getElementById('ask-div').style.display = 'none';
        },



        async deleteYes(){
            try{
                const res = await axios.get(baseURL);
                this.menus = res.data;
            }
            catch(e){
                console.error(e);
            }
            for (var i = 0; i < this.menus.length; i++) {
                if(this.menus[i].name == this.selected2){
                    var id = this.menus[i].id
                    break;
                }
            }
            axios.delete(baseURL + '/' + id);
            window.alert(this.selected2 + " is deleted!");
            document.getElementById('ask-div').style.display = 'none';
            this.selected2 = 'none'
            try{
                const res = await axios.get(baseURL);
                this.menus = res.data;
            }
            catch(e){
                console.error(e);
            }
        },



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
        min-height: 100vh;
    }

    .top{
        background-color: #C7493A;
        width: 100%;
    }

    h1{
        padding-top: 20px;
        color: #212529;
        font-weight: bold;
    }

    .margin-top{
        margin-top: 3%;
    }

    h2{
        color: #C7493A;
        font-weight: bold;
        margin-bottom: 1%;
        text-decoration: underline;
    }

    h3{
        font-weight: bold;
        color: #C7493A;
    }

    select{
        background-color: #c0b5b2;
        color: #C7493A;
        font-size: 1.4rem;
        min-width: 40%;
        text-align: center;
        font-weight: bold;
    }

    input{
        width: 40%;
    }

    .inline{
        margin-bottom: 1%;
    }

    .ingredients{
        width: 90%;
    }

    .dollar{
        color: #C7493A;
        font-size: 1.5rem;
        font-weight: bold;
        display: inline;
    }

    hr{
        background-color:#C7493A;
        height: 20px;
        border-radius: 20px;
        margin-top: 3.5%;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    .sign-in-btn{
        margin-top: 2%;
    }

    #yes-btn{
        margin-right: 2%;
    }

    #no-btn{
        margin-left: 2%;
    }

    #yes:hover{
        background-color: red;
    }

    .choose{
        font-size: 2rem;
    }

    #log-out-btn{
        margin-top: 1%;
        margin-bottom: 1%;
    }

    @media screen and (max-width: 299px) {
        h3{
            font-size: 1.5rem;
        }

        .choose{
            font-size: 1.5rem;
        }

        select{
            font-size: 1rem;
        }
    }
</style>