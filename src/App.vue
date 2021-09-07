<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-toolbar-title
        ><a class="title" :href="`/`">Better Planner UofT</a></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn @click="onDarkModeChange" icon>
        <v-icon v-if="$vuetify.theme.dark" color="grey"
          >mdi-lightbulb-outline</v-icon
        >
        <v-icon v-else color="blue">mdi-lightbulb-on-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer>
      <v-card flat tile width="100%" class="lighten-1">
        <v-card-text class="text-center">
          <span
            >This project is contributed by
            <a href="https://github.com/luu-alex">Alex Luu</a>,
            <a href="https://www.ali-raza.me/">Ali Raza</a>. Checkout on
            <a href="https://github.com/BetterPlanner">GitHub</a>.
          </span>
          <v-spacer></v-spacer>
          <span
            >{{ new Date().getFullYear() }} —
            <strong>Better Planner UofT</strong></span
          >
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
  methods: {
    onDarkModeChange() {
      this.$vuetify.theme.dark
        ? (this.$vuetify.theme.dark = false)
        : (this.$vuetify.theme.dark = true);
      window.localStorage.setItem("isDark", this.$vuetify.theme.dark ? 1 : 0);
    }
  },
  mounted: function() {
    this.$vuetify.theme.dark =
      window.localStorage.getItem("isDark") == 1 ? true : false;
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Nunito+Sans:800&display=swap");
:root {
  --color-blue: #4296bd;
  --color-title-text: #f6d45a;
}
.title {
  font-family: "Nunito Sans", sans-serif;
  font-size: 28px !important ;
  color: var(--color-blue);
  text-decoration: none;
}
</style>
