<template>
    <div>
        <Breadcrumbs main="Products" title="API Products"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <div class="default-according style-1 faq-accordion job-accordion">
                    <b-card no-body>
                      <b-card-header header-tag="div" role="tab">
                        <h5 class="mb-0">
                          <b-button class="btn btn-link pl-0" block v-b-toggle.collapseicon>Filter</b-button>
                        </h5>
                      </b-card-header>
                      <b-collapse id="collapseicon" visible role="tabpanel">
                        <b-card-body class="filter-cards-view animate-chk">
                          <div class="row mb-1">
                            <div class="col-md-6 col-lg-3">
                              <b-form-group
                                label-cols-md="3"
                                label-align-md="right"
                                label="ID:"
                                label-for="filter-id"
                              >
                                <b-form-input id="filter-id" type="text" class="form-control" v-model="filters.id.value" placeholder="ID value"></b-form-input>
                              </b-form-group>
                            </div>
                            <div class="col-md-6 col-lg-3">
                              <b-form-group
                                label-cols-md="3"
                                label-align-md="right"
                                label="Ref:"
                                label-for="filter-ref"
                              >
                                <b-form-input id="filter-ref" type="text" class="form-control" v-model="filters.ref.value" placeholder="ref key"></b-form-input>
                              </b-form-group>
                            </div>
                            <div class="col-md-6 col-lg-3">
                              <b-form-group
                                label-cols-md="3"
                                label-align-md="right"
                                label="Title:"
                                label-for="filter-title"
                              >
                                <b-form-input id="filter-title" type="text" class="form-control" v-model="filters.title.value" placeholder="title"></b-form-input>
                              </b-form-group>
                            </div>
                            <div class="col-md-6 col-lg-3">
                              <b-form-group
                                label-cols-md="3"
                                label-align-md="right"
                                label="Type:"
                                label-for="filter-type"
                              >
                                <b-form-input id="filter-type" type="text" class="form-control" v-model="filters.type.value" placeholder="type"></b-form-input>
                              </b-form-group>
                            </div>
                          </div>
                          <div class="row mb-1">
                            <div class="col-md-6 col-lg-3">
                              <b-form-group
                                label-cols-md="3"
                                label-align-md="right"
                                label="Location:"
                                label-for="filter-location"
                              >
                                <b-form-input id="filter-location" type="text" class="form-control" v-model="filters.location.value" placeholder="location"></b-form-input>
                              </b-form-group>
                            </div>
                            <div class="col-md-6 col-lg-3">
                              <b-form-group
                                label-cols-md="3"
                                label-align-md="right"
                                label="Area:"
                                label-for="filter-area"
                              >
                                <b-form-input id="filter-area" type="text" class="form-control" v-model="filters.area.value" placeholder="area"></b-form-input>
                              </b-form-group>
                            </div>
                            <div class="col-md-6 col-lg-3">
                              <b-form-group
                                label-cols-md="3"
                                label-align-md="right"
                                label="Bedroom:"
                                label-for="filter-bedroom"
                              >
                                <b-form-input id="filter-bedroom" type="number" min="0" class="form-control" v-model="filters.bedroom.value" placeholder="bedroom"></b-form-input>
                              </b-form-group>
                            </div>
                            <div class="col-md-6 col-lg-3">
                              <b-form-group
                                label-cols-md="3"
                                label-align-md="right"
                                label="Bathroom:"
                                label-for="filter-bathroom"
                              >
                                <b-form-input id="filter-bathroom" type="number" min="0" class="form-control" v-model="filters.bathroom.value" placeholder="bathroom"></b-form-input>
                              </b-form-group>
                            </div>
                          </div>
                          <div class="row mb-1">
                            <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <b-form-group
                                label-cols-md="3"
                                label-align-md="right"
                                label="Min Price:"
                                label-for="filter-min"
                              >
                                <b-input-group class="datatable-label">
                                  <b-input-group-prepend>
                                    <b-button class="btn-dark btn-xs bootstrap-touchspin-down" type="button" @click="subMin"><i class="fa fa-minus"></i></b-button>
                                  </b-input-group-prepend>
                                  <b-form-input class="touchspin" type="text" v-model="filters.price.value.min"></b-form-input>
                                  <b-input-group-append>
                                    <b-button class="btn-dark btn-xs bootstrap-touchspin-down" type="button" @click="addMin"><i class="fa fa-plus"></i></b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </b-form-group>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <b-form-group
                                  label-cols-md="3"
                                  label-align-md="right"
                                  label="Max Price:"
                                  label-for="filter-min"
                                >
                                <b-input-group class="datatable-label pull-right mb-0">
                                  <b-input-group-prepend>
                                    <b-button class="btn-dark btn-xs bootstrap-touchspin-down" type="button" @click="subMax"><i class="fa fa-minus"></i></b-button>
                                  </b-input-group-prepend>
                                  <b-form-input class="touchspin" type="text" v-model="filters.price.value.max"></b-form-input>
                                  <b-input-group-append>
                                    <b-button class="btn-dark btn-xs bootstrap-touchspin-down" type="button" @click="addMax"><i class="fa fa-plus"></i></b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </b-form-group>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <b-form-group
                                  label-cols-md="3"
                                  label-align-md="right"
                                  label="Square >"
                                  label-for="filter-square"
                                >
                                <b-input-group prepend="m²">
                                  <b-form-input id="filter-square" class="touchspin" type="number" placeholder="square" min="0" v-model="filters.square.value"></b-form-input>
                                </b-input-group>
                              </b-form-group>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
                              <b-form-group
                                  label-cols-md="3"
                                  label-align-md="right"
                                  label="Outside >"
                                  label-for="filter-outside"
                                >
                                <b-input-group prepend="m²">
                                  <b-form-input id="filter-outside" class="touchspin" type="number" placeholder="outside" min="0" v-model="filters.outside.value"></b-form-input>
                                </b-input-group>
                              </b-form-group>
                            </div>
                          </div>
                        </b-card-body>
                      </b-collapse>
                    </b-card>
                  </div>
                  <b-row>
                    <b-col md="6" class="add-datatable">
                      <router-link class="btn btn-primary text-white" :to="{ name: 'PropertyList'}"><i class="icofont icofont-ui-home"></i>&nbsp; Search And Save Product From API</router-link>
                    </b-col>
                    <b-col md="6">
                      <b-form-group label-cols="2" label="Per page" class="datatable-select">
                        <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </div>
                <div class="card-body" v-if="products">
                  <div class="datatable-vue m-0">
                    <div class="table-responsive vue-smart">
                      <v-table
                      :data="products" class="table"
                      :currentPage.sync="filters.currentPage"
                      :pageSize="perPage"
                      @totalPagesChanged="filters.totalPages = $event"
                      :filters="filters"
                      >
                        <thead slot="head">
                          <v-th sortKey="ref_key">Ref</v-th>
                          <v-th sortKey="title">Title</v-th>
                          <v-th sortKey="type.title">type</v-th>
                          <v-th sortKey="location.title">location</v-th>
                          <v-th sortKey="area.title">area</v-th>
                          <v-th sortKey="price">Price</v-th>
                          <v-th sortKey="bedroom">bedroom</v-th>
                          <v-th sortKey="bathroom">bathroom</v-th>
                          <v-th sortKey="square">Square</v-th>
                          <v-th sortKey="outside">Outside</v-th>
                          <v-th sortKey="_id">Actions</v-th>
                        </thead>
                        <tbody slot="body" slot-scope="{displayData}">
                          <tr v-for="row in displayData" :key="row.id">
                            <td>{{ row.ref_key }}</td>
                            <td>
                              <div class="row">
                                <div class="col-lg-12 col-xl-4 text-right">
                                  <img v-lazy="row.images[0]" salt=""/>
                                </div>
                                <div class="col-lg-12 col-xl-8">
                                  <p>{{ row.title }}</p>
                                </div>
                              </div>
                            </td>
                            <td>{{ row.type.title }}</td>
                            <td>{{ row.location.title }}</td>
                            <td>{{ row.area.title }}</td>
                            <td>{{ row.price }}</td>
                            <td>{{ row.bedroom }}</td>
                            <td>{{ row.bathroom }}</td>
                            <td>{{ row.square }}</td>
                            <td>{{ row.outside }}</td>
                            <td>
                              <a href="JavaScript:void(0);" @click="editRow(row._id)"><span class="text-info"><i class="fa fa-pencil f-18 sf-right"></i></span></a> &nbsp; 
                              <a href="JavaScript:void(0);" @click="deleteRow(row._id)"><span class="text-danger"><i class="fa fa-trash f-18 sf-right"></i></span></a>
                            </td>
                          </tr>
                        </tbody>
                      </v-table>
                    </div>
                    <smart-pagination
                    :currentPage.sync="filters.currentPage"
                    :totalPages="filters.totalPages"/>
                  </div>
                </div>
              </div>
            </div>
            <b-modal id="modal-product" size="xl" title="Save Product" centered no-stacking hide-footer class="theme-modal" @hidden="resetModal" @shown="focusMyElement">
              <div class="container-fluid bd-example-row grid-showcase" v-if="product">
                <b-form ref="form" class="needs-validation" @submit.stop.prevent="handleSubmit(product._id)">
                  <div class="form-row">
                      <div class="col-md-12 mb-3">
                        <label for="title">Title:</label>
                        <b-form-input type="text" id="title" ref="focusThis" v-model="product.title" required placeholder="Title"></b-form-input>
                      </div>
                      <div class="col-md-12 mb-3">
                        <label for="textarea">Description:</label>
                        <!-- <b-form-textarea id="textarea" v-model="product.description" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea> -->
                        <ckeditor :editor="editor"  v-model="product.description"></ckeditor>
                      </div>
                      <div class="col-md-12 mb-3">
                        <label for="textarea">Additional Features:</label>
                        <ckeditor :editor="editor"  v-model="product.description_2"></ckeditor>
                      </div>
                  </div>
                  <div class="form-row">
                      <div class="col-md-3 mb-3">
                        <label for="price"><i class="icofont icofont-bank"></i> Price</label>
                        <b-input-group prepend="€">
                          <b-form-input type="text" id="price" required v-model="product.price" placeholder="Price" min="0"></b-form-input>
                        </b-input-group>
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="type">Type</label>
                        <b-form-select id="type" required v-model="product.type" value-field="_id" text-field="title" :options="types"></b-form-select>
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="location">Location</label>
                        <b-form-select id="location" required v-model="product.location" value-field="_id" text-field="title" :options="locations"></b-form-select>
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="area">Area</label>
                        <b-form-select id="area" required v-model="product.area" value-field="_id" text-field="title" :options="areas"></b-form-select>
                      </div>
                  </div>
                  <div class="form-row">
                      <div class="col-md-6 col-lg-3 mb-3">
                        <label for="bedroom"><i class="icofont icofont-bed"></i> bedroom</label>
                        <b-form-input type="number" id="bedroom" required v-model="product.bedroom" placeholder="bedroom" min="0"></b-form-input>
                      </div>
                      <div class="col-md-6 col-lg-3 mb-3">
                        <label for="bathroom"><i class="icofont icofont-bathtub"></i> bathroom</label>
                        <b-form-input type="number" id="bathroom" required v-model="product.bathroom" placeholder="bathroom" min="0"></b-form-input>
                      </div>
                      <div class="col-md-6 col-lg-3 mb-3">
                        <label for="square"><i class="icofont icofont-hotel"></i> square</label>
                        <b-input-group prepend="m²">
                          <b-form-input type="number" id="square" required v-model="product.square" placeholder="square" min="0"></b-form-input>
                        </b-input-group>
                      </div>
                      <div class="col-md-6 col-lg-3 mb-3">
                        <label for="outside"><i class="icofont icofont-home"></i> outside</label>
                        <b-input-group prepend="m²">
                          <b-form-input type="number" id="outside" required v-model="product.outside" placeholder="outside" min="0"></b-form-input>
                        </b-input-group>
                      </div>
                  </div>
                  <div class="mb-4">
                    <h5>File Upload</h5>
                    <vue-dropzone ref="dropzone" id="dropzone" :options="dropzoneOptions" class="dropzone digits" @vdropzone-error="removeDropFile" @vdropzone-success="afterComplete"></vue-dropzone>
                  </div>
                  <ul class="img-thumbs form-row mb-4">
                    <li class="img-thumb" v-for="(img,i) in product.images" :key="i">
                      <img v-bind:src="img" />
                      <a href="JavaScript:void(0);" @click="removeProductImg(img)"><i class="fa fa-trash f-18 sf-right"></i></a>
                    </li>
                  </ul>
                  <div class="form-row mb-4">
                    <b-button type="submit" variant="primary">Save</b-button>
                  </div>
                </b-form>
              </div>
            </b-modal>
          </div>
        </div>
        <!-- Container-fluid Ends-->
    </div>
