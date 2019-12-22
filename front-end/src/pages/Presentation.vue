<template>
    <div class="wrapper presentation-page">
        <div class="page-header clear-filter">
            <div class="rellax-header" data-rellax-speed="0">
                <video width="100%" preload="true" autoplay muted loop poster="video/video.jpg" id="video-tag" style="background-color: rgba(0, 0, 0, 0); object-position: center center; object-fit: cover; width: 100%; height: 100%;">
                    <source src="video/video.mp4" type="video/mp4">
                </video>
            </div>
            <div class="overlay-header"></div>
            <div class="rellax-text-container rellax-text">
                <h1 class="h1-seo" data-rellax-speed="-2">Homes</h1>
            </div>
            <h3 class="h3-description rellax-text" data-rellax-speed="-1">
                <a href="#/components" class="btn btn-action" rel="tooltip" title="" >
                    Search Homes
                </a>
            </h3>
            <h6 class="category category-absolute rellax-text" data-rellax-speed="-2">
                <parallax>
                    Designed by Mattias Ronge
                    <img v-lazy="'img/designer.png'" class="creative-tim-logo" alt=""/>
                </parallax>
            </h6>
        </div>
        <div class="section section-basic-components">
            <div class="container">
                <div class="row">
                    <div class="col-lg-5 col-md-7 mr-auto">
                        <h2 class="title pt-0 mt-0">About the Company</h2>
                        <h6 class="category">Homes</h6>
                        <h5 class="description">
                            We endeavour to meet our clients’ requirements. .</h5>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <div class="image-container">
                            <img class="components-macbook" src="img/presentation-page/home1.jpg" alt="ipad_img">
                            <!-- <img class="table-img" src="img/presentation-page/home2.jpg" alt="table">
                            <img class="coloured-card-btn-img" src="img/presentation-page/home4.jpg"
                                 alt="coloured card with button">
                            <img class="coloured-card-img" src="img/presentation-page/home5.jpg"
                                 alt="coloured card"> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section section-content pt-5" data-background-color="gray">
            <div class="container">
                <div class="col-md-8 ml-auto mr-auto">
                    <div class="section-description text-center">
                        <h2 class="title">Homes</h2>
                        <a href="#/components" class="btn btn-primary btn-round">View All Houses</a>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="section-cols">
                    <div class="row">
                        <div class="col-md-6" v-for="post in posts" :key="post.id">
                            <div class="card">
                                <lingallery :height="360" :mobileHeight="190" :showThumbnails="false" :items=post.images />
                                <div class="room-stats">
                                    <span class="mr-4"><i class="fa fa-bed"></i> : {{post.bedroom}} </span>
                                    <span class="mr-4"><i class="fa fa-bath"></i> : {{post.bathroom}} </span>
                                    <span class="mr-4"><i class="fa fa-home"></i> : {{post.square}} m²</span>
                                    <span><i class="fa fa-info"></i> : {{post.outside}} m²</span>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">
                                        <router-link v-bind:to="'/item/' + post._id">{{post.title}}</router-link>
                                    </h5>
                                    <!-- <div class="card-description" v-html="post.description"></div> -->
                                </div>
                                <span class="room-price"><small>€</small>{{post.price | formatNumber}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section section-content" data-background-color="black">
            <div class="container">
                <div class="row">
                    <div class="col-md-5">
                        <div class="image-container">
                            <img class="img img-raised rounded img-comments rellax" data-rellax-speed="1"
                                 src="img/presentation-page/home4.jpg" alt="content 1">
                            <img class="img img-raised rounded img-blog rellax" data-rellax-speed="4"
                                 src="img/presentation-page/home5.jpg" alt="content 4">
                        </div>
                    </div>
                    <div class="col-md-4 ml-auto mr-auto">
                        <div class="section-description">
                            <h2 class="title">Company</h2>
                            <h6 class="category">For Areas that Need More Space</h6>
                            <h5 class="description">Blablablablbalbalba. </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section section-content">
            <div class="container">
                <div class="col-md-8 ml-auto mr-auto">
                    <div class="section-description text-center">
                        <h2 class="m-0 p-0"><i class="fab fa-instagram"></i></h2>
                        <p class="text-center">
                            Instagram
                        </p>
                        <h2 class="sub-title">With Loves</h2>
                        <p>My Instagram photos</p>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="section-cols">
                    <div class="row">
                        <div class="col-md-4 col-sm-6 col-xs-6" v-for="(item,i) in [5,4,3,6,4,6,8,4,3,5,4,6]" :key="i">
                            <div class="thumb-img">
                                <img v-lazy="'img/examples/f'+item+'.jpg'" alt="facebook image">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  import { mapState, mapActions } from "vuex";
  import { Card, InfoSection } from '@/components';
  import Lingallery from 'lingallery';
  var numeral = require("numeral");

  export default {
    name: 'presentation',
    bodyClass: 'presentation-page',
    components: {
      Lingallery,
      Card,
      InfoSection,
 
      [Tooltip.name]: Tooltip
    },
    filters: {
        formatNumber(value) {
            return numeral(value).format("0,0"); 
        }
    },
    created() {
        this.getPosts({params:{ page : 1}});
    },
    mounted: function(){
        let video = document.getElementById('video-tag');
        video.src = "/video/video.mp4";
        video.play();
    },
    computed: mapState({
        posts: state => state.posts
    }),
    methods: {
        ...mapActions([
            "getPosts"
        ])
    }
  }
</script>
<style lang="scss">
    #video-tag {
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
    }
    .lingallery figure {
        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }
    @media screen and (min-width:1980px) {
        .page-header {
            min-height: 75vh;
        }
    }
    @media screen and (max-width: 640px) {
        .room-stats span {
            font-size:11px;
            padding-right: 0 !important;
        }
    }
    @media screen and (max-width: 991px) and (min-width: 768px) {
        .lingallery figure {
            height: 220px !important;
        }
    }  
    @media screen and (max-width: 480px) and (min-width: 320px) {
        .lingallery figure {
            height: 290px !important;
        }
    }  
    @media screen and (max-width: 320px) {
        .lingallery figure {
            height: 195px !important;
        }
    }     
</style>
<style scoped lang="scss">
    .presentation-page .thumb-img {
        max-height: 270px;
    }
    .sub-title {
        font-family: 'Muli', sans-serif;
        font-size: 40px;
        letter-spacing: 4px;
        margin-top: 30px;
        margin-bottom:10px;
        font-weight: 700;
        text-transform: uppercase;
        line-height: 1;
        text-align: center;
    }
    .github-buttons {
        display: flex;
        align-content: center;
    }
    .lingallery figure a.control {
        color:#fff !important;
    }
    .room-stats {
        margin-top: -30px;
        padding: 6px 8px;
        line-height: 18px;
        font-size: 14px;
        width: 100%;
        background-color:rgba(42, 42, 42, 0.85);
        color:#fff;
        position: relative;
        z-index: 999;
        display: none;
    }
    .card:hover .room-stats {
        display:block;
    }
</style>