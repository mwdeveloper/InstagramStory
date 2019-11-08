<template>
    <v-form>
        <v-row>
            <v-col cols="12" md="8" lg="6">
                <v-text-field
                    label="Page Name:"
                    v-model="storyName"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn
                    color="success"
                    @click="changeStoryName"
                >Edit Story</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="8" lg="6">
                <v-btn
                    color="success"
                    @click="openAddResource()"
                >Add Image or Video</v-btn>
                <input
                    id="addResource"
                    ref="addResource"
                    type="file"
                    accept="image/*,video/mp4,video/x-m4v,video/*"
                    style="display:none"
                    @change="onFileChange"
                >
            </v-col>
        </v-row>
        <v-row v-for="(item,index) in storyList" :key="index">
            <v-col>
                <v-icon @click="deleteStory(index)">mdi-delete</v-icon>&nbsp;&nbsp; {{item.name}}
            </v-col>
        </v-row>
    </v-form>
</template>

<script>

export default {
  name: 'StoryForm',
  data: () => ({
    storyName: ''
  }),
  computed: {
      storyList: function() {
          return this.$store.state.storyList
      }
  },
  mounted() {
      this.storyName = this.$store.state.storyName;
  },
  methods: {
      openAddResource() {
        let file = this.$refs.addResource
        if (file) {
            file.click()
        }
      },
      changeStoryName() {
          this.$store.commit('setStoryName',this.storyName)
      },
      deleteStory(index) {
          this.$store.commit('deleteStory',index)
      },
      onFileChange(evt) {
          let self = this
          let file = evt.target.files[0]
          let data = {}
          console.log(file)
          if(file.type.includes('image')) {
            data.type = 'image'
            data.name = file.name
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = readerEvent => {
                data.src = readerEvent.target.result
                self.$store.commit('addStory',data)
            }
          }else {
            data.type = 'video'
            data.name = file.name
            data.src =  URL.createObjectURL(file)
            this.$store.commit('addStory',data)
          }
      }
  }
};
</script>
