<template>
  <div id="main-div">
    <button aria-label="decrement" @click="decrement">-</button>
    <span data-cy="counter">{{ count }}</span>
    <button aria-label="increment" @click="increment">+</button>
    <br><br>
    <a href="#home" class="router-link-active">Home</a>
    <br><br>
    <button id="test-btn" @mouseover="printH3">Test Button</button>
    <br><br>
    <h3 class="showOnHover">Showed</h3>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const props = defineProps(['initial'])

  const emit = defineEmits(['change'])

  const count = ref(props.initial || 0)

  const increment = () => {
    count.value++
    emit('change', count.value)
  }

  const decrement = () => {
    count.value--
    emit('change', count.value)
  }
</script>

<style scoped>
    #main-div{
        text-align: center;
    }

    .showOnHover{
        display: none;
    }

    #test-btn{
        padding: 10px 10px 10px 10px;
        background-color: aqua;
        border-radius: 20px;
        transition: 0.7s ease
    }

    #test-btn:hover{
        padding: 10px 20px 10px 20px;
        background-color: rgb(255, 255, 0);
        letter-spacing: 1px;
        transition: 0.7s ease
    }

    #test-btn:hover .showOnHover{
        display: inline;
    }
</style>