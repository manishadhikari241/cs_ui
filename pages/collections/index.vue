<template>
  <div class="page collections">
    <PageInfo :slug="'collections'" />
    <!-- <br /> -->
    <div class="search-details">
      <b-dropdown
        class="season-dropdown"
        v-if="tmpSeason"
        :text="tmpSeason[$i18n.locale]"
        variant="outline"
      >
        <b-dropdown-item
          href="#"
          v-for="season in seasons"
          :key="season.id"
          @click="
            tmpSeasonTerm = season.id;
            search();
          "
          >{{ season[$i18n.locale] }}</b-dropdown-item
        >
      </b-dropdown>
      <span class="font-weight-bold" v-else>
        {{ $i18n.locale == "en" ? "All" : "所有" }}
      </span>
      <!-- <span>&nbsp;&nbsp;</span> -->
      <span class="keyword" v-if="term">{{ term }}</span>
      <!-- <span v-if="term">&nbsp;&nbsp;</span> -->
      <span class="total">{{ $t("collections") }}</span>
      <!-- <span>&nbsp;&nbsp;</span> -->
      <span>({{ total }} {{ $t("results") }})</span>
      <span v-if="term || seasonTerm"></span>
      <a
        class="reset font-weight-bold"
        v-if="term || seasonTerm"
        @click="reset"
        >{{ $t("reset") }}</a
      >
    </div>
    <br />
    <div class="collections-list">
      <client-only>
        <Collection
          v-for="(collection, $index) in data"
          :key="collection.id"
          :data="collection"
          :slideShowLeft="$index % 2 === 0"
        />
        <infinite-loading @infinite="loadMore" ref="infload"></infinite-loading>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PageInfo from "~/components/pageinfo";
import Collection from "~/components/collection";

export default {
  components: {
    PageInfo,
    Collection
  },
  asyncData(context) {
    return context.$axios.get("/pages/collections").then(res => {
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
    ...mapState("collections", ["page", "maxPage", "total", "data"]),
    ...mapState("search", ["term", "seasonTerm"]),
    tmpSeason() {
      var season = null;
      for (var s of this.seasons) {
        if (s.id == this.tmpSeasonTerm) {
          season = s;
          break;
        }
      }
      return season;
    }
  },
  data() {
    return {
      itemsPerPage: 10,
      maxPageForGuest: 2,
      seasons: [
        { id: 8, en: "All", ch: "一般" },
        { id: 5, en: "Autumn Winter 2020", ch: "秋冬2020" },
        { id: 6, en: "Spring Summer 2021", ch: "春夏2021" },
        { id: 7, en: "Autumn Winter 2021", ch: "秋冬2021" },
        { id: 9, en: "Sprint Summer 2022", ch: "春夏2022" }
      ],
      tmpSeasonTerm: null
    };
  },
  methods: {
    loadMore() {
      this.$axios
        .$get(
          `/collections?scope[]=user&scope[]=designs&scope[]=moodboards&scope[]=categories&scope[]=goods&scope[]=season&take=${
            this.itemsPerPage
          }&sort=-published_at${this.term ? "&keyword=" + this.term : ""}${
            this.seasonTerm ? "&seasonId=" + this.seasonTerm : ""
          }&page=${this.page + 1}`
        )
        .then(response => {
          this.$store.commit("collections/setPage", response.current_page);
          this.$store.commit("collections/setMaxPage", response.last_page);
          this.$store.commit("collections/setTotal", response.total);
          this.$store.commit("collections/appendData", response.data);
          this.$refs.infload.stateChanger.loaded();
          let maxNofPages = this.$auth.loggedIn
            ? this.maxPage
            : this.maxPageForGuest;
          if (this.page >= maxNofPages)
            this.$refs.infload.stateChanger.complete();
        });
    },

    resetList() {
      this.$store.commit("collections/setPage", 0);
      this.$store.commit("collections/setMaxPage", 100);
      this.$store.commit("collections/setTotal", 0);
      this.$store.commit("collections/clearData");
      this.$refs.infload.stateChanger.reset();
    },

    reset() {
      this.$store.dispatch("search/search", {
        searchDesigns: false,
        term: "",
        seasonTerm: "",
        localePathFunction: this.localePath
      });
    },

    search() {
      this.$store.dispatch("search/search", {
        searchDesigns: false,
        term: this.term,
        seasonTerm: this.tmpSeasonTerm,
        localePathFunction: this.localePath
      });
    }
  },
  watch: {
    term(newTerm, oldTerm) {
      this.$nextTick(function() {
        this.resetList();
      });
    },
    seasonTerm(newTerm, oldTerm) {
      this.$nextTick(function() {
        this.tmpSeasonTerm = newTerm || null;
        this.resetList();
      });
    }
  },
  mounted() {
    this.$nextTick(function() {
      if (this.$refs.infload) this.resetList();
    });
  }
};
</script>

<style lang="scss" scoped>
.search-details {
  text-align: right;
  font-size: 16px;

  @media screen and (max-width: 426px) {
    text-align: center;
    margin-top: 5px;
  }

  .keyword {
    font-weight: 700;
  }

  .reset {
    color: #666;
    text-decoration: none;
    cursor: pointer;
  }

  select {
    max-width: 100px;
    border: none;
    border-radius: 6px;
    outline: none;
  }
}

.component.collection {
  margin-bottom: 50px;
}
</style>
