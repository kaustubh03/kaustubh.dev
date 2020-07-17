<template>
  <div class="professionalWorks">
    <div class="controlButtons">
      <span class="closeContainer" v-on:click="controlAction(appInfo, 'close')"><v-icon name="x"></v-icon></span>
      <span class="maximizeContainer" v-on:click="controlAction(appInfo, 'minimize')"><v-icon name="minus"></v-icon></span>
    </div>
    <div v-if="!currentProject" class="search">
      <input v-on:input="search" type="text" placeholder="Search" />
    </div>
    <div v-if="!currentProject" class="content">
      <div v-on:click="gotoProjectDetails(item.id)" v-for="(item,i) in professionalWork" :key="'professionalWork' + i" class="projectItem">
        <img :src="appInfo.id==='professionalWork' ? projects[`${item.id}_0`] : sideProjectsImages[`${item.id}_0`]" />
        <span class="title">{{item.title}}</span>
        <span class="subtitle">{{item.timeline}}</span>
      </div>
    </div>
    <div v-if="currentProject">
      <div class="projectDetails">
        <div class="imageSlider"><Carousel :images="currentProjectImages" width="60%" /></div>
        <div class="details">
          <div class="innerFlex">
            <span class="title">{{currentProject.title}}</span>
            <span class="heading2">{{currentProject.technology}}</span>
          </div>
          <span class="subtitle">{{currentProject.subtitle}}</span>
          <p class="description">{{currentProject.description}}</p>
          <div class="innerFlex">
            <span v-if="currentProject.role" class="heading2">Role : {{currentProject.role}}</span>
            <a :href="currentProject.url">Visit</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "../Carousel/Carousel.vue";
import { professionalWork, projectDetails, sideProjects, sideProjectDetails } from "../../utility/data";
import  * as projects from "../../assets/projects/index";
import  * as sideProjectsImages from "../../assets/sideProjects/index";


export default {
  name: 'ProfessionalWork',
  components: {
   Carousel
  },
  props: ['controlAction', 'appInfo','showWorkDetail'],
  data: function () {
    return {
      professionalWork:[],
      projects:projects,
      sideProjectsImages:sideProjectsImages,
      currentProject:null,
      currentProjectImages:null
    }
  },
   mounted() {
     if(this.appInfo.id === 'professionalWork'){
       this.professionalWork = [...professionalWork];
     }
     else{
       this.professionalWork = [...sideProjects];
     }
     
   },
  computed: {
  },
  methods:{
    search:function(e){
      let value = e.target.value;
      let module = this.appInfo.id === 'professionalWork' ? professionalWork:sideProjects;
      if(!value){
        this.professionalWork= [...module];
      }
      else{
        
        value = value.toLowerCase();
        let professionalWorkArr = [...this.professionalWork];
        professionalWorkArr = module.filter(item=>{
          return item.id.includes(value) || item.title.toLowerCase().includes(value);
        });
        this.professionalWork=[...professionalWorkArr];
      }
    },
    gotoProjectDetails:function(id){
      if(this.appInfo.id === 'professionalWork'){
        this.currentProject = projectDetails[id];
        let projectImages = [];
        for(var key in projects){
          if(key.includes(id)){
            projectImages.push(projects[key]);
          }
        }
        this.currentProjectImages = [...projectImages];
      }
      else{
         this.currentProject = sideProjectDetails[id];
        let projectImages = [];
        for(var key_ in sideProjectsImages){
          if(key_.includes(id)){
            projectImages.push(sideProjectsImages[key_]);
          }
        }
        this.currentProjectImages = [...projectImages];
      }

    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import './professionalWork.scss';
</style>
