<template>
  <AppLoader v-if="loading"/>
  <AppPage
      v-else-if="request"
      title="Заявка"
      back
  >
    <p>
      <strong>Имя владельца</strong>
      : {{request.fio}}
    </p>
    <p>
      <strong>Телефон</strong>
      : {{request.phone}}
    </p>
    <p>
      <strong>Сумма</strong>
      : {{currencyFormatter(request.amount)}}
    </p>
    <p>
      <strong>Статус</strong>
      : <AppStatus :type="request.status" />
    </p>

    <div class="form-control">
      <label for="status">Статус</label>
      <select
          id="status"
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
        class="btn danger"
        @click="remove"
    >
      Удалить
    </button>
    <button
        v-if="hasChanges"
        class="btn"
        @click="update"
    >
      Обновить
    </button>
  </AppPage>
  <h3
    v-else
    class="text-center text-white"
  >
    Заявки с ID = {{$route.params.id}} нет!
  </h3>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader";
import AppStatus from "@/components/ui/AppStatus";
import {currencyFormatter} from "@/utils/currencyFormatter";

export default {
  name: "RequestPage",
  components: { AppPage, AppLoader, AppStatus },
  setup() {

    const store = useStore();
    const loading = ref(false);
    const request = ref(null);
    const status = ref();
    const route = useRoute();
    const router = useRouter();

    onMounted(async() => {
      loading.value = true;
      request.value = await store.dispatch('request/loadById', route.params.id);
      status.value = request.value?.status;
      loading.value = false;
    });

    //хотим показывать кнопку обновить при условии если что-то изменили
    const hasChanges = computed(() => request.value.status !== status.value)

    const remove = async() => {
      await store.dispatch('request/removeById', route.params.id);
      await router.push('/');
    }

    const update = async() => {
      const data = {...request.value, status: status.value, id: route.params.id};
      await store.dispatch('request/updateById', data);
      request.value.status = status.value;
    }


    return {
      loading,
      request,
      currencyFormatter,
      remove,
      update,
      status,
      hasChanges,
    }
  },
}
</script>

<style scoped>

</style>