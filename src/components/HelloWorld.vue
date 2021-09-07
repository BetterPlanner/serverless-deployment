<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <v-img
          :src="require('../assets/school.png')"
          class="my-3"
          contain
          height="40"
        />
        <h1 class="display-2 font-weight-bold mb-3">
          BetterPlanner UofT
        </h1>

        <p class="subheading font-weight-regular mb-3">
          BetterPlanner is a course catalog search used to help course planning
          provide more details for courses at UofT. Search up courses such as
          <a href="search?course=CSC108H5">CSC108H5</a> to find courses that
          depend on it, such as
          <a href="search?course=CSC148H5">CSC148H5</a> and
          <a href="search?course=BIO458H5">BIO458H5</a>. To find courses that
          you will consider taking during the semester, please look at the
          academic calender for your program.
        </p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Contributions
        </h2>

        <v-row justify="center">
          <!-- <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a> -->
          <p class="subheading font-weight-regular mb-3">
            This is a project contributed by
            <a href="https://github.com/luu-alex">Alex Luu</a>,
            <a href="https://www.ali-raza.me/">Ali Raza</a> and
            <a href="https://bitbucket.org/lealexchang/">Alex Chang</a>.
            Checkout on <a href="https://github.com/BetterPlanner">GitHub</a>.
            Reach out for any questions or further discussions:
            alex.luu@mail.utoronto.ca.
          </p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ]
  })
};
</script>
