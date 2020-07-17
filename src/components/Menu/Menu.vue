<template>
  <div class="menu">
    <div :class="showInfoModal ? 'startBtn selected' : 'startBtn'" v-on:click="infoMenuAction(showInfoModal)"><v-icon name="info"></v-icon></div>
    <div class="taskBar">
        <span v-on:click="toggleVisibility(item)" v-for="(item, i) in currentlyActive" :key="i" :class="item.visible && 'selected'">{{ item.title }}</span>
    </div>
    <div class="infoTab">
        <span>{{this.currentDate}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props:['activeApps','toggleVisibility','infoMenuAction','showInfoModal'],
  data: function () {
    return {
      currentDate: new Date().toDateString(),
      currentlyActive:[]
    }
  },
  mounted() {
    // this.currentlyActive = [...this.activeApps]
  },
  watch: {
    activeApps: function () {
        this.currentlyActive = [...this.activeApps];
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import './menu.scss';
</style>
