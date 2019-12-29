<template>
    <div id="app">
        <header :style="{ 
                'background': headerBackground,
                'color': headerColor,
                'box-shadow': headerShadow}">
            <div class="brand">real estate</div>
            <nav>
                <ul>
                    <li>Contact</li>
                    <li>About us</li>
                    <li>Login</li>
                    <li>Sign up</li>
                </ul>
            </nav>
        </header>
        <div>
            <router-view/>
        </div>
        <footer>
            <div class="footer-columns">
                <div class="footer-column">
                    <h1>Meny</h1>
                    <ul class="capitalized">
                        <li>VÅRA HEM</li>
                        <li>SÄLJ MED OSS</li>
                        <li>UNDERHAND</li>
                        <li>WORLD OF ESNY</li>
                    </ul>
                    <ul>
                        <li>Vår historia</li>
                        <li>Vårt team</li>
                        <li>Kontakta oss</li>
                        <li>Press & PR</li>
                        <li>Våra villkor</li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h1>Kontakt</h1>
                    <div class="footer-contact">
                        <h1>STOCKHOLM</h1>
                        Humlegårdsgatan 10<br/>
                        114 46 Stockholm<br/>
                        +46 (0)8 410 959 80<br/>
                    </div>
                    <div class="footer-contact">
                        <h1>GÖTEBORG</h1>
                        Kaserntorget 5<br/>
                        411 18 Göteborg<br/>
                        +46 (0)31 353 90 90<br/>
                    </div>
                </div>
            </div>
            <div class="footer-infos">
                <div class="footer-icons">
                </div>
                <ul class="footer-summary">
                    <li>COPYRIGHT © 2019</li>
                    <li class="bold">EKLUND STOCKHOLM NEW YORK</li>
                    <li>ORG. NR 556787-1941</li>
                </ul>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
 
    data() {
        return {
            headerBackground: 'transparent',
            headerColor: 'white',
            headerShadow: 'none',
        }
    },

    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },

    methods: {
        onScroll(event) {
            if (window.pageYOffset > (document.documentElement.clientHeight * 0.80)) {
                this.headerBackground = 'white';
                this.headerColor = '#888';
                this.headerShadow = '0 0 20px 0 rgba(0,0,0,.15)';
            } else {
                this.headerBackground = 'transparent';
                this.headerColor = 'white';
                this.headerShadow = 'none';
            }
        },
    }
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    font-family: Montserrat, "Helvetica Neue", Arial, sans-serif;
}
</style>

<style lang="scss" scoped>
#app {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    overflow-x: hidden;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100vw;
    padding: 20px;
    text-transform: uppercase;
    ul {
        list-style: none;

        li {
            display: inline;
            padding: 10px;
            font-size: 12px;
        }
    }
}

.capitalized {
    text-transform: capitalize;
}

footer {
    display: flex;
    flex-direction: column;
    width: 100vw;
    padding: 90px;
    margin-top: 113px;
    background: #111;
    color: white;

    .footer-columns {
        display: flex;
        .footer-column {
            margin-right: 50px;
            font-size: 11px;
            h1 {
                margin-bottom: 20px;
                font-size: 11px;
                font-weight: 800;
                letter-spacing: 1.65px;
                line-height: 1.9em;
                text-transform: uppercase;
            }
            ul {
                list-style: none;
            }
            .footer-contact {
                margin-bottom: 20px;
            }
        }
    }
    .footer-infos {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        ul.footer-summary {
            list-style: none;
            li {
                display: inline;
                margin-right: 7px;
                font-size: 10px;
                letter-spacing: 2px;
                line-height: 15px;
            }
            li.bold {
                font-weight: 800;
            }
            li:after {
                content: "|";
                margin-left: 7px;
            }
            li:last-child:after {
                content: '';
            }
        }
    }
}
</style>
