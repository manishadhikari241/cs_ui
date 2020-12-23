<template>
  <div class="page designs">
    <PageInfo v-if="!isTop" :slug="'designs'" />
    <div v-if="isTop" class="component pageinfo">
      <div class="pageinfo-head">
        <h1 class="pageinfo-title">{{ $t("top_100") }}</h1>
      </div>
      <p class="pageinfo-description">{{ $t("top_100_desc") }}</p>
    </div>

    <div
      class="search-details d-flex justify-content-center flex-wrap justify-content-md-end mb-2"
      v-if="!isTop"
    >
      <div class="custom-dropdown">
        <a
          href="javascript:void(0)"
          @click="toggle"
          class="custom-dropdown-label"
          >All color</a
        >
        <div class="custom-dropdown-container" v-if="activated">
          <div class="row">
            <div class="col-md-6 mb-2">
              <a
                href=""
                class="custom-dropdown-wrapper d-flex align-items-center"
              >
                <div class="custom-dropdown-color mr-2"></div>
                <span class="custom-dropdown-name">Red</span>
              </a>
            </div>
            <div class="col-md-6 mb-2">
              <a
                href=""
                class="custom-dropdown-wrapper d-flex align-items-center"
              >
                <div class="custom-dropdown-color mr-2"></div>
                <span class="custom-dropdown-name">Red</span>
              </a>
            </div>
            <div class="col-md-6 mb-2">
              <a
                href=""
                class="custom-dropdown-wrapper d-flex align-items-center"
              >
                <div class="custom-dropdown-color mr-2"></div>
                <span class="custom-dropdown-name">Red</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <b-form-select
        v-model="selected"
        :options="options"
        size="sm"
        class="color_select"
      ></b-form-select>

      <span class="keyword" v-if="term">{{ term }}</span>
      <!-- <span v-if="term"></span> -->
      <span class="total ml-2">{{ $t("designs") }}</span>
      <!-- <span v-if="term"></span> -->
      <span class="ml-2">({{ total }} {{ $t("results") }})</span>
      <!-- <span v-if="term"></span> -->
      <a class="reset font-weight-bold ml-2" v-if="term" @click="reset">{{
        $t("reset")
      }}</a>
    </div>

    <!-- <br /> -->

    <div class="designs-list">
      <client-only>
        <DesignList :designs="data" :showTop="isTop" />
        <infinite-loading @infinite="loadMore" ref="infload"></infinite-loading>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PageInfo from "~/components/pageinfo";
import DesignList from "~/components/designlist";

export default {
  components: {
    PageInfo,
    DesignList
  },
  asyncData(context) {
    return context.$axios.get("/pages/designs").then(res => {
      return { pageData: res.data };
    });
  },
  head() {
    return {
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.pageData.translations[this.$i18n.locale]
            .meta_description
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.pageData.translations[this.$i18n.locale].meta_keywords
        }
      ]
    };
  },
  computed: {
    ...mapState("search", ["term"])
  },
  data() {
    return {
      activated: false,
      randomKey: 0,
      itemsPerPage: 20,
      maxPageForGuest: 5,
      page: 0,
      maxPage: 100,
      total: 0,
      data: [],
      isTop: false,
      options: [
        { value: null, text: "All Color" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true }
      ],
      selected: null
    };
  },
  methods: {
    toggle() {
      this.activated = !this.activated;
    },
    getColors() {},
    loadMore() {
      let defaultURL = `/design?take=${this.itemsPerPage}&randomKey=${
        this.randomKey
      }&page=${this.page + 1}&keyword=${this.term}`;
      let topURL = `/design?take=${this.itemsPerPage}&page=${this.page +
        1}&sort=-pseudo_downloads`;
      let requestURL = this.isTop ? topURL : defaultURL;
      this.$axios.$get(requestURL + "&scope[]=keywords").then(response => {
        this.page = response.current_page;
        this.maxPage = response.last_page;
        this.total = response.total;
        this.data.push(...response.data);
        this.$refs.infload.stateChanger.loaded();
        let maxNofPages = this.$auth.loggedIn
          ? this.isTop
            ? 5
            : this.maxPage
          : this.maxPageForGuest;
        if (this.page >= maxNofPages)
          this.$refs.infload.stateChanger.complete();
      });
    },

    resetList() {
      this.page = 0;
      this.maxPage = 100;
      this.total = 0;
      this.data = [];
      this.$refs.infload.stateChanger.reset();
      if (
        this.term.toLowerCase() === "top 100" ||
        this.term.toLowerCase() === "前100名"
      )
        this.isTop = true;
      else this.isTop = false;
    },

    reset() {
      this.$store.dispatch("search/search", {
        searchDesigns: true,
        term: "",
        localePathFunction: this.localePath
      });
    }
  },
  watch: {
    term(newTerm, oldTerm) {
      this.$nextTick(function() {
        this.resetList();
      });
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.randomKey = Math.floor(Math.random() * 100);
      if (this.$refs.infload) this.resetList();
    });
  }
};
</script>

<style lang="scss" scoped>
// .designs-list {
//   margin-top: 20px;
// }
.color_select {
  width: 90px;
  border: 0px;
  outline: 0px;
  padding-bottom: 7px;
}
// .search-details {
//   display: flex;
//   float: right;
// }
.search-details {
  text-align: right;
  font-size: 16px;

  .keyword {
    font-weight: 700;
  }

  .reset {
    color: #666;
    text-decoration: none;
    cursor: pointer;
    font-weight: 700;
  }
}

.component.collection {
  margin-bottom: 50px;
}

.custom-dropdown {
  position: relative;
  z-index: 5;

  &-label {
    color: #212529;
    text-decoration: none;
  }
  &-wrapper {
    text-decoration: none;
  }
  &-container {
    position: absolute;
    top: 38px;
    left: 0;
    min-width: 270px;
    width: 100%;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px 0px rgba(0, 0, 0, 0.2);

    &:before {
      content: "";
      height: 16px;
      width: 16px;
      position: absolute;
      top: -10px;
      left: 17px;
      box-shadow: 0 0 6px 0px rgba(0, 0, 0, 0.2);
      transform: rotate(45deg);
      z-index: -1;
    }
  }
  &-color {
    height: 20px;
    width: 20px;
    background: red;
  }
  &-name {
    color: #666;
  }
}
</style>
