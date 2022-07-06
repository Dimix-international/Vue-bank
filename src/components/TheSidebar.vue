<template>
  <div
      v-if="sidebar"
      class="sidebar"
  >
    <span
        class="sidebar-close"
        @click="close"
    >
      &times;
    </span>

    <div class="sidebar-content">
      <p>Добро пожаловать в нашу систему!</p>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "TheSidebar",
  setup() {
    const store = useStore();

    const sidebar = computed(() => store.state.sidebar);

    return {
      sidebar,
      close: () => store.commit('closeSidebar')
    }
  }
}
</script>

<style scoped>

</style>