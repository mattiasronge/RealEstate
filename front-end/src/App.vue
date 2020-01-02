<template>
    <div id="app">
        <header :style="{ 
                'background': headerBackground,
                'color': headerColor,
                'box-shadow': headerShadow}">
            <div class="brand">
                <router-link to="/">real estate</router-link>
            </div>
            <nav>
                <ul>
                    <li>
                        <router-link to="/search">Search</router-link>
                    </li>
                    <li>
                        <router-link to="/contact">Contact</router-link>
                    </li>
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
                        <li>Home</li>
                        <li>Properties</li>
                        <li>Contact</li>
                    </ul>

                </div>
                <div class="footer-column">
                    <h1>Office</h1>
                    <div class="footer-contact">
                       Blvd. Principe Alfonso von Hohenlohe s/n<br/>
                        114 46 Marbella, Spain<br/>
                        +46 (0)8 410 959 80<br/>
                    </div>

                </div>
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
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100vw;
    padding: 20px;
    text-transform: uppercase;
    a, a:visited, a:active, a:hover {
        color: white;
        text-shadow: 1px 1px 2px lightblue, 0 0 1em lightblue, 0 0 0.2em lightblue;
    }
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
