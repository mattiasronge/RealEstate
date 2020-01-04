<template>
    <div>
      <div class="main-header-left d-none d-lg-block">
        <div class="logo-wrapper"><router-link to="/"><img src="../assets/images/endless-logo.png" alt=""></router-link></div>
      </div>
      <div class="sidebar custom-scrollbar">
        <div class="sidebar-user text-center">
          <div><img class="img-60 rounded-circle" src="../assets/images/user/1.jpg" alt="#">
            <div class="profile-edit"> <router-link to="#"><feather type="edit"></feather></router-link></div>
          </div>
          <h6 class="mt-3 f-14">Real Estate</h6>
          <p>Admin Page.</p>
        </div>
          <ul class="sidebar-menu" >
             <li v-for="(menuItem, index) in menuItems" :key="index" :class="{'active': menuItem.active}">
               <!-- Sub -->
               <a href="javascript:void(0)" class="sidebar-header" v-if="menuItem.type == 'sub'" @click="setNavActive(menuItem, index)">
                 <feather :type="menuItem.icon" class="top"></feather><span>{{menuItem.title}}<span :class="'badge badge-pill badge-'+menuItem.badgeType" v-if="menuItem.badgeType">{{menuItem.badgeValue}}</span></span>
                 <i class="fa fa-angle-right pull-right" v-if="menuItem.children"></i>
               </a>
               <!-- Link -->
               <router-link :to="menuItem.path" class="sidebar-header" v-if="menuItem.type == 'link'" router-link-exact-active>
                <feather :type="menuItem.icon" class="top"></feather><span>{{menuItem.title}}<span :class="'badge badge-'+menuItem.badgeType+' ml-3'" v-if="menuItem.badgeType">{{menuItem.badgeValue}}</span></span>
                 <i class="fa fa-angle-right pull-right" v-if="menuItem.children"></i>
               </router-link>
               <!-- External Link -->
               <a :href="menuItem.path" class="sidebar-header" v-if="menuItem.type == 'extLink'" @click="setNavActive(menuItem, index)">
                 <feather :type="menuItem.icon" class="top"></feather><span>{{menuItem.title}}<span :class="'badge badge-'+menuItem.badgeType+' ml-3'" v-if="menuItem.badgeType">{{menuItem.badgeValue}}</span></span>
                 <i class="fa fa-angle-right pull-right" v-if="menuItem.children"></i>
               </a>
               <!-- External Tab Link -->
               <a :href="menuItem.path" target="_blank" class="sidebar-header" v-if="menuItem.type == 'extTabLink'" @click="setNavActive(menuItem, index)">
                 <feather :type="menuItem.icon" class="top"></feather><span>{{menuItem.title}}<span :class="'badge badge-'+menuItem.badgeType+' ml-3'" v-if="menuItem.badgeType">{{menuItem.badgeValue}}</span></span>
                 <i class="fa fa-angle-right pull-right" v-if="menuItem.children"></i>
               </a>
                <!-- 2nd Level Menu -->
                <ul class="sidebar-submenu" v-if="menuItem.children">
                  <li v-for="(childrenItem, index) in menuItem.children" :key="index" :class="{'active': childrenItem.active}">
                    <!-- Sub -->
                    <a href="javascript:void(0)" v-if="childrenItem.type == 'sub'" @click="setNavActive(childrenItem, index)">
                       <i class="fa fa-circle"></i>{{childrenItem.title}} <span :class="'badge badge-'+childrenItem.badgeType+' pull-right'" v-if="childrenItem.badgeType">{{childrenItem.badgeValue}}</span>
                       <i class="fa fa-angle-right pull-right" v-if="childrenItem.children"></i>
                    </a>
                    <!-- Link -->
                    <router-link :to="childrenItem.path" v-if="childrenItem.type == 'link'" router-link-exact-active>
                       <i class="fa fa-circle"></i>{{childrenItem.title}} <span :class="'badge badge-'+childrenItem.badgeType+' pull-right'" v-if="childrenItem.badgeType">{{childrenItem.badgeValue}}</span>
                       <i class="fa fa-angle-right pull-right" v-if="childrenItem.children"></i>
                    </router-link>
                    <!-- External Link -->
                    <a :href="childrenItem.path" v-if="childrenItem.type == 'extLink'">
                       <i class="fa fa-circle"></i>{{childrenItem.title}} <span :class="'badge badge-'+childrenItem.badgeType+' pull-right'" v-if="childrenItem.badgeType">{{childrenItem.badgeValue}}</span>
                       <i class="fa fa-angle-right pull-right" v-if="childrenItem.children"></i>
                    </a>
                     <!-- External Tab Link -->
                    <a :href="childrenItem.path" target="_blank" v-if="childrenItem.type == 'extTabLink'">
                       <i class="fa fa-circle"></i>{{childrenItem.title}} <span :class="'badge badge-'+childrenItem.badgeType+' pull-right'" v-if="childrenItem.badgeType">{{childrenItem.badgeValue}}</span>
                       <i class="fa fa-angle-right pull-right" v-if="childrenItem.children"></i>
                    </a>
                     <!-- 3rd Level Menu -->
                      <ul class="sidebar-submenu" v-if="childrenItem.children">
                        <li v-for="(childrenSubItem, index) in childrenItem.children" :key="index">
                          <!-- Link -->
                          <router-link :to="childrenSubItem.path" v-if="childrenSubItem.type == 'link'" router-link-exact-active>
                             <i class="fa fa-circle"></i>{{childrenSubItem.title}} <span :class="'badge badge-'+childrenSubItem.badgeType+' pull-right'" v-if="childrenSubItem.badgeType">{{childrenSubItem.badgeValue}}</span>
                             <i class="fa fa-angle-right pull-right" v-if="childrenSubItem.children"></i>
                          </router-link>
                           <!-- External Link -->
                          <a :href="childrenSubItem.path" v-if="childrenSubItem.type == 'extLink'">
                             <i class="fa fa-circle"></i>{{childrenSubItem.title}} <span :class="'badge badge-'+childrenSubItem.badgeType+' pull-right'" v-if="childrenSubItem.badgeType">{{childrenSubItem.badgeValue}}</span>
                             <i class="fa fa-angle-right pull-right" v-if="childrenSubItem.children"></i>
                          </a>
                           <!-- External Tab Link -->
                          <a :href="childrenSubItem.path" target="_blank" v-if="childrenSubItem.type == 'extTabLink'">
                             <i class="fa fa-circle"></i>{{childrenSubItem.title}} <span :class="'badge badge-'+childrenSubItem.badgeType+' pull-right'" v-if="childrenSubItem.badgeType">{{childrenSubItem.badgeValue}}</span>
                             <i class="fa fa-angle-right pull-right" v-if="childrenSubItem.children"></i>
                          </a>
                       </li>
                     </ul>
                  </li>
                </ul>
            </li>
          </ul>
      </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: 'Sidebar',
    data(){
      return{
        width: 0,
        height: 0
      }
    },
  computed: {
    ...mapState({
      menuItems: state => state.menu.data
    })
  },
  mounted () {
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
  methods: {
    setNavActive(item) {
      this.$store.dispatch('menu/setNavActive', item)
    }
  }
}
</script>
