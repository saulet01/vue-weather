<template>
    <div>
        <v-container fluid class="st-louis shadow-apply">
            <v-row>
                <v-col cols="8" class="mx-auto">
                    <v-form class="d-flex align-center">
                        <v-text-field label="Enter City" prepend-inner-icon="search" dark hint="For instance: New York" v-model="searchNewCity"></v-text-field>
                        <v-btn class="ml-3" v-on:click="findNewCity">Search</v-btn>
                    </v-form>

                    <transition name="slide" mode="out-in">
                        <v-card color="#ffda45" v-if="errorCode" class="mt-3">
                            <v-card-title class="justify-center">
                                <i class="material-icons">error</i>
                                Ooops, the entered city is not found!
                            </v-card-title>
                        </v-card>
                    </transition>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="mx-auto" sm="12" md="8">
                    <v-card raised class="card-city" elevation="15" dark>
                        <div class="overlay"></div>
                        <v-card-title class="d-flex justify-space-between">
                            <h1 class="d-flex display-2 font-weight-bold">{{ getCity.name }}</h1>
                            <div class="d-flex flex-row">
                                <p>
                                    <i class="small material-icons">trending_down</i>
                                    {{ parseInt(getCity.main.temp_min) }}
                                    <span>&#176;</span>
                                </p>
                                <p class="ml-4">
                                    <i class="material-icons">trending_up</i>
                                    {{ parseInt(getCity.main.temp_max) }}
                                    <span>&#176;</span>
                                </p>
                            </div>
                        </v-card-title>

                        <v-card-text class="d-flex justify-space-between">
                            <div>
                                <img :src="geImgUrl()" width="80" class="img-thumbnail" />
                                <h1 class="my-3 display-1">{{ getNameOfDay }}</h1>
                                <h3 class="my-3">{{ getTodayDate }}</h3>
                                <h3 class="my-3">Wind {{ getCity.wind.speed }} km/h</h3>
                                <div class="d-flex d-row">
                                    <span>
                                        <i class="tiny material-icons">cloud</i>
                                    </span>
                                    <h3 class="ml-2">{{ getCity.main.humidity }}%</h3>
                                </div>
                            </div>
                            <component :is="selectedComponent"></component>
                            <div class="temperatury">
                                <h1 class="display-4 font-weight-bold">
                                    {{ parseInt(getCity.main.temp) }}
                                    <span>&#176;</span>
                                </h1>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-container fluid>
            <app-favorites></app-favorites>
        </v-container>
        <div class="mb-5"></div>
    </div>
</template>

<script>
import Sunny from "./Sunny";
import RainyComponent from "./Rainy";
import Favorites from "./Favorites";
import moment from "moment";
export default {
    data() {
        return {
            searchNewCity: ""
        };
    },
    components: {
        "app-sunny": Sunny,
        "app-rainy": RainyComponent,
        "app-favorites": Favorites
    },
    methods: {
        geImgUrl() {
            var getSource = require("../assets/flags/" + this.getCity.sys.country.toLowerCase() + ".png");
            return getSource;
        },
        findNewCity() {
            this.$store.dispatch("findNewCity", this.searchNewCity);
        }
    },
    mounted() {
        this.$store.dispatch("findNewCity", "Almaty");
    },
    computed: {
        getCity() {
            return this.$store.getters.getStaticCity;
        },
        selectedComponent() {
            return this.$store.getters.getComponent;
        },
        getTodayDate() {
            return moment().format("LL");
        },
        getNameOfDay() {
            return moment().format("dddd");
        },
        errorCode() {
            return this.$store.getters.getErrorCode;
        }
    }
};
</script>

<style>
.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.05);
}

.st-louis {
    min-height: 30em;
    background-color: #abe9cd;
    background-image: linear-gradient(0deg, #abe9cd 0%, #3eadcf 90%);
}

.card-city {
    background-color: #abe9cd;
    background-image: linear-gradient(0deg, rgba(171, 233, 205, 1) 0%, rgba(62, 173, 207) 90%);
}

.img-thumbnail {
    padding: 0.2rem;
    background-color: #fff;
    border-radius: 0.25rem;
    max-width: 100%;
    height: auto;
}

.shadow-apply {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.slide-enter-active {
    animation: slide-in 1s ease-out forwards;
}

.slide-leave-active {
    animation: slide-out 0.5s ease-in forwards;
}

@keyframes slide-in {
    from {
        opacity: 0;
        transform: scaleX(1.2);
    }
    to {
        opacity: 1;
        transform: scaleX(1);
    }
}

@keyframes slide-out {
    from {
        opacity: 1;
        transform: scaleX(1);
    }
    to {
        opacity: 0;
        transform: scaleX(1.2);
    }
}
</style>
