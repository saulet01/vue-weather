<template>
    <v-app>
        <v-app-bar app color="white">
            <div class="d-flex align-center">
                <v-img alt="Weather Logo" class="shrink mr-2" contain src="@/assets/sun.png" transition="scale-transition" width="40" />
                <h2>Weather</h2>
            </div>
        </v-app-bar>

        <v-content>
            <City />
        </v-content>
    </v-app>
</template>

<script>
import City from "./components/City";

export default {
    name: "App",

    components: {
        City
    },

    data: () => ({
        //
    })
};
</script>
