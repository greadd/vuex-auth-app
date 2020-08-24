<template>
  <v-col cols="12" sm="8" md="4">
    <Loader v-if="loading" />
    <v-card class="elevation-12">
      <v-card-title class="justify-center">Авторизация</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Имя пользователя"
            type="text"
            required
            prepend-icon="mdi-account"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Пароль"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            required
            prepend-icon="mdi-lock"
          ></v-text-field>
          <v-card-actions>
            <v-btn
              :disabled="!valid"
              color="primary"
              class="mx-auto"
              width="150px"
              @click="login"
              >Войти</v-btn
            >
          </v-card-actions>
          <v-card-text class="text-center">
            Нет аккаунта?
            <router-link to="/register">Зарегистрироваться</router-link>
          </v-card-text>
        </v-form>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
export default {
  data: () => ({
    loading: false,
    valid: true,
    username: '',
    password: '',
    usernameRules: [
      v => !!v || 'Введите имя пользователя',
      v =>
        v.length <= 150 || 'Имя пользователя не должно превышать 150 символов'
    ],
    passwordRules: [
      v => !!v || 'Введите пароль',
      v => v.length >= 8 || 'Пароль должен быть не менее 8 символов'
    ],
    showPassword: false
  }),
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        //валидация
        try {
          this.loading = true //включаем лоадер
          await this.$store.dispatch('setToken', {
            //получаем токен
            username: this.username,
            password: this.password
          })
          await this.$store.dispatch('setUser', {
            //получаем пользователя
            username: this.username
          })
          this.$store.dispatch('setSnackbar', {
            //сообщение при удачном входе
            text: `Вы успешно авторизовались, ${this.username}`,
            color: 'success'
          })
          this.$router.push('/') // переходим в профиль
        } catch (e) {
          this.$store.dispatch('setSnackbar', {
            //сообщение в случае неудачного входа
            text: 'Ошибка! Неверный логин или пароль.',
            color: 'error'
          })
          this.loading = false // выключаем лоадер
          console.log(e)
        }
      }
    }
  }
}
</script>
