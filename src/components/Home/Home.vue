<template>
  <div class="home">
    <div class="container">
      <Menu :infoMenuAction="infoMenuAction" :showInfoModal="showInfoModal" :activeApps="activeApps" :toggleVisibility="toggleVisibility"/>
      <DesktopArea :removeFromActiveMenu="removeFromActiveMenu" :toggledApp="toggledApp" :activeMenu="currentActiveMenu" :desktopItems="desktopItems" />
      <div class="galaxy">
          <div class="stars">
          </div>
          <div class="authorInfo">
            <img :src="profile" />
            <span class='siteTitle'>kaustubh.dev</span>
            <span class="quote">"Best thing about being a Failure, you get to know beyond mediocrity."</span>
          </div>
      </div>
      <div v-if="showInfoModal" class="infoModal">
        <div class="container">
          <div class="github-corners">
            <a href="https://github.com/kaustubh03/kaustubh.dev">
              <img src="https://diamond.kaustubh.dev/images//github-corner-right.svg" /> 
            </a>
          </div>
          <div class="frame">
            <span>Built By -</span>
            <span>Kaustubh Saxena</span>
          </div>
          <div class="frame">
            <span>Built With -</span>
            <span>Vue, SASS/SCSS, Javascript, HTML</span>
          </div>
          <div class="frame">
            <span>What's Next - </span>
            <span>Music, Realtime Notepad</span>
          </div>
          <div class="exit" v-on:click="infoMenuAction">Exit</div>
        </div>
      </div>
      </div>
      <div id="mobileInfo">
          <div class="galaxy">
            <div class="stars">
            </div>
            <div class="authorInfo">
              <span class='siteTitle'>Hey there! I'm still working on mobile device version concept. 
                <br />
                Till then please checkout desktop version.</span>
              </div>
        </div>
      </div>
  </div>
</template>

<script>
import Menu from '../Menu/Menu.vue';
import DesktopArea from '../DesktopArea/DesktopArea.vue';
import { desktopItems } from '../../utility/data';
import { findInArray } from '../../utility/helper';
import profile from '../../assets/profile.png';
export default {
  name: 'Home',
  data:()=>{
    return {
      desktopItems:desktopItems,
      activeApps:[],
      toggledApp:null,
      profile:profile,
      showInfoModal:false
    }
  },
  components: {
    Menu,
    DesktopArea
  },
  methods:{
    currentActiveMenu : function(currentActive){
      let activeApps = [...this.activeApps];
      
      if(!findInArray(activeApps, 'id', currentActive.id)){
        activeApps.push(currentActive);
        this.activeApps = [...activeApps];
      }
    },
    removeFromActiveMenu:function(app){
        let activeApps_ = this.activeApps.filter(item=>{
          return item.id !== app.id;
        });
        this.activeApps = [...activeApps_];
    },
    toggleVisibility:function (app) {
      let app_ = {...app, key:Math.random(0,6)};
      this.toggledApp = app_;
    },
    infoMenuAction:function(infoMenuAction){
      this.showInfoModal = !infoMenuAction;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import './home.scss';
</style>
