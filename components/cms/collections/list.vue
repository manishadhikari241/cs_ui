<template>
  <div class="cmscomponent list">
    <div class="actions-container">
      <div>
        <form @submit.prevent="search">
          <b-input-group size="sm">
            <b-form-input placeholder="Search by keyword" class="search-input" v-model="searchTerm.tmp"></b-form-input>
            <b-input-group-append>
              <b-button variant="secondary" type="button" v-show="searchTerm.value" @click="resetSearch">Reset</b-button>
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
      <div>&nbsp;</div>
      <div class="total-count">
        Total: <strong>{{ total }}</strong>
      </div>
    </div>

    <b-table id="cms-collections-list" :items="items" :fields="fields" :busy="loading" :select-mode="'single'" @row-clicked="select" sticky-header small selectable striped>
      <template v-slot:cell(designer_id)="data">
        <nuxt-link :to="`/cms/users?id=${data.item.designer_id}`">{{ data.item.designer_id }}</nuxt-link>
      </template>
      <template v-slot:cell(moodboard)="data">
        <img v-if="data.item.moodboards[0]" style="height: 30px;" :src="`${cloudfrontURL}/uploads/lib/feed/moodboard${data.item.moodboards[0].moodboard}`">
        <span v-else>---</span>
      </template>
      <template v-slot:cell(is_active)="data">
        <b-badge variant="success" v-if="data.item.is_active">Active</b-badge>
        <b-badge variant="danger" v-else>Not Active</b-badge>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          key: 'designer_id',
          label: 'Creator'
        },
        {
          key: 'user.email',
          label: 'Email'
        },
        {
          key: 'moodboard',
          label: 'MoodBoard'
        },
        {
          key: 'is_active',
          label: 'Is Active'
        }
      ],
      loading: false,
      searchTerm: {
        tmp: '',
        value: ''
      },
      cloudfrontURL: process.env.NUXT_ENV_CLOUDFRONT
    }
  },
  methods: {
    load(page) {
      this.loading = true;
      this.$axios.$get(`/cms/collections?&scope[]=user&scope[]=moodboards&take=${this.perPage}&page=${page}${this.searchTerm.value ? '&keyword='+this.searchTerm.value : ''}&sort=-created_at`)
        .then((response) => {
          this.items = response.data;
          this.total = response.total;
          this.loading = false;

          let menuframe = document.querySelector('.menuframe');
          menuframe.scrollTop = 0;
        })
    },

    search() {
      this.searchTerm.value = this.searchTerm.tmp
      this.currentPage = 1;
      this.load(this.currentPage);
      document.querySelector('.search-input').blur();
    },

    resetSearch() {
      this.searchTerm.tmp = '';
      this.search();
    },

    select(item, index, event) {
      this.$router.push(`/cms/collections?id=${item.id}`);
    },

    refresh() {
      this.load(this.currentPage);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.load(this.currentPage);
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
}
</style>