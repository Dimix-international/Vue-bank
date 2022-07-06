<template>
  <h4
      v-if="!requests.length"
      class="text-center"
  >
    Заявок пока нету
  </h4>
  <table
      v-else
      class="table"
  >
    <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
    <tr
        v-for="(r, ind) in requests"
        :key="r.id"
    >
      <td>{{ind + 1}}</td>
      <td>{{r.fio}}</td>
      <td>{{r.phone}}</td>
      <td>{{currencyFormatter(r.amount)}}</td>
      <td>
        <AppStatus :type="r.status" />
      </td>
      <td>
        <router-link
            v-slot="{navigate}"
            custom
            :to="{name: 'Request', params: {id: r.id}}"
        >
          <button
              class="btn"
              @click="navigate"
          >
            Открыть
          </button>
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {currencyFormatter} from "@/utils/currencyFormatter";
import AppStatus from "@/components/ui/AppStatus";

export default {
  name: "RequestTable",
  components: { AppStatus },
  props: ['requests'],
  setup() {

    return {
      currencyFormatter
    }
  }
}
</script>

<style scoped>

</style>