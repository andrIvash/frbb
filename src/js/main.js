import Vue from 'vue/dist/vue.js';
import '../styles/mycomponent.scss';

export default (function() {
    const myComponent = {
        template: '#mycomponent-template',
        data() {
            return {
                active: 'home'
            };
        },
        created() {
        },
        methods: {
            makeActive(item) {
                this.active = item;
            }
        }
    };

    const vm = new Vue({
        el: '#app',
        components: {
            myComponent
        }
    });

})();
