import Vue from "vue";
import Vuex from "vuex";
import 'es6-promise/auto'
import menu from './modules/menu'
import category from './modules/category'
import api from './modules/api'
import api_product from './modules/api_product'
import manual_product from './modules/manual_product'
// I mitten av varje Vuex-applikation ligger store. "store" är i princip en behållare som håller "applikationstillståndet" 
Vue.use(Vuex);
export const store = new Vuex.Store({
    modules: {
        menu,
        api,
        api_product,
        manual_product,
        category
    },
    strict: false
}); 