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
          aria-controls="cms-designs-list"
          @change="load"
        ></b-pagination>
      </div>
    </div>
    
    <div class="additional-actions">
      <div>
        <b-button-group size="sm" class="filters">
          <b-button variant="outline-danger" :disabled="loading" :class="{'active': searchTerm.type == 'all'}" @click="setSearchType('all'); search();">Default</b-button>
          <b-button variant="outline-success" :disabled="loading" :class="{'active': searchTerm.type == 'exclusive'}" @click="setSearchType('exclusive'); search();">Exclusive</b-button>
        </b-button-group>
      </div>
      <div class="total-count">
        Total: <strong>{{ total }}</strong>
      </div>
    </div>

    <b-table id="cms-designs-list" :items="items" :fields="fields" :busy="loading" :select-mode="'single'" @row-clicked="select" sticky-header small selectable striped>
      <template v-slot:cell(designer_id)="data">
        <nuxt-link :to="`/cms/users?id=${data.item.designer_id}`">{{ data.item.designer_id }}</nuxt-link>
      </template>
      <template v-slot:cell(codeImage)="data">
        <img style="height: 30px;" :src="`/api/v1/image/thumbnail/design/${data.item.code}/tiny`">
      </template>
      <template v-slot:cell(licence_type)="data">
        <b-badge variant="success" v-if="data.item.licence_type == 'exclusive' || data.item.buyer_id || data.item.owner_id">Exclusive</b-badge>
        <b-badge variant="danger" v-else>Default</b-badge>
      </template>
      <template v-slot:cell(buyer)="data">
        <nuxt-link v-if="data.item.licence_type == 'exclusive' && (data.item.buyer_id || data.item.owner_id)" :to="`/cms/users?id=${data.item.buyer_id}`">{{ data.item.buyer_id }}</nuxt-link>
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
          key: 'design_name',
          label: 'Design Name'
        },
        {
          key: 'code',
          label: 'Code'
        },
        {
          key: 'licence_type',
          label: 'Licence'
        },
        {
          key: 'buyer',
          label: 'Buyer'
        },
        {
          key: 'codeImage',
          label: 'Image'
        }
      ],
      loading: false,
      searchTerm: {
        tmp: '',
        value: '',
        type: ''
      }
    }
  },
  methods: {
    load(page) {
      this.loading = true;
      this.$axios.$get(`/cms/design?take=${this.perPage}&page=${page}${this.searchTerm.value ? '&keyword='+this.searchTerm.value : ''}&latest=true&cms=true&type=${this.searchTerm.type}`)
        .then((response) => {
          this.items = response.data;
          this.total = response.total;
          this.loading = false;

          let menuframe = document.querySelector('.menuframe');
          menuframe.scrollTop = 0;
        })
    },

    setSearchType(type) {
      if (type == this.searchTerm.type)
        type = '';
      this.searchTerm.type = type;
    },

    search() {
      this.searchTerm.value = this.searchTerm.tmp
      this.currentPage = 1;
      this.load(this.currentPage);
      document.querySelector('.search-input').blur();
    },

    resetSearch() {
      this.searchTerm.type = '';
      this.searchTerm.tmp = '';
      this.search();
    },

    select(item, index, event) {
      this.$router.push(`/cms/designs?id=${item.id}`);
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
#cms-designs-list {
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