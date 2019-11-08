<template>
    <div class="story" @click.prevent="panelClicked">
        <div id="indicators" v-if="storyList.length" ref="indicators">
            <div v-for="(item,index) in storyList" :key="'indicator' + index" class="indicator-item" :style="getIndicatorStyle()" :class="{'active-indicator':index<=currentIndex, 'deactive-indicator':index>currentIndex}">
            </div>
        </div>
        
        <div id="preview" v-if="storyList.length && currentItem">
            <img v-if="currentItem.type=='image'" :src="currentItem.src" />
            <video
                v-if="currentItem.type=='video'"
                ref="previewVideo"
                :src="currentItem.src"
                @ended="videoEnded()"
                autoplay="autoplay"
            />
        </div>
        
        <div id="story-details" v-if="storyList.length && currentItem"> 
            <img :src="avatarUrl" class="avatar" />
            <div>
                <h4> {{storyName}} </h4>
                <span> 8m ago </span>
            </div>
        </div>

        <div class="no-story" v-if="!storyList.length">
           <h3 class="grey--text"> No Stories Yet! </h3>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Stories',
  data: () => ({
    timer: null,
    avatarUrl : 'https://www.w3schools.com/howto/img_avatar.png'
  }),
  computed: {
      storyList: function() {
          return this.$store.state.storyList
      },
      currentIndex: function() {
          return this.$store.state.currentIndex
      },
      currentItem: function() {
          return this.storyList[this.currentIndex]
      },
      storyName: function() {
          return this.$store.state.storyName
      }
  },
  watch: {
      currentIndex: function() {
          if(this.currentItem) {
              if(this.currentItem.type=='image') {
                  this.setNextTimeOut()
              }
          }
      },
      storyList: function() {
          if(this.storyList.length == 2) {
              if(!this.timer && this.currentIndex==0 && this.currentItem.type=='image') {
                  this.setNextTimeOut()
              }
          }
      }
  },
  methods: {
      getIndicatorStyle() {
        let style = {};
        let element = document.getElementById("indicators")
        if(element) {
            let width = element.offsetWidth;
            let padding = 10 * (this.storyList.length - 1)          
            style.width = ((width - padding) / this.storyList.length) + 'px'
            return style
        }
        return style
      },
      panelClicked(evt) {
          let target = evt.target
          let pWidth = target.clientWidth;
          let pOffset = target.getBoundingClientRect().left;
          let x = evt.pageX - pOffset;
          if(pWidth/2 > x)
            this.goToPreviousPage()
          else
            this.goToNextPage()
      },
      videoEnded() {
          this.goToNextPage()
      },
      clearTimer() {
          if(this.timer) {
              clearTimeout(this.timer);
              this.timer = null
          }
      },
      setNextTimeOut() {
          var self = this
          this.timer = setTimeout(function(){ 
                self.goToNextPage()
            }, 5000);
      },
      goToPreviousPage() {
          this.clearTimer()
          if(this.currentIndex>0) {
              this.$store.commit('setCurrentIndex',this.currentIndex - 1)
          }
      },
      goToNextPage() {
          this.clearTimer()
          if(this.storyList.length) {
            if(this.currentIndex + 1 < this.storyList.length) {
                this.$store.commit('setCurrentIndex',this.currentIndex + 1)
            }else {
                this.$store.commit('setCurrentIndex', 0)
            }
          }
      }
  }
};
</script>
<style lang="scss">
    .story {
        width: 400px;
        height: 620px;
        border: 1px solid #bbb9b9;
        position:relative;
        .no-story {
            text-align:center;
            height: 100%;
            line-height: 600px;
        }
        #indicators {
            position:relative;
            margin: 10px;
            display: flex;
            z-index:1;
            .indicator-item {
                width: 100%;
                margin-right: 10px;
                height: 4px;
                cursor: pointer;
            }
            .indicator-item:last-child {
                margin-right: 0px!important;
            }
            .active-indicator {
                background: white;
            }
            .deactive-indicator {
                background: white;
                opacity: 0.3;
            }
        }
        #preview {
            position:absolute;
            left: 0px;
            top: 0px;
            width: 100%;
            height:100%;
            img,video {
                width:100%;
                height:100%;
            }
            video {
                object-fit: fill;
                pointer-events: none;
            }
        }
        #story-details {
            position:relative;
            z-index:1;    
            margin: 10px;
            color: white;
            display: flex;
            text-align: left;
            .avatar {
                vertical-align: middle;
                width: 50px;
                height: 50px;
                margin-right: 12px;
                border-radius: 50%;
            }
            h4 {
                font-size: 18px;
            }
        }
    }
</style>
