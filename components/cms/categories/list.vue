<template>
  <div class="cmscomponent list">
    <div class="actions-container">
      <div>
        <form @submit.prevent="search">
          <b-input-group size="sm">
            <b-form-input placeholder="Search by name" class="search-input" v-model="searchTerm.tmp"></b-form-input>
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
          :per-page="2"
          aria-controls="cms-categories-list"
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

    <b-table id="cms-categories-list" :items="items" :fields="fields" :busy="loading" :select-mode="'single'" @row-clicked="select" sticky-header small selectable striped></b-table>
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
          key: 'translations[0].tags',
          label: 'Name (EN)'
        },
        {
          key: 'translations[1].tags',
          label: 'Name (CH)'
        },
      ],
      loading: false,
      searchTerm: {
        tmp: '',
        value: ''
      }
    }
  },
  methods: {
    load(page) {
      this.loading = true;
      this.$axios.$get(`/cms/categories?page=${page}${this.searchTerm.value ? '&term='+this.searchTerm.value : ''}`)
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
      this.$router.push(`/cms/categories?id=${item.id}`);
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
#cms-categories-list {
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