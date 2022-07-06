<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>
    
    <div
        :class="['form-control', {invalid: eError}]"
    >
      <label for="email">Email</label>
       <input
           v-model="email"
           type="text"
           id="email"
           @blur="eBlur"
       >
      <small v-if="eError">{{eError}}</small>
    </div>

    <div
        :class="['form-control', {invalid: pError}]"
    >
      <label for="password">Password</label>
      <input
          v-model="password"
          type="text"
          id="password"
          @blur="pBlur"
      >
      <small v-if="pError">{{pError}}</small>
    </div>

    <button
        class="btn primary"
        type="submit"
        :disabled="isSubmitting || isTooManyAttempts"
    >
      Войти
    </button>
    <div
        v-if="isTooManyAttempts"
        class="text-danger"
    >
      Слишком много попыток! Попробуйте позже...
    </div>

  </form>
</template>

<script>
import {useLoginForm} from "@/hooks/useLoginForm";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {error} from "@/utils/error";

export default {
  name: "AuthPage",
  setup () {

    const route = useRoute();
    const store = useStore();
    const {message} = route.query || {};

    if (message) {
      console.log(message)
      store.dispatch('setMessage', {
        value: error(message),
        type: 'warning',
      })
    }

      return {
        ...useLoginForm()
      }
  }
}
</script>

<style scoped>

</style>