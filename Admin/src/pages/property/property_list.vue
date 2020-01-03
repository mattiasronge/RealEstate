<template>
	<div>
		<Breadcrumbs main="Property from API" title="List"/>
			<!-- Container-fluid starts-->
			<div class="container-fluid">
				<div class="m-b-30">
					<span class="text-primary pull-right">Total: {{totalCount}}</span>
					<b-pagination-nav
					:number-of-pages="totalPages"
					:current-page="currentPage"
					v-model="currentPage"
					prev-text="Prev"
					next-text="Next"
					align="center"
					base-url="#"
					@change="getProperty_list"
					></b-pagination-nav>
				</div>
				<div class="row">
					<div class="col-xl-3 xl-40">
						<div class="default-according style-1 faq-accordion job-accordion" id="accordionoc">
							<div class="row">
								<div class="col-xl-12">
									<b-card no-body>
										<b-card-header header-tag="div" role="tab">
											<h5 class="mb-0">
												<b-button class="btn btn-link pl-0" block v-b-toggle.collapseicon>{{country}}</b-button>
											</h5>
										</b-card-header>
										<b-collapse id="collapseicon" visible role="tabpanel">
											<b-card-body class="filter-cards-view animate-chk">
												<div class="mb-5">
													<h6 class="mb-2">Property Types</h6>
													<multiselect  v-model="filters.types" placeholder="Search Type" label="title" track-by="type_id" :options="types" :multiple="true" :taggable="false"></multiselect>
												</div>
												<div class="mb-5">
													<h6 class="mb-2">Property Locations</h6>
													<multiselect  v-model="filters.locations" placeholder="Search Type" label="title" track-by="location_id" :options="locations" :multiple="true" :taggable="false"></multiselect>
												</div>
												<div class="mb-5">
													<h6 class="mb-2">Rental Period</h6>
													<div class="form-group m-t-15 custom-radio-ml">
														<div class="radio radio-primary">
															<b-form-radio name="period" v-model="filters.period" value="1">Any term</b-form-radio>
														</div>
														<div class="radio radio-info">
															<b-form-radio name="period" v-model="filters.period" value="2">Short Term Rentals</b-form-radio>
														</div>
														<div class="radio radio-warning">
															<b-form-radio name="period" v-model="filters.period" value="3">Long Term Rental</b-form-radio>
														</div>
														<div class="radio radio-danger">
															<b-form-radio name="period" v-model="filters.period" value="4">Own properties And Featured properties</b-form-radio>
														</div>
													</div>
												</div>
											</b-card-body>
											<button class="btn btn-block btn-primary text-center" type="button" @click="getProperty_list">Find Property</button>
										</b-collapse>
									</b-card>
								</div>
								<div class="col-xl-12">
									<b-card no-body>
										<b-card-header header-tag="div" role="tab">
											<h5 class="mb-0">
												<b-button class="btn btn-link pl-0" block v-b-toggle.collapselocation>Details</b-button>
											</h5>
										</b-card-header>
										<b-collapse id="collapselocation" visible role="tabpanel">
											<b-card-body class="filter-cards-view animate-chk">
												<div class="mb-5">
													<h6 class="mb-2">Bedrooms</h6>
													<b-form-select v-model="filters.bedrooms" :options="bedrooms"></b-form-select>
												</div>
												<div class="mb-5">
													<h6 class="mb-2">Bathrooms</h6>
													<b-form-select v-model="filters.bathrooms" :options="bathrooms"></b-form-select>
												</div>
												<div class="mb-5">
													<h6 class="mb-2">Min Price</h6>
													<b-input-group prepend="€" append=",000" class="pill-input-group">
														<b-form-input type="number" v-model="filters.minPrice" min="0"></b-form-input>
													</b-input-group>
												</div>
												<div class="mb-5">
													<h6 class="mb-2">Max Price</h6>
													<b-input-group prepend="€" append=",000" class="pill-input-group">
														<b-form-input type="number" v-model="filters.maxPrice" min="0"></b-form-input>
													</b-input-group>
												</div>
											</b-card-body>
											<button class="btn btn-block btn-primary text-center" type="button" @click="getProperty_list">Find Property</button>
										</b-collapse>
									</b-card>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xl-9 xl-60 bg-white" v-if="isLoading">
						<div class="loader" style="position: absolute;top: 46%;left: 46%;">
							<div class="whirly-loader"></div>
						</div>
					</div>
					<div class="col-xl-9 xl-60" v-else>
						<div class="card" v-for="(job,index) in property_list" :key="index">
							<div v-if="isSaved(job.ref_key)" class="ribbon ribbon-bookmark ribbon-vertical-left ribbon-warning"><i class="icofont icofont-save"></i></div>
							<div class="card-body">
								<div class="row pl-3">
									<div class="sm-12 md-6 lg-5" v-if="job.images && job.images.length>0">
										<lingallery class="img-fluid m-r-20" :height="280" :width="380" :mobileWidth="240" :mobileHeight="240" :showThumbnails="false" :items="job.images"/>
									</div>
									<div class="sm-12 md-6 lg-7">
										<div class="media-body">
											<h4 class="f-w-600">
												<router-link :to="{ name: 'PropertyDetails', params: { id: job.ref_key }}">{{ job.title }}</router-link>
											</h4>
											<p>€<span>{{job.Price | formatNumber}}</span></p>
											<p><b>Features:</b> <span v-html="stars(job.stars)"></span> &nbsp;<b>Type:</b> {{job.Type}}</p>
											<p><b>Location:</b> {{ job.Area }}, <span>{{ job.Location }}, {{ job.Location }} </span></p>
											<p><b>Inside:</b> <span class="pr-4" v-if="job.Built && job.Built>0">{{job.Built}}m²</span> <b>Outside:</b> <span v-if="job.GardenPlot && job.GardenPlot>0">{{job.GardenPlot}}m²</span></p>
											<p><span><i class="icofont icofont-bed"></i>: <b>{{ job.Bedrooms }}</b></span> <span><i class="icofont icofont-bathtub"></i>: <b>{{ job.Bathrooms }}</b></span></p>
										</div>
									</div>
								</div>
								<p v-html="job.description"></p>
								<button v-show="!isSaved(job.ref_key)" class="btn btn-secondary mr-3 pull-right" type="button" @click="saveProduct(job.ref_key)"><span><i class="fa fa-check"></i></span> Save this</button>
							</div>
						</div>
						<div class="m-b-30">
							<b-pagination-nav
							:number-of-pages="totalPages"
							:current-page="currentPage"
							v-model="currentPage"
							prev-text="Prev"
							next-text="Next"
							align="center"
							base-url="#"
							@change="getProperty_list"
							></b-pagination-nav>
						</div>
					</div>
				</div>
			</div>
			<!-- Container-fluid Ends-->
	</div>
