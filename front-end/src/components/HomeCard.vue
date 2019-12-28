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
            Text here.
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
        border: 1px solid black;
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
                padding: 10px;
                background: rgb(50, 50, 50);
                border: 0;
                color: white;
                cursor: pointer;
            }
        }
    }
    .home-card-description {
        border: 1px solid black;
    }
}

</style>