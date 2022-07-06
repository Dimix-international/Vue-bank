<template>
  <AppLoader v-if="loading"/>
  <AppPage
      v-else
      title="Список заявок"
  >
    <template #header>
      <button
          class="btn primary"
          @click="modal = true"
      >
        Create
      </button>
    </template>

    <RequestFilter
        v-model="filter"
    />
    <RequestTable
        :requests="requests"
    />

    <teleport to="body">
      <AppModal
          v-if="modal"
          title="Создать заявку"
          @close="modal = false"
      >
        <RequestModal @created="modal = false"/>
      </AppModal>
    </teleport>

  </AppPage>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import RequestTable from "@/components/requset/RequestTable";
import AppModal from "@/components/ui/AppModal";
import RequestModal from "@/components/requset/RequestModal";
import RequestFilter from "@/components/requset/RequestFilter";
import {ref, computed, onMounted} from "vue";
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader";

export default {
  name: 'HomePage',
  components: {AppPage, RequestTable, AppModal, RequestModal,
    AppLoader, RequestFilter},
  setup () {
    const modal = ref(false);
    const store = useStore();
    const loading = ref(false);
    const filter = ref({});



    onMounted(async () => {
      loading.value = true;
      await store.dispatch('request/load');
      loading.value = false;
    })

    const requests = computed(() =>
        store.getters['request/requests']
        .filter(request => {
          if (filter.value.name) {
            return request.fio.includes(filter.value.name)
          }
          return request;
        })
        .filter(request => {
              if (filter.value.status) {
                return request.status === filter.value.status;
              }
              return request;
         })
    );

    return {
      modal,
      requests,
      loading,
      filter,
    }
  }
}
</script>
