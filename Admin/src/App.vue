<template>
  <div id="app">
 <!-- Loader starts-->
    <div class="loader-wrapper"  :class="{'loderhide' : !show }">
      <div class="loader bg-white">
        <div class="whirly-loader"> </div>
      </div>
    </div>
  <!-- Loader ends-->

    <!--<Main/>-->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  data(){
    return{
      show: true
    }
  },
  mounted() {
      this.timeOut();
    },
    methods:{   
      timeOut(){
          // this.basketAddSuccess = true;
            var self = this;
            setTimeout(function(){
                self.show = false;
            }, 1000);
      }
     }
  }
</script>

<style lang="scss" scoped>
.loader-wrapper.loderhide {
  display: none;
}
</style>
