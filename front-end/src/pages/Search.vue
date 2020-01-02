<template>
    <div id="search">
        <div id="header">
            <h1>Search Homes</h1>
            <h2>Search homes filtering by</h2>
        </div>
        <form id="search-form">
                <div id="search-form-filter">
                    <select name="location" id="location">
                        <option value="all">All locations</option>
                        <option :key="location" v-for="location in locations">{{ location }}</option>
                    </select>
                    <select name="areas" id="areas">
                        <option value="all">All areas</option>
                        <option :key="area.id" v-for="area in areas">{{ area.title }}</option>
                    </select>
                    <select name="types" id="types">
                        <option value="all">All types</option>
                        <option :key="type" v-for="type in types">{{ type }}</option>
                    </select>
                    <select name="bedrooms" id="bedrooms">
                        <option value="all">All bedrooms</option>
                    </select>
                </div>
                <div id="second-row">
                    <input type="text" id="ref" />
                    <input type="range" id="price" />
                </div>
        </form>
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
        this.searchPost();
    },
    computed: mapState({
        homes: state => state.posts,
        locations: state => state.locations,
        areas: state => state.areas,
        types: state => state.types,
    }),
    methods: {
    ...mapActions([
      "searchPost",
      "getLocations",
      "getAreas",
      "getTypes",
    ]),
  }
}
</script>

<style lang="scss" scoped>
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
        margin-bottom: 89px;
        
        #search-form-filter {
            display: flex;
            width: 80%;
            justify-content: space-between;


            select {
                background-color: rgb(249, 99, 50);
                color: white;
                padding: 40px;
                width: 200px;
                border-radius: 50;
            }
        }
    }
}
</style>