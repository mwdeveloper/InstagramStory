import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentIndex: -1,
    storyName: "Codesm",
    storyList: [

    ]
  },
  mutations: {
    setStoryName(state,name) {
      state.storyName = name
    },
    addStory(state,data) {
      if(!state.storyList.length) {
        state.currentIndex = 0
      }
      state.storyList.push(data)
    },
    deleteStory(state,index) {
      state.storyList.splice(index,1)
      if(state.storyList.length >0) {
        state.currentIndex = 0
      }else {
        state.currentIndex = -1
      }
    },
    setCurrentIndex(state,index) {
      state.currentIndex = index
    }
  },
  actions: {
  },
  modules: {
  }
})
