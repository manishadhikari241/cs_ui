<template>
  <div class="cmscomponent list">
    <div class="actions-container">
      <div>
        <b-button-group size="sm" class="filters">
          <b-button variant="outline-success" :disabled="loading" :class="{'active': searchTerm.value == '2'}" @click="search('2')">Approved</b-button>
          <b-button variant="outline-info" :disabled="loading" :class="{'active': searchTerm.value == '0'}" @click="search('0')">Pending</b-button>
          <b-button variant="outline-danger" :disabled="loading" :class="{'active': searchTerm.value == '8'}" @click="search('8')">Rejected</b-button>
        </b-button-group>
      </div>
      <div>
        <b-pagination
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          aria-controls="cms-maskrequests-list"
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

    <b-table id="cms-maskrequests-list" :items="items" :fields="fields" :busy="loading" :select-mode="'single'" @row-clicked="select" sticky-header small selectable striped>
      <template v-slot:cell(status)="data">
        <b-badge variant="success" v-if="data.item.good_id">Approved</b-badge>
        <b-badge variant="info" v-else-if="!data.item.good_id && !data.item.message">Pending</b-badge>
        <b-badge variant="danger" v-else>Rejected</b-badge>
      </template>
      <template v-slot:cell(user_id)="data">
        <nuxt-link :to="`/cms/users?id=${data.item.user_id}`">{{ data.item.user_id }}</nuxt-link>
      </template>
      <template v-slot:cell(image)="data">
        <img style="height: 30px;" :src="`${cloudfrontURL}/uploads/good-request/${data.item.image}`">
      </template>
      <template v-slot:cell(approved_image)="data">
        <img v-if="data.item.good" style="height: 30px;" :src="`${cloudfrontURL}/uploads/good/${data.item.good.image}`">
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cloudfrontURL: process.env.NUXT_ENV_CLOUDFRONT,
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
          key: 'user_id',
          label: 'User'
        },
        {
          key: 'name',
          label: 'Name'
        },
        {
          key: 'image',
          label: 'User Image'
        },
        {
          key: 'approved_image',
          label: 'Approved Image'
        },
        {
          key: 'status',
          label: 'Status'
        }
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
      this.$axios.$get(`/cms/goods/requests?page=${page}${this.searchTerm.value ? '&term='+this.searchTerm.value : ''}`)
        .then((response) => {
          this.items = response.data;
          this.total = response.total;
          this.loading = false;

          let menuframe = document.querySelector('.menuframe');
          menuframe.scrollTop = 0;
        })
    },

    search(status) {
      if (this.searchTerm.value == status) {
        this.resetSearch();
      } else {
        this.searchTerm.value = status;
        this.currentPage = 1;
        this.load(this.currentPage);
      }
    },

    resetSearch() {
      this.searchTerm.tmp = '';
      this.search();
    },

    select(item, index, event) {
      this.$router.push(`/cms/maskRequests?id=${item.id}`);
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
#cms-maskrequests-list {
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