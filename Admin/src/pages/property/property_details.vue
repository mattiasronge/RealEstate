<template>
	<div>
		<Breadcrumbs main="Property search" title="Property Details"/>
			<!-- Container-fluid starts-->
			<div class="container-fluid">
				<div class="row">
					<div class="col-sm-12">
						<div class="card">
							<div class="card-header">
							<h5>IMAGE GALLERY</h5>
							</div>
							<div class="card-body my-gallery gallery" id="aniimated-thumbnials">
							<div class="row" itemscope itemprop="thumbnail">
								<figure	class="col-xl-3 col-sm-6 img-hover hover-14" itemprop="associatedMedia" itemscope="" v-for="(n,index) in property.images" :key="index" @click="gindex = index">
								<a>
									<img :src="n" class="img-thumbnail" alt="Property Image" />
								</a>
								</figure>
								<VueGallery
								:images="property.images"
								:index="gindex"
								@close="gindex = null"
								>
								</VueGallery>
							</div>
							</div>
						</div>
					</div>
					<div class="col-sm-12">
						<div class="card">
							<div class="job-search">
								<div class="card-body">
									<div class="media">
										<div class="media-body">
											<h6 class="f-w-600">
												<router-link :to="{ name: 'JobDetails', params: { id: property.id }}">{{ property.title }}</router-link>
												<span class="pull-right">
													<router-link :to="{ name: 'JobApply', params: { id: property.id }}" class="btn btn-primary" >Apply for this job</router-link></span>
												</h6>
												<p>{{ property.company }} <span>{{ property.city }}, {{ property.country }} </span><span v-html="stars(property.stars)"></span></p>
											</div>
										</div>
										<div class="job-description">
											<h6>Job Description</h6>
											<p v-html="property.description"></p>
										</div>
										<div class="job-description">
											<h6>Responsibilities</h6>
											<ul>
												<li v-for="(r,index) in property.resp" :key="index" v-text="r.title"></li>
											</ul>
										</div>
										<div class="job-description">
											<h6>Requirements</h6>
											<ul>
												<li v-for="(rq,index) in property.reqs" :key="index" v-text="rq.title"></li>
											</ul>
										</div>
										<div class="job-description">
											<h6>Required Skills</h6>
											<ul>
												<li>Proficient understanding of web markup, including HTML5, CSS3</li>
												<li v-for="(ski,index) in property.skills" :key="index" v-text="ski.title"></li>
											</ul>
										</div>
										<div class="job-description">
											<button class="btn btn-primary mr-1" type="button"><span><i class="fa fa-check"></i></span> Save this job</button>
											<button class="btn btn-primary" type="button"><span><i class="fa fa-share-alt"></i></span> Share</button>
										</div>
									</div>
								</div>
							</div>
							<div class="header-faq">
								<h6 class="mb-0 f-w-600">Features</h6>
							</div>
							<div class="row" v-html="property.PropertyFeatures"></div>
						</div>
					</div>
				</div>
			<!-- Container-fluid Ends-->

		</div>
</template>
<script>
import { mapState } from "vuex";
import VueGallery from "vue-gallery";

export default{
	props: ['id'],
	components: {
		VueGallery
	},
	computed:{
		...mapState({
			isLoading: state => state.api.isLoading,
			property: state => state.api.property
		})
	},
	created(){
		this.getPropery(this.id);
	},
	data() {
		return {
		gindex: null,
		}
	},
	methods:{
		getPropery(id){
			this.$store.dispatch('api/getPropery', {id:id})
		},
		stars(count)
		{
			var stars = "";
			for (var i = 0; i < 5; i++)
			{
				if(count > i)
					stars = stars + '<i class="fa fa-star font-warning"></i>';
				else
					stars = stars + '<i class="fa fa-star font-warning-o"></i>';
			}
			return stars;
		}
	}
}
</script>
