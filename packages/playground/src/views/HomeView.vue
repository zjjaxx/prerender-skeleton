<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import {onMounted} from "vue"
import {dispatchRenderEvent} from "@prerender_skeleton/plugin/renderComplate"
onMounted(()=>{
  dispatchRenderEvent('__renderOver')
})
const toTest=()=>{

}

</script>

<template>
  <main>
    <button @click="toTest">toTest</button>
    <TheWelcome />
  
  </main>
</template>
