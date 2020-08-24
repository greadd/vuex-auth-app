<template>
  <v-card class="elevation-4 mx-auto text-center text-sm-end rounded-lg" max-width="750">
    <v-card-title class="justify-center text-body-1 text-sm-h5"> Профиль</v-card-title>
    <v-divider></v-divider>
    <v-list v-if="user" class="mx-6 mt-6">
      <v-list-item-group class="text-start">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider class="mt-6"></v-divider>

      <v-btn to="/edit" class="ma-6 rounded-lg" color="success">
        <v-icon left>mdi-pencil</v-icon>Редактировать
      </v-btn>
    </v-list>
  </v-card>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  data: () => ({
    items: [
      {
        icon: 'mdi-account',
        title: '',
        subtitle: 'Имя пользователя'
      },
      {
        icon: 'mdi-text-account',
        title: '',
        subtitle: 'Имя'
      },
      {
        icon: 'mdi-text-account',
        title: '',
        subtitle: 'Фамилия'
      }
    ]
  }),
  mounted() {
    this.items[0].title = this.$store.getters.user.username
    this.items[1].title = this.$store.getters.user.first_name
    this.items[2].title = this.$store.getters.user.last_name
  }
}
</script>

<style></style>
