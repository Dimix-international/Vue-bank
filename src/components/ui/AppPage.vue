<template>
  <div
      v-if="back"
      class="breadcrumbs"
  >
    <router-link
        class="text-white"
        to="/"
    >
      Вернутся к списку заявок
    </router-link>
  </div>
  <div class="card">
    <h1
        class="card-title"
    >
      {{title}}
      <slot name="header"/>
    </h1>

    <slot />
  </div>
</template>

<script>
export default {
  name: "AppPage",
  props: {
    title: {
      type: String,
      required: true,
    },
    back: {
      type: Boolean,
      default: false,
    }
  },
  setup(props) {
    document.title = `${props.title} | Clone of bank`
  }
}
</script>

<style scoped>

</style>