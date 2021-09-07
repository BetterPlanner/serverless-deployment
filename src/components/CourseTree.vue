<template>
  <v-card
    class="mx-auto"
    max-width="1600px"
    min-height="500px"
    flat
    :elevation="8"
  >
    <v-toolbar color="primary" dark flat tile>
      <v-icon style="padding-right: 14px">mdi-school</v-icon>
      <v-autocomplete
        autofocus
        solo-inverted
        clearable
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        v-model="model"
        :items="getCourse"
        :loading="$apollo.loading"
        :search-input.sync="search"
        item-text="name"
        no-filter
        item-value="code"
        item-key="code"
        placeholder="Start by course code or title"
        return-object
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title>
              Search for a course by code or name
            </v-list-item-title>
          </v-list-item>
        </template>
        <template v-slot:item="{ item }">
          <v-list-item-avatar
            color="indigo"
            class="headline font-weight-light white--text"
          >
            {{ item.code.charAt(0) + item.code.charAt(1) }}
          </v-list-item-avatar>
          <v-list-item-content v-if="item">
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.code"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-toolbar>
    <v-row class="text-center" v-if="!getData">
      <v-col class="mb-4">
        <v-img
          :src="require('../assets/school.png')"
          class="my-3"
          contain
          height="40"
        />
        <h1 class="display-2 font-weight-bold mb-3">
          Better Planner UofT
        </h1>
      </v-col>
    </v-row>
    <v-row class="mb-6" justify="center" no-gutters v-if="!getData">
      <v-col class="text-center mr-5 mb-3" cols="8">
        Better Planner is a course catalog search used to help withcourse
        planning, and provide more details for courses at UofT. Search up
        courses such as
        <a href="/?course=CSC108H5">CSC108H5</a> to find courses that depend on
        it, such as <a href="/?course=CSC148H5">CSC148H5</a> and
        <a href="/?course=BIO458H5">BIO458H5</a>. To find courses that you will
        consider taking during the semester, please look at the academic
        calender for your program.
      </v-col>
    </v-row>
    <v-row
      class="pa-4"
      justify="space-between"
      fluid
      v-if="getData && getData.length > 0"
    >
      <v-col cols="3" class="hidden-sm-and-down">
        <v-card-text>
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="primary"
          ></v-progress-circular>
          <v-treeview
            v-else
            :items="items"
            :load-children="queryData"
            activatable
            :active.sync="active"
            :rounded="true"
            transition
            item-text="code"
            item-key="code"
            :return-object="true"
          ></v-treeview>
        </v-card-text>
      </v-col>
      <v-divider vertical class="hidden-sm-and-down"></v-divider>
      <v-col class="d-flex text-center">
        <v-card
          :key="1"
          class="pt-6 mx-auto"
          flat
          max-width="900"
          v-if="selected && $apollo.loading"
        >
          <div class="title grey--text text--lighten-1 font-weight-light">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            Loading
          </div>
        </v-card>
        <v-card v-else :key="1" class="pt-6 mx-auto" flat max-width="900">
          <v-card-text v-if="getData && getData.length > 0">
            <h3 class="headline mb-2">
              <a
                :href="
                  `https://student.utm.utoronto.ca/calendar/OpenCourse.pl?Course=${getData[0].code}`
                "
                target="_blank"
                >{{ getData[0].code }} - {{ getData[0].name }}</a
              >
            </h3>
          </v-card-text>
          <v-divider></v-divider>
          <v-row
            v-if="getData && getData.length > 0"
            class="text-left"
            tag="v-card-text"
          >
            <v-col class="text-left mr-1 mb-2" tag="strong" cols="4"
              >Description:</v-col
            >
            <v-col>{{ getData[0].description }}</v-col>
            <!-- <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">Website:</v-col> -->
            <!-- <v-col>
                <a :href="`//${selected.website}`" target="_blank">{{ selected.website }}</a>
              </v-col> -->
          </v-row>
          <v-row
            class="text-left"
            tag="v-card-text"
            v-if="getData && getData.length > 0"
          >
            <v-col class="text-left mr-1 mb-2" tag="strong" cols="4"
              >Campus:</v-col
            >
            <v-col>{{ getData[0].campus }}</v-col>
          </v-row>
          <v-row
            class="text-left"
            tag="v-card-text"
            v-if="
              getData && getData.length > 0 && getData[0].exclusions.length > 0
            "
          >
            <v-col
              class="text-left mr-1 mb-2"
              tag="strong"
              cols="4"
              v-if="
                getData &&
                  getData.length > 0 &&
                  getData[0].exclusions.length > 0
              "
              >Exclusions:</v-col
            >
            <v-col>{{ getData[0].exclusions }}</v-col>
          </v-row>
          <v-row
            class="text-left"
            tag="v-card-text"
            v-if="
              getData &&
                getData.length > 0 &&
                getData[0].prerequisites.length > 0
            "
          >
            <v-col class="text-left mr-1 mb-2" tag="strong" cols="4"
              >Prerequisites:</v-col
            >
            <v-col>{{ getData[0].prerequisites }}</v-col>
          </v-row>
          <v-row
            class="text-left"
            tag="v-card-text"
            v-if="getData && getData.length > 0 && getData[0].required_for"
          >
            <v-col
              class="text-left mr-0 mb-0"
              tag="strong"
              cols="4"
              v-if="
                getData &&
                  getData.length > 0 &&
                  getData[0].required_for.length > 0
              "
              >Necessary for:</v-col
            >
          </v-row>
          <v-row class="mb-6 ml-12" no-gutters>
            <v-col
              cols="4"
              class="text-center mr-0 mb-1"
              v-for="item of getData[0].required_for"
              v-bind:key="item"
            >
              <v-card class="pa-3" tile>
                <a :href="`/?course=${item}`">{{ item }}</a>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="hidden-md-and-up"></v-divider>
    <v-row class="hidden-md-and-up">
      <v-card-text>
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
        ></v-progress-circular>
        <v-treeview
          v-else
          :items="items"
          :load-children="queryData"
          activatable
          :active.sync="active"
          :rounded="true"
          transition
          item-text="code"
          item-key="code"
          :return-object="true"
        ></v-treeview>
      </v-card-text>
    </v-row>
  </v-card>
