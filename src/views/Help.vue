<template>
  <AppPage
      back
      title="Помощь"
  >
    <QuestionItem
        v-for="q in questions"
        :key="q.title"
        :question="q"
    />
  </AppPage>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import QuestionItem from "@/components/question/QuestionItem";

export default {
  name: 'AboutPage',
  components: {AppPage, QuestionItem},
  setup() {
    const questions = [
      {title: 'Что есть в системе?', text: 'Тут есть все о ваших заявках'},
      {title: 'Как работает авторизация?', text: 'Используется Firebase, необходима почта и пароль'},
    ];

    return {
      questions
    }
  },
}
</script>
