<template>
  <div>
    <div class="page-wrapper" >
      <Header @clicked="sidebar_toggle" @rightclicked="rightsidebar_toggle" @mobileclicked="mobiletoggle_toggle" />
      <div class="page-body-wrapper">
        <div class="page-sidebar" :class="[{ open : sidebar_toggle_var }]" >
          <Sidebar />
        </div>
      
        <div class="page-body">
          <transition name="fadeIn" enter-active-class="animated fadeIn">
           <router-view class="view"></router-view>
          </transition>
        </div>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from './header'
import Sidebar from './sidebar'

export default {
  name: 'mainpage',
  data(){
    return{
      rightsidebar_toggle_var:false,
      mobileheader_toggle_var: false,
      sidebar_toggle_var: false,
      resized:false
    }
  },
  components:{  // Kombinerar header och vänstra side-bar 
    Header,
    Sidebar,
  },
  computed: {
    ...mapState({
      menuItems: state => state.menu.data,
    })
  },
  created(){
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
    this.resized = this.sidebar_toggle_var;
  },
  watch:{
    '$route' (){
      this.menuItems.filter(items => {
        if (items.path === this.$route.path)
          this.$store.dispatch('menu/setActiveRoute', items)
        if (!items.children) return false
        items.children.filter(subItems => {
          if (subItems.path === this.$route.path)
            this.$store.dispatch('menu/setActiveRoute', subItems)
          if (!subItems.children) return false
          subItems.children.filter(subSubItems => {
            if (subSubItems.path === this.$route.path)
              this.$store.dispatch('menu/setActiveRoute', subSubItems)
          })
        })
      })
    },
    sidebar_toggle_var: function (){
      this.resized = (this.width <= 991) ? !this.sidebar_toggle_var : this.sidebar_toggle_var      
    }
  },
  methods:{
    sidebar_toggle(value) {
      this.sidebar_toggle_var = !value
    },
    rightsidebar_toggle(value) {
      this.rightsidebar_toggle_var = value
    },
    mobiletoggle_toggle(value) {
      this.mobileheader_toggle_var = value
    },
    handleResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }
  }
}
</script>

<style lang="scss" scoped>


</style>
