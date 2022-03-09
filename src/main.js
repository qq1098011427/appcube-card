import Vue from 'vue'
import 'tcon'

// import Card from './dzt/native.vue' // dzt
// import Card from './dzt/online.vue' // dzt
// import Card from './dzt-sort-popup/online.vue' // dzt

// import Card from './sz-rq-00000004/sz.vue' // 深圳线上
// import Card from './sz-rq-00000004/rc.vue' // 睿呈线上

// import Card from './sort-popup/sz.vue' // 深圳线上弹窗
// import Card from './sort-popup/rc.vue' // 睿呈线上弹窗

import Card from './amap-container' // 高德地圖

Vue.config.productionTip = false

new Vue({
  render: h => h(Card),
}).$mount('#app')
