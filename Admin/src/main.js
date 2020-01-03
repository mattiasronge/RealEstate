import Vue from 'vue'
import App from './App.vue'
import Breadcrumbs from './components/bread_crumbs'
import BootstrapVue from 'bootstrap-vue'
import VueFeather from 'vue-feather';
import router from './router'
import {store} from './store';
import VueLazyload from 'vue-lazyload';
import Toasted from 'vue-toasted';
import SmartTable from 'vuejs-smart-table'

Vue.use(BootstrapVue)
Vue.use(VueFeather)
Vue.use(SmartTable)
Vue.component('Breadcrumbs', Breadcrumbs)
Vue.use(VueLazyload, {
    observer: true,
    // optional
    observerOptions: {
        rootMargin: '0px',
        threshold: 0.1
    }
});
Vue.use(Toasted,{
    iconPack: 'fontawesome'
});
// Import Theme scss
import './assets/scss/app.scss'

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')