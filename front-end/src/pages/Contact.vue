<template>
    <div id="contact">
        <div id="header">
            <h1>Contact Us</h1>
            <h2>Meet the Administrator to require more Products</h2>
        </div>
        <pre>{{output}}</pre>
        <form id="contact-form" @submit="onSubmit">
            <div class="column">
                <h1>Send us a message</h1>
                <h2>
                    You can contact us with anything related to
                    our Products. We'll get in touch with you as
                    soon as possible.
                </h2>
                <label>Your name</label>
                <input type="text" name="name" id="name" placeholder="Your name ..." v-model="name">
                <label>Your email</label>
                <input type="email" name="email" id="email" placeholder="Email here..." v-model="email">
                <label>Your phone</label>
                <input type="phone" name="phone" id="phone" placeholder="Phone number here ..." v-model="phone">
                <label>Your message</label>
                <textarea id="message" name="message" v-model="message"></textarea>
                <button>
                    Contact us
                </button>
            </div>
            <div class="column">
                <div>
                    <h3>Find us at the office</h3>
                    <h2>
                        Mattias Ronge<br>
                        Home address,<br>
                        Spain
                    </h2>
                </div>
                <div>
                    <h3>Give us a ring</h3>
                    <h2>
                        Mattias Ronge<br>
                        +44 123 321 123<br>
                        Mon - Fri, 8:00-22:00
                    </h2>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            phone: '',
            message: '',
            output: ''
        };
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            let currentObj = this;

            this.axios.get('http://13.58.114.69:3000/api/sendEmail1?email='+this.email+'&name='+this.name+'&phone='+this.phone+'&message='+this.message)
            .then(function (response) {
                this.output = response;
            })
            .catch(function (error) {
                this.output = error;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@mixin media-max($_max-width) {
    @media screen and (max-width: $_max-width) {
        &{ @content; }
    }
}

#contact {
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
        h2 {
            text-align: center;
        }
    }
    #contact-form {
        display: flex;
        margin: 89px;
        justify-content: space-between;
        @include media-max(768px) {
            justify-content: center;
        }
        align-items: center;
        flex-wrap: wrap;
        .column {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 45%;
            min-width: 400px;
            margin-bottom: 89px;
            h1 {
                line-height: 1.2;
                font-size: 2.5em;
                font-weight: 700;
                color: black;
            }
            h2 {
                line-height: 1.61em;
                font-weight: 300;
                font-size: 1.2em;
                color: #9a9a9a;
                margin-bottom: 64px;
            }
            h3 {
                font-size: 1.5em;
                line-height: 1.45em;
            }
            label {
                margin-top: 32px;
            }
            input {
                padding: 10px 18px 10px 18px;
                border: 1px solid #e3e3e3;
                border-radius: 20px;
            }
            input:focus {
                border: 1px solid red;
                border-radius: 20px;
                outline: none;
            }
            textarea {
                padding: 10px 18px 10px 18px;
                border: 1px solid #e3e3e3;
                border-radius: 20px;
            }
            textarea:focus {
                border: 1px solid red;
                border-radius: 20px;
                outline: none;
            }
            button {
                width: 200px;
                padding: 10px;
                background-color:#f96332;
                color: white;
                border-width: 2px;
                font-weight: 400;
                font-size: .6271em;
                line-height: 1.35em;
                margin: 10px 1px;
                border: none;
                border-radius: .1875rem;
                padding: 11px 22px;
                margin-top: 32px;
            }
            button, button:hover, button:active {
                outline: none;
                cursor: pointer;
            }
        }
    }
}
</style>