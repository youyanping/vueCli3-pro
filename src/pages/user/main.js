import Vue from 'vue'
import UserVue from './user.vue'
require("../../main")

Vue.config.productionTip = false

new Vue({
    render: h => h(UserVue),
}).$mount('#app')