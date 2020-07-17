import Vue from 'vue'
import App from './App.vue'

import activity from "vue-icon";
import github from "vue-icon";
import codepen from "vue-icon";
import twitter from "vue-icon";
import cpu from "vue-icon";
import code from "vue-icon";
import book from "vue-icon";
import linkedin from "vue-icon";
import rss from "vue-icon";
import x from "vue-icon";
import minus from "vue-icon";
import info from "vue-icon";



Vue.use(activity, "v-icon");
Vue.use(github, "v-icon");
Vue.use(codepen, "v-icon");
Vue.use(twitter, "v-icon");
Vue.use(cpu, "v-icon");
Vue.use(code, "v-icon");
Vue.use(book, "v-icon");
Vue.use(linkedin, "v-icon");
Vue.use(rss, "v-icon");
Vue.use(x, "v-icon");
Vue.use(minus, "v-icon");
Vue.use(info, "v-icon");

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount("#app");