</template>

<script>
import { mapState } from "vuex";

// Importerar editor
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import vue2Dropzone from 'vue2-dropzone';

export default {
  components: {
    ckeditor: CKEditor.component,
    vueDropzone: vue2Dropzone
  },
  data(){
    return{
      dropzoneOptions:{
        url:process.env.VUE_APP_BACKEND_URL+'api/upload',
        thumbnailWidth: 250,
        thumbnailHeight: 140,
        acceptedFiles: 'image/jpeg,image/png',
        maxFiles:1,
        maxFilesize: 2,
        dictDefaultMessage:"<i class='icon-cloud-up'></i><h6>Drop files here or click to upload.</h6>"
      },
      editor: ClassicEditor,
      perPage: 10,
      pageOptions: [5, 10, 15],
      totalRows: 1,
      currentPage: 1,
      filters: {
        currentPage:1,
        totalPages:0,
				id: { value: '', keys: ['_id'] },
				ref: { value: '', keys: ['ref_key'] },
				title: { value: '', keys: ['title'] },
				type: { value: '', keys: ['type.title'] },
				location: { value: '', keys: ['location.title'] },
				area: { value: '', keys: ['area.title'] },
				bedroom: { value: '', keys: ['bedroom'] },
        bathroom: { value: '', keys: ['bathroom'] },
        square: { value: '0', custom: this.squareFilter },
        outside: { value: '0', custom: this.outsideFilter },
        price: { value: { min: 10000, max: 900000000 }, custom: this.priceFilter }
			}
    }
  },
  computed: { // efter att modifierat state till store, mappas det till komponent 
    ...mapState({
      products: state => state.api_product.products,
      product: state => state.api_product.product,
      locations: state => state.category.locations,
      areas: state => state.category.areas,
      types: state => state.category.types
    })       
  },
  created() { 
// när instansen är kryssad ställer du in automatiskt.
    this.getProducts();
    this.getLocations();
    this.getAreas();
    this.getTypes();
  }, 
  methods: { 
// definiera de metoder som används i api-produktlistan
    afterComplete(file, response) { 
// efter att bilduppladdningen har slutförts, läggs bilden till servern
      if (response.file.filename && response.file.filename!='')
        this.$store.dispatch('api_product/addProductImage', {img: response.file.filename});
      this.$refs.dropzone.removeAllFiles();
    },
    removeProductImg(image) { //tar bort bild
      this.$store.dispatch('api_product/removeProductImage', {img: image});
    },
    removeDropFile() { //drag drop
      this.$refs.dropzone.removeAllFiles();
    },
    focusMyElement() { //sätter fokus på elementet
      this.$refs.focusThis.focus()
    },
    resetModal() {
      this.name = ''
      this.nameState = null
    },
    handleSubmit(id) { 
// när admin klickar på spara-knappen och lägger till produkten i db
      this.$store.dispatch('api_product/saveProduct', {id: id});

// Dölj modalen manuellt
      this.$nextTick(() => {
        this.$bvModal.hide('modal-product');
        this.$toasted.show('The product is saved successfully.', {theme: 'outline',position: "top-center", icon : 'info', type: 'info', duration: 3000});
      })
    },
    showConfirmBox(id) { // öppna bekräfta rutan

      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete the Product with ID: '+id, {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
      .then(value => {
        if (value)
        {
          this.$store.dispatch('api_product/deleteProduct', {id: id});
          this.$toasted.show('The product is removed successfully.', {theme: 'outline', position: "top-center", icon : 'trash', type: 'danger', duration: 3000});
        }
      })
      .catch(err => {
        console.log(err);
        // An error occurred
      })
    },
    addRow() { // Lägger till rad
      this.$store.dispatch('api_product/emptyProduct');
      this.$bvModal.show('modal-product');
    },
    editRow(id){ //redigerar rad
      this.$store.dispatch('api_product/getProduct', {id: id});
      this.$bvModal.show('modal-product');
    },
    deleteRow(id){ // tar bort
      this.showConfirmBox(id);
    },
    getProducts(){  //Hämtar produkter
        this.$store.dispatch('api_product/getProducts')
    },
    getLocations(){  //hämtar location
        this.$store.dispatch('category/getLocations')
    },
    getAreas(){ //hämtar area
        this.$store.dispatch('category/getAreas')
    },
    getTypes(){ //hämtar types
        this.$store.dispatch('category/getTypes')
    },
    addMin:function(){  //hämtas min price
			if(parseInt(this.filters.price.value.min) < this.filters.price.value.max)
			{
				this.filters.price.value.min = parseInt(this.filters.price.value.min) + 10000;
			}
		},
		subMin:function(){
			if(parseInt(this.filters.price.value.min) > 10000)
			{
				this.filters.price.value.min = parseInt(this.filters.price.value.min) - 10000;
			}
		},
		addMax:function(){ //hämtar max price
			if(parseInt(this.filters.price.value.max) < 900000000)
			{
				this.filters.price.value.max = parseInt(this.filters.price.value.max) + 10000;
			}
		},
		subMax:function(){
			if(parseInt(this.filters.price.value.max) > parseInt(this.filters.price.value.min))
			{
				this.filters.price.value.max = parseInt(this.filters.price.value.max) - 10000;
			}
		},
    priceFilter (filterValue, row) {
			return parseInt(row.price) >= parseInt(filterValue.min) && parseInt(row.price) <= parseInt(filterValue.max)
    },
    squareFilter (filterValue, row) {
			return row.square >= filterValue
    },
    outsideFilter (filterValue, row) {
			return row.outside >= filterValue
		}
  }
}
</script>
<style>
.img-thumbs {
  width:100%;
}
.img-thumb {
  list-style: none;
  width:20%;
  padding:3px;
  border:1px solid #ddd;
  float:left;
  position: relative;
}
.img-thumb img {
  width:100%;
  height:100%;
}
.img-thumb a {
  position: absolute;
  top:4px;
  right:4px;
}
.dropzone .dz-preview {
  width: 160px;
}
.vue-dropzone .dz-preview .dz-image {
  width:120px;
}
.vue-dropzone .dz-preview .dz-image img {
  width: 135px;
  height: 110px;
}
.vue-dropzone a.dz-remove {
  cursor: pointer;
}
.vue-dropzone a.dz-remove:hover {
  color: #F96332 !important;
}
.table td img {
  width:100%;
  min-width:40px;
  max-width: 150px;
}
</style>