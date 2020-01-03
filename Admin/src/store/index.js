import Vue from "vue";
import Vuex from "vuex";
import 'es6-promise/auto'
import layout from './modules/layout'
import menu from './modules/menu'
import category from './modules/category'
import api from './modules/api'
import api_product from './modules/api_product'
import manual_product from './modules/manual_product'
Vue.use(Vuex);
export const store = new Vuex.Store({
    modules: {
        layout,
        menu,
        api,
        api_product,
        manual_product,
        category
    },
    strict: false
}); 