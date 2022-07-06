<template>
    <component
       v-if="layout"
      :is="layout + 'Layout'"
    />
</template>

<style>

</style>

<script>
import {computed} from "vue";
import {useRoute} from 'vue-router';
import AuthLayout from "@/layout/AuthLayout";
import MainLayout from "@/layout/MainLayout";

export default {
  setup() {
    const route = useRoute();



    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: {AuthLayout, MainLayout},
}

</script>