</template>
<script>
import { mapState } from "vuex";
import Lingallery from 'lingallery';
import Multiselect from 'vue-multiselect';
var numeral = require("numeral");
export default
{
	name:'PropertyList',
	components: {
		Lingallery,
		Multiselect
	},
	props: ['id'],
	data() {
      return {
		country:'Spain',
		currentPage:1,
		bedrooms: [
			{ value:0, text: 'Any Bedrooms'},
			{ value:1, text: '1 Bedroom'},
			{ value:2, text: '2 Bedrooms'},
			{ value:3, text: '3 Bedrooms'},
			{ value:4, text: '4 Bedrooms'},
			{ value:5, text: '5 Bedrooms'},
			{ value:6, text: '6 Bedrooms'}
		],
		bathrooms: [
			{ value:0, text: 'Any Bathrooms'},
			{ value:1, text: '1 Bathroom'},
			{ value:2, text: '2 Bathrooms'},
			{ value:3, text: '3 Bathrooms'},
			{ value:4, text: '4 Bathrooms'},
			{ value:5, text: '5 Bathrooms'},
			{ value:6, text: '6 Bathrooms'}
		],
        filters: {
			bedrooms: 0,
			bathrooms: 0,
            locations:[{
				'title':'Benahavis',
				'location_id': 'c4',
			}
			],
			area:'',
			period: 1,
            types:[{
					'title':'Apartment',
					'type_id': '1-1',
				},
				{
					'title':'House',
					'type_id': '2-1',
				}
			],
            ref:'',
            minPrice:0,
            maxPrice:900000
        }
      }
    },
	created() {
		if (this.id>0)
			this.currentPage = this.id;
		this.getLocations();
		this.getTypes();
		this.getProperty_list();
		this.getRefKeys();
	},
	computed: {
		...mapState({
			isLoading: state => state.api.isLoading,
			locations: state => state.api.locations,
			types: state => state.api.types,
			property_list: state => state.api.property_list,
			product: state => state.api.product,
			ref_keys: state => state.api.ref_keys,
			totalCount: state => state.api.totalCount,
			totalPages: state => state.api.totalPages
		})
	},
	filters: {
        formatNumber(value) {
            return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
        }
    },
	methods:{
		isSaved(ref) {
			if (this.$store.state.api.ref_keys && this.$store.state.api.ref_keys.indexOf(ref) >= 0) {
				return true;
			}
			return false;
		},
		getLocations(){
			this.$store.dispatch('api/getLocations')
		},
		getRefKeys() {
			this.$store.dispatch('api/getRefKeys')
		},
		getTypes(){
			this.$store.dispatch('api/getTypes')
		},
		saveProduct(ref_key) {
			this.$store.dispatch('api/getPropery', {id:ref_key});
			let that = this;
			setTimeout(function () {
				that.$toasted.show('The product is saved successfully.', {theme: 'outline',position: "top-center", icon : 'info', type: 'info', duration: 3000});
			}, 2000);
		},
		getProperty_list() {
			let f_types = [];
			this.filters.types.forEach(item=>{
				if (item.type_id!='')
					f_types.push(item.type_id);
			});
			let f_locations = [];
			this.filters.locations.forEach(item=>{
				if (item.location_id!='')
					f_locations.push(item.title);
			});
			this.$store.dispatch('api/getList', { page:this.currentPage, types: f_types, locations: f_locations, period: this.filters.period, bedrooms:this.filters.bedrooms, baths:this.filters.bathrooms, minPrice: this.filters.minPrice*1000, maxPrice: this.filters.maxPrice*1000 });
		},
		stars(count)
		{
			var stars = ""
			for (var i = 0; i < 5; i++)
			{
				if(count > i)
				{
					stars = stars + '<i class="fa fa-star font-warning"></i>';
				}
				else
				{
					stars = stars + '<i class="fa fa-star font-warning-o"></i>';
				}
			}
			return stars;
		}
	}
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.card .ribbon-vertical-left {
	left:15px;
}
.img-280 {
	width:280px !important;
}
.media-body p {
	margin-bottom:5px;
	font-size:15px;
}
.media-body span {
	padding-right:12px;
}
</style>