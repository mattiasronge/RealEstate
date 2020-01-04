<template>
  <div>
    <!-- page-wrapper Start-->
    <div class="page-wrapper" id="canvas-bookmark" >
      <!-- Page Header Start-->
      <div class="page-main-header" :class="{ open:toggle_sidebar_var }">
        <div class="main-header-right row">
          <div class="main-header-left d-lg-none">
            <div class="logo-wrapper"><router-link :to="{ name: 'default'}" ><img src="../assets/images/endless-logo.png" alt=""></router-link></div>
          </div>
          <div class="mobile-sidebar">
            <div class="media-body text-right switch-sm">
              <label class="switch" v-on:click="toggle_sidebar"><feather type="align-left"></feather></label>
            </div>
          </div>
          <div class="nav-right col">
            <ul class="nav-menus" :class="{ open: mobile_toggle }">
              <li>
                <form class="form-inline search-form" >
                  <div class="form-group">
                    <input :class="{ open: mobile_search }" class="form-control-plaintext"  v-on:keyup="searchTerm" v-model="terms" type="text" placeholder="Search..">
                    <div :class="searchResult ? 'Typeahead-menu is-open' : 'Typeahead-menu'" v-if="menuItems.length">
                      <div class="ProfileCard u-cf" v-for="(menuItem,index) in menuItems.slice(0, 8)" :key="index">
                       <div class="ProfileCard-avatar header-search">
                         <feather :type="menuItem.icon"></feather>
                       </div>
                       <div class="ProfileCard-details">
                        <div class="ProfileCard-realName">
                         <span @click='removeFix()'><router-link :to="{path:menuItem.path}" class="realname">{{menuItem.title}}</router-link></span>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div :class="searchResultEmpty ? 'Typeahead-menu is-open' : 'Typeahead-menu'" >
                  <div class="tt-dataset tt-dataset-0">
                    <div class="EmptyMessage">
                      Your search turned up 0 results. Opps There are no result found.
                    </div>
                  </div>
                </div>
                <span class="d-sm-none" v-on:click="mobile_search = !mobile_search">
                  <feather type="search"></feather>
                </span>
              </div>
            </form>
          </li>
          <li><a class="text-dark" v-on:click="toggle_fullscreen()"><feather type="maximize"></feather></a></li>
          <li class="onhover-dropdown"><a class="txt-dark" href="#">
            <h6>EN</h6></a>

          </li>
          <li class="onhover-dropdown"><feather type="bell"></feather><span class="dot"></span>

          </li>
          <li><a href="#" v-on:click="toggle_rightsidebar"><feather type="message-circle"></feather><span class="dot"></span></a></li>
          <li class="onhover-dropdown">
            <div class="media align-items-center"><img class="align-self-center pull-right img-50 rounded-circle" src="../assets/images/dashboard/user.png" alt="header-user">
              <div class="dotted-animation"><span class="animate-circle"></span><span class="main-circle"></span></div>
            </div>
          </li>
        </ul>
        <div class="d-lg-none mobile-toggle pull-right" v-on:click="mobile_toggle = !mobile_toggle"><feather type="more-horizontal"></feather></div>
      </div>
    </div>
  </div>
  <!-- Page Header Ends -->
</div>
</div>
</template>
<script>
var body = document.getElementsByTagName("body")[0];
import { mapState } from "vuex";
export default {
  name: 'Search',
  data() {
    return {
      terms: '',
      searchResult: false,
      searchResultEmpty: false,
      toggle_sidebar_var:false,
      clicked:false,
      toggle_rightsidebar_var:false,
      rightclicked:false,
      mobile_toggle:false,
      mobile_search: false,
    }
  },
  computed: {
    ...mapState({
      menuItems: state => state.menu.searchData
    })
  },
  methods: {
    searchTerm: function() {
      this.$store.dispatch('menu/searchTerm', this.terms)
    },
    logout: function() {
           
    },
    addFix() {
      body.classList.add("offcanvas")
      this.searchResult = true;
    },
    removeFix() {
      body.classList.remove("offcanvas")
      this.searchResult = false;
      this.terms = ''
    },
    toggle_sidebar(){
      this.toggle_sidebar_var = !this.toggle_sidebar_var,
      this.clicked = !this.toggle_sidebar_var,
      this.$emit('clicked',this.clicked)
    },
    toggle_rightsidebar(){
      this.toggle_rightsidebar_var = !this.toggle_rightsidebar_var,
      this.rightclicked = !this.toggle_rightsidebar_var,
      this.$emit('rightclicked',this.rightclicked)
    },
    toggle_fullscreen() {
      if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    }
  },
  watch: {
    menuItems: function () {    
      this.terms ? this.addFix() : this.removeFix();
      if(!this.menuItems.length)
        this.searchResultEmpty = true;
      else
        this.searchResultEmpty = false;
    }
  }
}
</script>
