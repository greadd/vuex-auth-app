<template>
  <v-col>
    <Loader v-if="loading" />
    <v-card class="elevation-4 rounded-lg mx-auto" max-width="750">
      <v-card-title class="justify-center text-body-1 text-sm-h5"
        >Редактирование профиля</v-card-title
      >
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation class="ma-6">
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Имя пользователя*"
            type="text"
            required
            prepend-icon="mdi-account"
          ></v-text-field>
          <v-text-field
            v-model="first_name"
            :rules="firstnameRules"
            label="Имя"
            type="text"
            prepend-icon="mdi-text-account"
          ></v-text-field>
          <v-text-field
            v-model="last_name"
            :rules="lastnameRules"
            label="Фамилия"
            type="text"
            prepend-icon="mdi-text-account"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Пароль*"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            required
            prepend-icon="mdi-lock"
          ></v-text-field>
          <v-card-actions class="flex-column flex-sm-row ">
            <v-btn
              @click="updateInfo"
              :disabled="!valid"
              color="green darken-4 white--text"
              class="ma-2 rounded-lg"
              width="220"
            >
              <v-icon left>mdi-content-save</v-icon>Сохранить
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              to="/"
              color="red darken-4 white--text"
              class="ma-2 rounded-lg"
              width="220"
            >
              <v-icon left>mdi-arrow-left</v-icon>Назад
            </v-btn>
          </v-card-actions>
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
    first_name: '',
    last_name: '',
    password: '',
    is_active: true,
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
  mounted() {
    this.username = this.$store.getters.user.username
    this.first_name = this.$store.getters.user.first_name
    this.last_name = this.$store.getters.user.last_name
  },
  methods: {
    async updateInfo() {
      if (this.$refs.form.validate()) {
        // валидация
        try {
          const data = {
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
            password: this.password,
            is_active: true
          }
          this.loading = true // включаем лоадер
          await this.$store.dispatch('updateInfo', data) // отправляем данные для изменения
          this.$store.dispatch('setSnackbar', {
            // сообщение после сохранения изменений
            text: 'Даннные изменены.',
            color: 'success'
          })
          this.loading = false // выключаем лоадер
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
}
</script>
