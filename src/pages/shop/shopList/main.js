import Vue from 'vue'
import ShopList from './shopList.vue'
require("../../../main")

Vue.config.productionTip = false

new Vue({
    render: h => h(ShopList),
}).$mount('#app')