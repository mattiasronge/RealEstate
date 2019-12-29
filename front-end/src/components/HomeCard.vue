<template>
    <div class="home-card">
        <div class="home-card-carousel">
            <img :src="home.images[current]">
            <div class="selectors">
                <button>&lt;</button>
                <button>&gt;</button>
            </div>
        </div>
        <div class="home-card-description">
            <h1>{{ home.title }}</h1>
            <router-link :to="{ name: 'product', params: {id: home._id}}">Read more</router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ['home'],
    data() {
        return {
            current: 0,
        };
    },
}
</script>

<style lang="scss" scoped>
.home-card {
    display: flex;
    flex-direction: column;
    width: 459px;
    margin-bottom: 54px;

    .home-card-carousel {
        position: relative;
        float: left;
        img {
            width: 100%;
            height: 318px;
        }
        .selectors {
            position: absolute;
            float: left;
            top: 0;
            left: 0;
            z-index: 10;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: transparent;
            button {
                width: 50px;
                height: 50px;
                padding: 10px;
                margin-left: 5px;
                margin-right: 5px;
                background: rgba(50, 50, 50, 0.5);
                border: 0;
                border-radius: 50px;
                color: white;
                cursor: pointer;
            }
        }
    }
    .home-card-description {
        margin-top: 10px;
        h1 {
            font-size: 1.1em;
            line-height: 1.4em;
            text-transform: uppercase;
        }
    }
}

</style>