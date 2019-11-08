<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h1>Instagram Story</h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <ContentView/>
    </v-content>
  </v-app>
</template>

<script>
import ContentView from './components/ContentView';

export default {
  name: 'App',

  components: {
    ContentView
  },

  data: () => ({
    //
  }),
};
</script>
