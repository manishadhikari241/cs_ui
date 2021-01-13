<template>
  <div class="cmscomponent list">
    <div class="actions-container">
      <div>
        <form @submit.prevent="search">
          <b-input-group size="sm">
            <b-form-input placeholder="Search by keyword" class="search-input" v-model="searchTerm.tmp"></b-form-input>
            <b-input-group-append>
              <b-button variant="secondary" type="button" v-show="searchTerm.value || searchTerm.season" @click="resetSearch">Reset</b-button>
              <b-button variant="primary" type="submit">Search</b-button>
            </b-input-group-append>
          </b-input-group>
        </form>
      </div>
      <div>
        <b-pagination
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          aria-controls="cms-collections-list"
          @change="load"
        ></b-pagination>
      </div>
    </div>
    
    <div class="additional-actions">
      <div style="display: flex; align-items: center;">
        <b-button-group size="sm" class="filters">
          <b-button variant="success" :disabled="loading" :class="{'active': searchTerm.is_active == 1}" @click="setSearchActive(1); search();">Active</b-button>
          <b-button variant="danger" :disabled="loading" :class="{'active': searchTerm.is_active == 0}" @click="setSearchActive(0); search();">Inactive</b-button>
        </b-button-group>
        <multiselect
          style="width: 300px; margin-left: 10px;"
          v-model="searchTerm.season"
          placeholder="Seasons"
          :options="seasons"
          track-by="id"
          :searchable="true"
          :custom-label="seasonLabel"
          :multiple="false"
          @select="onSeasonChange"
          @remove="onSeasonChange">
        </multiselect>
      </div>
      <div class="total-count">
        Total: <strong>{{ total }}</strong>
      </div>
    </div>

    <b-table id="cms-collections-list" :items="items" :fields="fields" :busy="loading" :select-mode="'single'" @row-clicked="select" sticky-header small selectable striped>
      <template v-slot:cell(designer_id)="data">
        <nuxt-link :to="`/cms/users?id=${data.item.designer_id}`">{{ data.item.designer_id }}</nuxt-link>
      </template>
      <template v-slot:cell(moodboard)="data">
        <img v-if="data.item.moodboards[0]" style="height: 30px;" :src="`/cloudfront/uploads/lib/feed/moodboard${data.item.moodboards[0].moodboard}`">
        <span v-else>---</span>
      </template>
      <template v-slot:cell(is_active)="data">
        <b-badge variant="success" v-if="data.item.is_active">Active</b-badge>
        <b-badge variant="danger" v-else>Inactive</b-badge>
      </template>
      <template v-slot:cell(publish_at)="data">
        <span v-if="data.item.publish_at">{{ $moment(data.item.publish_at).format('MMMM Do YYYY') }}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      seasons: [],
      items: [],
      perPage: 20,
      currentPage: 1,
      total: 0,
      fields: [
        {
          key: 'id',
          label: 'ID'
        },
        {
          key: 'user.email',
          label: 'Creator'
        },
        {
          key: 'translations[0].title',
          label: 'Name'
        },
        {
          key: 'season.translations[0].name',
          label: 'Season'
        },
        {
          key: 'moodboard',
          label: 'MoodBoard'
        },
        {
          key: 'publish_at',
          label: 'Publish Date'
        },
        {
          key: 'is_active',
          label: 'Is Active'
        }
      ],
      loading: false,
      searchTerm: {
        tmp: '',
        value: '',
        is_active: null,
        season: null
      }
    }
  },
  methods: {
    load(page) {
      this.loading = true;
      this.$axios.$get(`/cms/collections?&scope[]=user&scope[]=moodboards&take=${this.perPage}&page=${page}${this.searchTerm.value ? '&title='+this.searchTerm.value : ''}${this.searchTerm.is_active !== null ? '&is_active='+this.searchTerm.is_active : ''}${this.searchTerm.season !== null ? '&season_id='+this.searchTerm.season.id : ''}&sort=-created_at`)
        .then((response) => {
          this.items = response.data;
          this.total = response.total;
          this.loading = false;

          let menuframe = document.querySelector('.menuframe');
          menuframe.scrollTop = 0;
        })
    },

    loadSeasons() {
      this.$axios.$get('/cms/seasons?all=true')
        .then((response) => {
          this.seasons = response;
        });
    },

    setSearchActive(is_active) {
      if (is_active == this.searchTerm.is_active)
        is_active = null;
      this.searchTerm.is_active = is_active;
    },

    search() {
      this.searchTerm.value = this.searchTerm.tmp
      this.currentPage = 1;
      this.load(this.currentPage);
      document.querySelector('.search-input').blur();
    },

    resetSearch() {
      this.searchTerm.is_active = null;
      this.searchTerm.season = null;
      this.searchTerm.tmp = '';
      this.search();
    },

    select(item, index, event) {
      this.$router.push(`/cms/collections?id=${item.id}`);
    },

    refresh() {
      this.load(this.currentPage);
    },

    seasonLabel({ translations }) {
      return translations[0].name;
    },

    onSeasonChange(season) {
      this.$nextTick(() => {
        this.search();
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.load(this.currentPage);
      this.loadSeasons();
    });
  }
}
</script>

<style lang="scss">
#cms-collections-list {
  th {
    font-size: 13px;
  }

  td {
    font-size: 12px;
  }
}

.cmscomponent.list {
  .actions-container {
    display: flex;
    justify-content: space-between;
    align-items: middle;
    background: #ddd;
    padding: 10px;
    border-radius: 5px;

    .form-control {
      height: 38px;
    }

    .pagination {
      margin: 0;
    }
  }

  .filters {
    button {
      &.active::after {
        content: '(X)';
        padding-left: 5px;
      }
    }
  }
}
</style>