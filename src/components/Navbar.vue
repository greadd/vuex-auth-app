<template>
  <v-app-bar app color="blue darken-1" elevation="6">
    <Loader v-if="loading" />
    <v-toolbar-title class="white--text">Emphasoft</v-toolbar-title>
    <v-divider class="mx-6 white d-none d-sm-block" inset vertical></v-divider>
    <v-toolbar-title class="white--text d-none d-sm-block">{{ date }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="white" @click="logout"
      ><v-icon>mdi-logout</v-icon>Выйти</v-btn
    >
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    date: null,
    interval: null
  }),
  methods: {
    async logout() {
      this.loading = true
      await this.$store.dispatch('logout')
      this.$store.dispatch('setSnackbar', {               // сообщение после выхода
        text: 'Вы вышли из системы'
      })
      this.$router.push('/login')                         // переходим на страницу логина
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date().toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    })
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>
