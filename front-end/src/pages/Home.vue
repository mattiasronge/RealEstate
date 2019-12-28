<template>
    <div id="home">
        <div id="fullscreen-video">
            <div class="header">
                <h1>Homes</h1>
                <h2>Search homes</h2>
            </div>
            <video onloadeddata="this.play();" loop playsinline muted>
                <source src="/video/video.mp4" type="video/mp4">
            </video>
        </div>
        <div id="company-info">
            <div id="company-info-image">
            </div>
            <div id="company-info-text">
                <h1>About the company</h1>
                <h2>Real estate</h2>
                <p>
                    - Insert here a nice text about the company services -
                </p>
            </div>
        </div>
        <div id="home-listing">
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
#fullscreen-video {
    position: relative;
    float: left;
    width: 100vw;
    height: 100vh;
    margin-bottom: 113px;
    background: url('/video/video.jpg');
    background-position: 0 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    video {
        position: relative;
        top: 0;
        left: 0;
        z-index: 50;
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
    .header {
        position: absolute;
        float: left;
        top: 0;
        left: 0;
        z-index: 100;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: white;
        h1 {
            display: block;
            font-size: 100px;
            font-weight: bold;
            letter-spacing: -4px;
            text-transform: uppercase;
        }
        h2 {
            font-size: 16px;
        }
    }
}

#company-info {
    width: 100vw;
    display: flex;
    #company-info-text {
        padding-left: 113px;
        h1 {
            font-size: 35px;
            font-weight: bold;
            line-height: 42px;
            color: rgb(17, 17, 17);
        }
        h2 {
            font-size: 12px;
            font-weight: bold;
            line-height: 15px;
            text-transform: uppercase;
            color: rgb(154, 154, 154);
        }
    }
}
</style>