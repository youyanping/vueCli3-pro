import Vue from 'vue'
import HomeVue from './home.vue'
require("../../main")

Vue.config.productionTip = false

new Vue({
    render: h => h(HomeVue),
}).$mount('#app')