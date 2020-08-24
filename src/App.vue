<template>
  <v-app app>
    <component :is="layout">
      <router-view />
    </component>
    <v-snackbar
    class="rounded-xl"
      v-model="snackbar.showing"
      :timeout="2000"
      :color="snackbar.color"
      top
      content-class="text-center"
    >
      {{ snackbar.text }}
      <v-btn absolute right x-small icon @click="snackbar.showing = false"
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </v-snackbar>
  </v-app>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['snackbar']),
    layout() {
      //получаем layout, который будет на странице
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    EmptyLayout,
    MainLayout
  }
}
</script>
