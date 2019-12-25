import Vue from "vue";
import Router from "vue-router";
import About from "./pages/About.vue";
import Contact from "./pages/Contact.vue";
import Home from "./pages/Home.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    }
    /**{
      path: "/item/:id",
      name: "item",
      components: {default: ItemPage, header: MainNavbar, footer: MainFooter},
      props: {header: {colorOnScroll: 450}}
    }*/
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
