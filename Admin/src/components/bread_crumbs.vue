<template>
  <div class="container-fluid">
    <div class="page-header">
      <div class="row">
        <div class="col-lg-6">
          <div class="page-header-left">
            <h3>{{title}}</h3>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link :to="{ path: '/dashboard/default' }"><feather type="home"></feather></router-link></li>
              <li class="breadcrumb-item" v-if="main">{{main}}</li>
              <li class="breadcrumb-item active" v-if="title">{{title}}</li>
            </ol>
          </div>
        </div>
        <div class="col-lg-6">
          <Bookmark />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Bookmark from  './bookmark'
export default {
  props: {
    title: {
      default: 'home'
    },
    main: {
      default: ''
    }
  },
  components:{
    Bookmark
  }
}
</script>
