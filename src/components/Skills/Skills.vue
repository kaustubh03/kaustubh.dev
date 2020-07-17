<template>
  <div class="skills">
    <div class="controlButtons">
      <span class="closeContainer" v-on:click="controlAction(appInfo, 'close')"><v-icon name="x"></v-icon></span>
      <span class="maximizeContainer" v-on:click="controlAction(appInfo, 'minimize')"><v-icon name="minus"></v-icon></span>
    </div>
    <div class="search">
      <input v-on:input="search" type="text" placeholder="Search" />
    </div>
    <div class="content">
      <div class="skillsHolder">
        <div v-for="(skill,i) in skillArr" :key="i" class="skill">
          <img :src="iconPack[skill.icon]" alt="react" />
          <span>{{ skill.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "../../assets/logo.png";
import { skills } from "../../utility/data";
import * as icons from "../../assets/icons";

export default {
  name: 'Skills',
  props: ['controlAction', 'appInfo'],
  data: function () {
    return {
      react:logo,
      skillArr:[],
      iconPack:{...icons}
    }
  },
   mounted() {
     this.skillArr = [...skills];
   },
  computed: {
  },
  methods:{
    search:function(e){
      let value = e.target.value;
      if(!value){
        this.skillArr= [...skills];
      }
      else{
        value = value.toLowerCase();
        let skillArr = [...this.skillArr];
        skillArr = skills.filter(item=>{
          return item.id.includes(value) || item.title.toLowerCase().includes(value);
        });
        this.skillArr=[...skillArr];
      }
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import './skills.scss';
</style>
