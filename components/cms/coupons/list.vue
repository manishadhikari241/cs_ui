<template>
  <div class="cmscomponent list">
    <div class="actions-container">
      <div>
        <b-button-group size="sm" class="filters">
          <b-button variant="outline-primary" :disabled="loading" :class="{'active': searchTerm.value == 'standard'}" @click="search('standard')">Standard</b-button>
          <b-button variant="outline-success" :disabled="loading" :class="{'active': searchTerm.value == 'extended'}" @click="search('extended')">Extended</b-button>
          <b-button variant="outline-info" :disabled="loading" :class="{'active': searchTerm.value == 'simulator'}" @click="search('simulator')">Simulator</b-button>
          <b-button variant="outline-danger" :disabled="loading" :class="{'active': searchTerm.value == 'exclusive'}" @click="search('exclusive')">Exclusive</b-button>
        </b-button-group>
      </div>
      <div>
        <b-pagination
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          aria-controls="cms-coupons-list"
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

    <b-table id="cms-coupons-list" :items="items" :fields="fields" :busy="loading" :select-mode="'single'" @row-clicked="select" sticky-header small selectable striped>
      <template v-slot:cell(package)="data">
        <b-badge variant="primary" v-if="data.item.package == 'standard'">{{ data.item.package }}</b-badge>
        <b-badge variant="success" v-if="data.item.package == 'extended'">{{ data.item.package }}</b-badge>
        <b-badge variant="info" v-if="data.item.package == 'simulator'">{{ data.item.package }}</b-badge>
        <b-badge variant="danger" v-if="data.item.package == 'exclusive'">{{ data.item.package }}</b-badge>
      </template>
      <template v-slot:cell(user_id)="data">
        <nuxt-link :to="`/cms/users?id=${data.item.user_id}`">{{ data.item.user_id }}</nuxt-link>
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
          key: 'code',
          label: 'Code'
        },
        {
          key: 'package',
          label: 'Package'
        },
        {
          key: 'quantity',
          label: 'Quantity'
        },
        {
          key: 'user_id',
          label: 'User'
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
      this.$axios.$get(`/cms/coupons?page=${page}${this.searchTerm.value ? '&term='+this.searchTerm.value : ''}`)
        .then((response) => {
          this.items = response.data;
          this.total = response.total;
          this.loading = false;

          let menuframe = document.querySelector('.menuframe');
          menuframe.scrollTop = 0;
        })
    },

    search(pkg) {
      if (this.searchTerm.value == pkg) {
        this.resetSearch();
      } else {
        this.searchTerm.value = pkg;
        this.currentPage = 1;
        this.load(this.currentPage);
      }
    },

    resetSearch() {
      this.searchTerm.value = '';
      this.search();
    },

    select(item, index, event) {
      this.$router.push(`/cms/coupons?id=${item.id}`);
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
#cms-coupons-list {
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

    .pagination {
      margin: 0;
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
}
</style>