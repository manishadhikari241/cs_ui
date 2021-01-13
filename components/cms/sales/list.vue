<template>
  <div class="cmscomponent list">
    <div class="actions-container">
      <div>
        <form @submit.prevent="search">
          <b-input-group size="sm">
            <b-form-datepicker class="search-input" size="sm" placeholder="Search by date (from)" v-model="searchTerm.dateFrom" ></b-form-datepicker>
            <b-form-datepicker class="search-input" size="sm" placeholder="Search by date (to)" v-model="searchTerm.dateTo" ></b-form-datepicker>
            <b-input-group-append>
              <b-button variant="secondary" type="button" v-show="searchTerm.dateFrom || searchTerm.dateTo" @click="resetSearch">Reset</b-button>
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
          aria-controls="cms-sales-list"
          @change="load"
        ></b-pagination>
      </div>
    </div>

    <div class="additional-actions">
      <div>&nbsp;</div>
      <div class="total-count">
        Total: <strong>{{ total }}</strong>
        <b-button size="sm" variant="success" :disabled="loading"  @click="exportCsv">Export</b-button>
      </div>
    </div>

    <b-table id="cms-sales-list" :items="items" :fields="fields" :busy="loading" :select-mode="'single'" sticky-header small selectable striped>
      <template v-slot:cell(user_id)="data">
        <b-link @click="$router.push(`/cms/users?id=${data.value}`)">{{ data.value }}</b-link>
      </template>
      <template v-slot:cell(created_at)="data">
        {{ $moment(data.value).format('YYYY-MM-DD') }}
      </template>
      <template v-slot:cell(details)="data">
        <b-link @click="$router.push(`/cms/sales?id=${data.item.id}`)">Invoice</b-link>
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
          key: 'user_id',
          label: 'User'
        },
        {
          key: 'user_email',
          label: 'Email'
        },
        {
          key: 'created_at',
          label: 'Date'
        },
        {
          key: 'package',
          label: 'Package'
        },
        {
          key: 'amount',
          label: 'Price'
        },
        {
          key: 'quantity',
          label: 'Quota'
        },
        {
          key: 'channel',
          label: 'Channel',
        },
        {
          key: 'details',
          label: 'Details',
        },
      ],
      exportCol: ['user_id', 'user_email', 'created_at', 'package', 'amount', 'quantity', 'channel', 'billing_details'],
      loading: false,
      searchTerm: {
        dateFrom: '',
        dateTo: ''
      }
    }
  },
  methods: {
    load(page) {
      this.loading = true;
      this.$axios.$get(`/cms/payments?page=${page}${this.searchTerm.dateFrom ? '&created_from='+this.searchTerm.dateFrom : ''}${this.searchTerm.dateTo ? '&created_to='+this.searchTerm.dateTo : ''}`)
        .then((response) => {
          for (const item of response.data) {
            item.user_email = item.user.email
          }
          this.items = response.data;
          this.total = response.total;
          this.loading = false;

          let menuframe = document.querySelector('.menuframe');
          menuframe.scrollTop = 0;
        })
    },

    search() {
      this.currentPage = 1;
      this.load(this.currentPage);
      document.querySelector('.search-input').blur();
    },

    resetSearch() {
      this.searchTerm.dateFrom = '';
      this.searchTerm.dateTo = '';
      this.search();
    },

    refresh() {
      this.load(this.currentPage);
    },

    exportCsv() {
      this.loading = true;
      this.$axios.$get(`/cms/payments?export=true${this.searchTerm.dateFrom ? '&created_from='+this.searchTerm.dateFrom : ''}${this.searchTerm.dateTo ? '&created_to='+this.searchTerm.dateTo : ''}`)
        .then((response) => {
          for (const item of response) {
            item.user_email = item.user.email
          }
          this.$exportCsv(response, `Sales Report ${this.$moment().format('YYYY-MM-DD')}`, this.exportCol)
          this.loading = false;
        })
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
#cms-sales-list {
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
