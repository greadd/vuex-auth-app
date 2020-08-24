<template>
  <v-col cols="12" sm="8" md="4">
    <Loader v-if="loading" />
    <v-card class="elevation-4 rounded-lg">
      <v-card-title class="justify-center">Регистрация</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="registrationData.username"
            :rules="usernameRules"
            label="Имя пользователя*"
            type="text"
            required
            prepend-icon="mdi-account"
          ></v-text-field>
          <v-text-field
            v-model="registrationData.first_name"
            :rules="firstnameRules"
            label="Имя"
            type="text"
            prepend-icon="mdi-text-account"
          ></v-text-field>
          <v-text-field
            v-model="registrationData.last_name"
            :rules="lastnameRules"
            label="Фамилия"
            type="text"
            prepend-icon="mdi-text-account"
          ></v-text-field>
          <v-text-field
            v-model="registrationData.password"
            :rules="passwordRules"
            label="Пароль*"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            required
            prepend-icon="mdi-lock"
          ></v-text-field>
          <v-card-actions class="mb-2">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mx-auto rounded-lg"
              width="220px"
              @click="register"
              >Зарегистрироваться</v-btn
            >
          </v-card-actions>

        </v-form>
      </v-card-text>
    </v-card>
    <v-card class="mt-4 elevation-4 mx-auto rounded-lg" max-width="300">
      <v-card-text class="text-center ">
        Есть аккаунт?
        <v-btn text to="/login" small class="rounded-lg">Войти</v-btn>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    valid: true,
    registrationData: {
      username: '',
      first_name: '',
      last_name: '',
      password: '',
      is_active: true
    },
    last_login: new Date(),
    usernameRules: [
      v => !!v || 'Введите имя пользователя',
      v =>
        v.length <= 150 || 'Имя пользователя не должно превышать 150 символов',
      v =>
        /^[\w.@+-]+$/.test(v) || 'Разрешены латинские буквы, цифры и @ . + - _'
    ],
    firstnameRules: [
      v => v.length <= 30 || 'Имя не должно превышать 30 символов'
    ],
    lastnameRules: [
      v => v.length <= 150 || 'Фамилия не должна превышать 150 символов'
    ],
    passwordRules: [
      v => !!v || 'Введите пароль',
      v => v.length >= 8 || 'Пароль должен быть не менее 8 символов ',
      v =>
        /^(?=.*[A-Z])(?=.*\d)/.test(v) ||
        'Как минимум одна заглавная буква и одна цифра',
      v => v.length <= 128 || 'Пароль должен быть не более 128 символов '
    ],
    showPassword: false
  }),

  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        // валидация
        try {
          this.loading = true // включаем лоадер
          await this.$store.dispatch('register', { ...this.registrationData }) // отправляем данные для регистрации
          await this.$store.dispatch('setToken', {
            // получаем токен
            username: this.registrationData.username,
            password: this.registrationData.password
          })
          this.$store.dispatch('setSnackbar', {
            // сообщение в случае успешной регистрации
            text: 'Вы успешно зарегистрировались.',
            color: 'success'
          })
          this.$router.push('/') // переходим на страницу профиля
        } catch (e) {
          console.log(e)
          this.$store.dispatch('setSnackbar', {
            // сообщение в случае неудачной регистрации
            text: 'Ошибка! Имя пользователя уже занято.',
            color: 'error'
          })
          this.loading = false
        }
      }
    }
  }
}
</script>
