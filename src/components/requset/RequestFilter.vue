<template>
  <div class="filter">
    <div class="form-control">
      <input
          type="text"
          placeholder="Начните писать имя"
          v-model="name"
      >
    </div>
    <div class="form-control">
      <select
          v-model="status"
      >
        <option
            disabled
            selected
        >
          Выберите статус
        </option>
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>
    <button
      v-if="isActive"
      class="btn warning"
      @click="reset"
    >
      Clear
    </button>
  </div>
</template>

<script>
import {computed, ref, watch} from "vue";

export default {
  name: "RequestFilter",
  emits: ['update:modelValue'],
  props: ['modalValue'],
  setup(_, {emit}) {
    //второй параметр - context с которого берем emit
    const name = ref();
    const status = ref();

    //при любом изменение name, status фильтруем таблицу

    watch([name, status], values => {
      emit('update:modelValue', {
        name: values[0],
        status: values[1],
      })
    })

    //возможность сбросить фильтры
    const isActive = computed(() => name.value || status.value)

    return {
      name,
      status,
      isActive,
      reset: () => {
        name.value = '';
        status.value = null;
      }
    }
  },
}
</script>

<style scoped>

</style>