</template>

<script>
import gql from "graphql-tag";

export default {
  apollo: {
    getCourse: {
      query: gql`
        query getCourse($search: String!) {
          getCourse(search: $search) {
            code
            name
          }
        }
      `,
      variables() {
        return {
          search: this.search
        };
      },
      skip() {
        return !this.search ? true : this.search.length < 3 ? true : false;
      }
    },
    getData: {
      query: gql`
        query getCourse($search: String!) {
          getData: getCourse(search: $search) {
            code
            name
            description
            campus
            prerequisites
            prerequisites_array
            required_for
            exclusions
          }
        }
      `,
      variables() {
        return {
          search: this.dosearch
        };
      },
      skip() {
        return !this.dosearch;
      }
    },
    getTree: {
      query: gql`
        query getTree($search: String!) {
          getTree(search: $search) {
            code
            hasChildren
          }
        }
      `,
      variables() {
        return {
          search: this.currentCourse
        };
      },
      skip() {
        return !this.currentCourse;
      }
    }
  },
  data: () => ({
    currentCourse: null,
    active: [],
    loading: false,
    tree: [],
    model: null,
    search: null,
    dosearch: null,
    innerSearch: null,
    open: [],
    courses: []
  }),
  computed: {
    selected() {
      if (!this.active.length) return undefined;

      const cur_active = this.active[0];

      return cur_active.code;
    },
    fields() {
      if (!this.model) return [];
      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || "n/a"
        };
      });
    },
    items() {
      if (this.getTree && this.getTree.hasChildren) {
        return [
          {
            code: this.currentCourse,
            children: this.courses
          }
        ];
      } else {
        return [
          {
            code: this.currentCourse
          }
        ];
      }
    }
  },
  watch: {
    selected(newValue) {
      newValue ? (this.dosearch = newValue) : null;
    },
    model: function(val) {
      if (val) {
        this.dosearch = val.code;
        this.currentCourse = val.code;
        this.courses = [];
      }
    }
  },
  mounted() {
    if (this.$route.query.course) {
      this.dosearch = this.$route.query.course.toUpperCase();
      this.currentCourse = this.$route.query.course.toUpperCase();
    }
  },
  methods: {
    async queryData(item) {
      if (item) {
        this.innerSearch = item.code;
        const response = await this.$apollo.query({
          query: gql`
            query getTree($search: String!) {
              getTree(search: $search) {
                code
                children {
                  code
                  hasChildren
                }
              }
            }
          `,
          variables: {
            search: this.innerSearch
          }
        });
        // if(response.data.getTree.children)
        var newTree = response.data.getTree.children;
        newTree.forEach(element => {
          if (element.hasChildren) {
            element.children = [];
          }
        });
        item.children.push(...newTree);
      }
    }
  }
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
