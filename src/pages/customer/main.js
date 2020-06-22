import Vue from 'vue'
import CustomerVue from './customer.vue'
require("../../main")

Vue.config.productionTip = false

new Vue({
    render: h => h(CustomerVue),
}).$mount('#app')