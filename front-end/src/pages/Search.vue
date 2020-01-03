<template>
    <div id="search">
        <div id="header">
            <h1>Search Homes</h1>
            <h2>Search homes filtering by</h2>
        </div>
        <form id="search-form">
                <div id="search-form-filter">
                    <select ref="location" name="location" id="location" @change="updateSearch">
                        <option :value="location._id" :key="location._id" v-for="location in locations">{{ location.title }}</option>
                    </select>
                    <select ref="area" name="areas" id="areas" @change="updateSearch">
                        <option :value="area._id" :key="area._id" v-for="area in areas">{{ area.title }}</option>
                    </select>
                    <select ref="type" name="types" id="types" @change="updateSearch">
                        <option :value="type._id" :key="type._id" v-for="type in types">{{ type.title }}</option>
                    </select>
                    <select ref="bedroom" name="bedrooms" id="bedrooms" @change="updateSearch">
                        <option value="0">Any bedrooms</option>
                        <option value="1">1 bedroom</option>
                        <option value="2">2 bedrooms</option>
                        <option value="3">3 bedrooms</option>
                        <option value="4">4 bedrooms</option>
                        <option value="5">5 bedrooms</option>
                        <option value="6">6 bedrooms</option>
                    </select>
                </div>
                <div id="search-form-filter2">
                    <div>
                        <input
                            type="text" 
                            id="ref"
                            ref="ref"
                            placeholder="Product reference" />
                    </div>
                    <div>
                        <input ref="min" type="number" step="1" min="100000" max="100000000" placeholder="Min price" id="min">
                        <input ref="max" type="number" step="1" min="100000" max="100000000" placeholder="Max price" id="max">
                    </div>
                </div>
        </form>
        <div id="paginator">
            <div
                v-for="page in totalPages"
                :key="page"
                :class="{'active': currentPage == page}"
                @click="updatePage(page)">
                {{ page }}
            </div>
        </div>
        <div id="search-results">
            <HomeCard v-for="home in homes" :key="home._id" :home="home"></HomeCard>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HomeCard from '../components/HomeCard.vue';

export default {
    components: {
        HomeCard,
    },
    created() {
        this.getLocations();
        this.getAreas();
        this.getTypes();
    },
    mounted() {
        this.updateSearch();
    },
    computed: mapState({
        homes: state => state.posts,
        locations: state => state.locations,
        areas: state => state.areas,
        types: state => state.types,
        currentPage: state => state.currentPage,
        totalPages: state => state.totalPages,
    }),
    methods: {
        ...mapActions([
            "searchPost",
            "getLocations",
            "getAreas",
            "getTypes",
        ]),
        updateSearch() {
            this.updatePage(1);
        },
        updatePage(page) {
            this.searchPost({ params: {
                page: page,
                location: this.$refs.location.value,
                value: this.$refs.area.value,
                type: this.$refs.type.value,
                bedroom: this.$refs.bedroom.value,
                ref: this.$refs.ref.value || '',
                price_from: this.$refs.min.value || 100000,
                price_to: this.$refs.max.value || 100000000,
            }});
    },
  }
}
</script>

<style lang="scss" scoped>
@mixin media-max($_max-width) {
    @media screen and (max-width: $_max-width) {
        &{ @content; }
    }
}

#search {
    #header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        min-height: 60vh;
        max-height: 440px;
        background: url('/video/video.jpg');
        background-size: 100vw 60vh;
        color: white;
        h1 {
            display: block;
            font-weight: bold;
            letter-spacing: -4px;
            text-transform: uppercase;
            text-align: center;
        }
    }
    #search-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 89px;
        margin-bottom: 30px;
        
        #search-form-filter {
            display: flex;
            width: 80%;
            justify-content: space-between;
            flex-wrap: wrap;

            @include media-max(1200px) {
                justify-content: center;
            }
            select {
                background-color: rgb(249, 99, 50);
                color: white;
                padding: 40px;
                margin: 10px;
                width: 200px;
                border-radius: 50;
            }
        }
        #search-form-filter2 {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            div {
                width: 50%;
                min-width: 500px;
                display: flex;
                justify-content: center;
                align-items: center;

                input {
                    margin: 10px;
                    padding: 10px 18px 10px 18px;
                    border: 1px solid #e3e3e3;
                    border-radius: 20px;
                }
                input:focus {
                    border: 1px solid red;
                    border-radius: 20px;
                    outline: none;
                }
            }
        }
    }
    #paginator {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        margin-bottom: 30px;

        div {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 10px;
            width: 40px;
            height: 40px;
            border-radius: 50px;
            cursor: pointer;
        }

        .active {
            color: white;
            background: rgb(249, 99, 50);
        }
    }

    #search-results {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        @include media-max(1200px) {
            justify-content: center;
        }
        padding-left: 113px;
        padding-right: 113px;
    }
}
</style>