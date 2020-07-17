<template>
  <div class="desktopArea" id="desktopArea_id">
    <div class="overlay" v-on:click="deselect" />
    <div class="container">
      <div v-for="(item,i) in desktopItemsArr"  
        :key="i" 
        v-on:click="selectedClass(item)" 
        class="desktopItems"
        :class="selectedItem === item.id && 'selected'"
        draggable>
         <v-icon :name="item.icon"></v-icon>
        <span>
          {{item.title}}
        </span>
      </div>
    </div>
    <div v-if="activeApps.length>0">
      <div v-for="(item,i) in activeApps" :key="'activeapps_' + i">
        <Skills :appInfo="item" :controlAction="controlAction" v-if="item.id==='skills' && item.visible"/>
        <ProfessionalWork :appInfo="item" :controlAction="controlAction" v-if="item.id==='professionalWork' && item.visible"/>
        <ProfessionalWork :appInfo="item" :controlAction="controlAction" v-if="item.id==='sideProjects' && item.visible"/>
      </div>
    </div>
    <div class="timeline">
      <timeline>
        <timeline-title font-color="#fff"><span class="title">Work Experience</span></timeline-title>
        <timeline-item font-color="#fff" bg-color="#fff"><img
              src="https://cdn.iconscout.com/icon/free/png-256/paytm-226448.png"
              class="icon-heart"
              slot="others"
          />
          <div class="workEx">
            <span>Paytm</span>
            <span>June 2020 - Present</span>  
          </div>
        </timeline-item>
        <timeline-item font-color="#fff" bg-color="#fff"><img
              src="https://miro.medium.com/max/3150/1*4OYDg_KKndY__ks97MvLHw.png"
              class="icon-heart"
              slot="others"
          />
          <div class="workEx">
            <span>Lambdatest</span>
            <span>September 2018 - May 2019</span>
          </div>
        </timeline-item>
        <timeline-item font-color="#fff" :hollow="true">

          <img
              src="https://media.glassdoor.com/sqll/2866689/etelligens-technologies-squarelogo-1582700164298.png"
              class="icon-heart"
              slot="others"
          />
          <div class="workEx">
            <span>Etelligens Technologies</span>
            <span>June 2017 - September 2018</span>
          </div>
        </timeline-item>
        
          
      </timeline>
    </div>
  </div>
</template>

<script>
import logo from "../../assets/logo.png";
import Skills from "../Skills/Skills.vue"; 
import ProfessionalWork from "../ProfessionalWork/ProfessionalWork.vue"; 
import { findInArray } from '../../utility/helper';
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

export default {
  name: 'DesktopArea',
  props: ['desktopItems', 'activeMenu', 'toggledApp', 'removeFromActiveMenu'],
  components: {
      Skills,
      ProfessionalWork,
      Timeline,
      TimelineItem,
      TimelineTitle
  },
  data: function () {
    return {
      currentDate: new Date().toDateString(),
      lambdatestAutomation:logo,
      desktopItemsArr:[],
      selectedItem:null,
      activeApps:[],
    }
  },
  
   mounted() {
     this.desktopItemsArr = [...this.desktopItems];
  },
  computed: {
  },
  methods:{
    selectedClass:function(selected){
      if(selected.id === this.selectedItem){
        /*
          Check if App is already Started
        */
        let findActiveAppsinBatch = findInArray(this.activeApps, 'id', selected.id);
        if(!findActiveAppsinBatch){
          /*
            Add App to already added batch
          */
          if(selected.link){
            window.open(selected.link, '_blank');
          }
          else{
            let selected_ = {...selected};
            selected_['visible'] = true;
            let activeApps =[...this.activeApps];
            activeApps.push(selected_);
            this.activeApps = [...activeApps];
            this.activeMenu(selected_);
            this.selectedItem=null;
          }
          
        }
        else{
          /*
            Maximize the already Started App
          */
          this.maximize(findActiveAppsinBatch);
        }
      }
      else{
        this.selectedItem = selected.id;
      }
    },
    minimize:function(selectedApp){
      const activeApps_ = this.activeApps.map((item)=>{
        if(item.id === selectedApp.id){
          item.visible = false;
        }
        return item;
      });
      this.activeApps = [...activeApps_];

      
    },
    maximize:function(selectedApp){
      const activeApps_ = this.activeApps.map((item)=>{
        if(item.id === selectedApp.id){
          item.visible = true;
        }
        else{
          item.visible = false;
        }
        return item;
      });
      this.activeApps = [...activeApps_];

    },
    controlAction:function(app, type){
      switch(type){
        case "close":
          this.close(app);
          break;
        case "minimize":
          this.minimize(app);
          break
        default:
          break;
      }
    },
    close:function(app){
      const activeApps_ = this.activeApps.filter((item)=>{
        return item.id !== app.id;
      });
      this.activeApps = activeApps_;
      /*
        Remove Task From Task Bar
      */
      this.removeFromActiveMenu(app)
    },
    deselect:function(){
      if(this.selectedItem){
        this.selectedItem = null;
      } 
    },
  },
  watch: {
    toggledApp: function (val) {
      if(val.visible){
        this.minimize(val)
      }
      else{
        this.maximize(val)
      }
       
    },
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import './desktopArea.scss';
</style>
