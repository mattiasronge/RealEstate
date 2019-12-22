import Vue from "vue";
import Router from "vue-router";
import Presentation from "./pages/Presentation.vue"; //first page
import MainNavbar from "./layout/MainNavbar.vue";   //navigation
import MainFooter from "./layout/MainFooter.vue";   //footer
import About from "./pages/AboutUs.vue";            //about us
import ContactUs from "./pages/ContactUs.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/presentation"
    },
    {
      path: "/presentation",
      name: "presentation",
      components: {default: Presentation, header: MainNavbar, footer: MainFooter},
      props: {header: {colorOnScroll: 500}}
    },
    {
      path: "/about",
      name: "about",
      components: {default: About, header: MainNavbar, footer: MainFooter},
      props: {header: {colorOnScroll: 450}}
    },
    {
      path: "/contact",
      name: "contact",
      components: {default: ContactUs, header: MainNavbar, footer: MainFooter},
      props: {footer: {type: 'default'}}
    },

    {
      path: "/item/:id",
      name: "item",
      components: {default: ItemPage, header: MainNavbar, footer: MainFooter},
      props: {header: {colorOnScroll: 450}}
    }
  ],
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  },
});

export default router;
