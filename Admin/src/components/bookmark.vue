<template>
  <div class="bookmark pull-right">
    <ul>
      <draggable v-model="bookmarkItems" group="bookmark" @start="drag=true" @end="drag=false">
          <li v-for="(items,index) in bookmarkItems.slice(0, 8)" :key="index">
            <router-link :to="{path:items.path}">
              <feather v-b-tooltip.hover :title="items.title" :type="items.icon"></feather>
            </router-link>
          </li>
      </draggable>
      <li>
        <a href="javascript:void(0)" @click='openboomarkSearchBox()'><feather  class="bookmark-search star-yellow" type="star"></feather></a>
        <form class="form-inline search-form">
          <div class="form-group form-control-search" :class="boomarkSearchBox ? 'open' : 'close'">
            <input type="text" placeholder="Search.." v-on:keyup="searchTerm" v-model="terms">
            <div class="bookmark-search" :class="boomarkSearchResult ? 'Typeahead-menu is-open' : 'Typeahead-menu'" v-if="searchMenuItems.length">
              <div class="ProfileCard u-cf" v-for="(menuItem,index) in searchMenuItems.slice(0, 8)" :key="index">
               <div class="ProfileCard-avatar header-search">
                 <feather :type="menuItem.icon"></feather>
               </div>
               <div class="ProfileCard-details">
                <div class="ProfileCard-realName">
                  <span @click='removeFix()'><router-link :to="{path:menuItem.path}" class="realname" >{{menuItem.title}}</router-link> </span> <a href="JavaScript:void(0);" @click="addToBookmark(menuItem)"><span :class="menuItem.bookmark ? 'text-warning' : ''"><i class="fa fa-star-o f-18 bookmark-search f-right"></i></span></a>
                </div>
              </div>
            </div>
          </div>
          <div :class="boomarkSearchResultEmpty ? 'Typeahead-menu is-open' : 'Typeahead-menu'" >
            <div class="tt-dataset tt-dataset-0">
              <div class="EmptyMessage">
                Opps There are no result found.
              </div>
            </div>
          </div>
        </div>
      </form>
    </li>
  </ul>
</div>
</template>
<script>
import { mapState } from 'vuex';
import draggable from 'vuedraggable'

export default {
  data() {
    return {
      terms: '',
      boomarkSearchBox: false,
      boomarkSearchResult: false,
      boomarkSearchResultEmpty: false,
      bookmarkItems: []
    }
  },
  components: {
    draggable
  },
  computed: {
    ...mapState({
      menuItems: state => state.menu.data,
      searchMenuItems: state => state.menu.searchData
    }),
  },
  mounted() {
    this.menuItems.filter(items => {
      if(items.bookmark){
        this.bookmarkItems.push(items)
      }
    })
  },
  methods: {
    openboomarkSearchBox() {
      this.boomarkSearchBox = !this.boomarkSearchBox
      if(!this.boomarkSearchBox)
        this.removeFix()
    },
    searchTerm: function() {
      this.$store.dispatch('menu/searchTerm', this.terms)
    },
    addFix() {
      document.getElementById("canvas-bookmark").classList.add("offcanvas-bookmark");
      this.boomarkSearchResult = true;
    },
    removeFix() {
      document.getElementById("canvas-bookmark").classList.remove("offcanvas-bookmark");
      this.boomarkSearchResult = false;
      this.text = "";
    },
    addToBookmark(items) {
      const index = this.bookmarkItems.indexOf(items);
      if(index === -1 && !items.bookmark){
        items.bookmark = true;
        this.bookmarkItems.push(items)
        this.text = "";
      } else {
        this.bookmarkItems.splice(index, 1);
        items.bookmark = false;
      }
    }
  },
  watch: {
    searchMenuItems: function () {      
      this.terms ? this.addFix() : this.removeFix();
      if(!this.menuItems.length)
        this.boomarkSearchResultEmpty = true;
      else
        this.boomarkSearchResultEmpty = false;
    }
  }
}
</script>