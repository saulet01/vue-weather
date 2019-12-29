<template>
    <div>
        <div class="my-4 d-flex justify-center">
            <app-star></app-star>
            <h1 class="text-center ml-4">Forecast in the world cities:</h1>
        </div>
        <v-row>
            <v-col cols="3" v-for="(city, i) in worldCities" :key="i">
                <v-card min-height="350" dark elevation="10" class="wow fadeInLeft">
                    <v-card-title class="d-flex justify-space-between">
                        <h4 class="display-1">{{ city.name }}</h4>
                        <h4 class="display-1">
                            {{ parseInt(city.main.temp) }}
                            <span>&#176;</span>
                        </h4>
                    </v-card-title>
                    <v-card-text>
                        <v-img :src="getImgUrl(city.name)" max-height="250" contain></v-img>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import Stat from "./Stat";
    export default {
        components: {
            "app-star": Stat
        },
        methods: {
            getImgUrl(city) {
                /* eslint-disable no-alert, no-console */
                console.log(city);
                var getSource = require("../assets/" + city + ".png");
                return getSource;
            }
        },
        mounted() {
            window.wow.init();
            this.$store.dispatch("getGlobalCities");
        },
        computed: {
            worldCities() {
                return this.$store.getters.getWorldCities;
            }
        }
    };
</script>

<style scoped>
h1 {
    font-weight: 250;
    font-size: 3.5em;
}

.v-card {
    background-color: #abe9cd;
    background-image: linear-gradient(
        0deg,
        rgba(171, 233, 205, 1) 0%,
        rgba(62, 173, 207) 90%
    );
}
</style>
