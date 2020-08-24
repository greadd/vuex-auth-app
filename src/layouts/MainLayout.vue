<template>
  <v-app app>
    <Navbar/>
    <v-main class="blue lighten-5 mt-6" >
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  data: () => ({

  }),
  components: {Navbar}
}
</script>
