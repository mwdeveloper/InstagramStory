<template>
  <v-container>
    <v-layout
      wrap
    >
    <v-row>
      <v-col cols="12" lg="8" offset-lg="2">
        <v-row>
          <v-col cols="12" md="6">
            <StoryForm></StoryForm>
          </v-col>
          <v-col cols="12" md="6" align="center">
            <Stories></Stories>
          </v-col>
      </v-row>
      </v-col>
    </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import StoryForm from './StoryForm.vue'
import Stories from './Stories.vue'
export default {
  name: 'ContentView',
  data: () => ({
    
  }),
  components: {
    StoryForm,
    Stories
  }
};
</script>
