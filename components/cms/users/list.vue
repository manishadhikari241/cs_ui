<template>
  <div class="cmscomponent list">
    <div class="actions-container">
      <div>
        <form @submit.prevent="search">
          <b-input-group size="sm">
            <b-form-input placeholder="Search by email" class="search-input" v-model="searchTerm.tmp"></b-form-input>
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
          aria-controls="cms-users-list"
          @change="load"
        ></b-pagination>
      </div>
    </div>

    <div class="additional-actions">
      <div>
        <b-button-group size="sm" class="filters">
          <b-button variant="info" :disabled="loading" :class="{'active': searchTerm.type == 1}" @click="setSearchType(1); search();">Admin</b-button>
          <b-button variant="warning" :disabled="loading" :class="{'active': searchTerm.type == 2}" @click="setSearchType(2); search();">Creator</b-button>
          <b-button variant="danger" :disabled="loading" :class="{'active': searchTerm.type == 999}" @click="setSearchType(999); search();">Member</b-button>
        </b-button-group>
      </div>
      <div class="total-count">
        Total: <strong>{{ total }}</strong>
        <b-button size="sm" variant="success" :disabled="loading"  @click="exportCsv">Export</b-button>
      </div>
    </div>

    <b-table id="cms-users-list" :items="items" :fields="fields" :busy="loading" :select-mode="'single'" @row-clicked="select" sticky-header small selectable striped>
      <template v-slot:cell(role_id)="data">
        <b-badge variant="info" v-if="data.item.role_id == 1">Admin</b-badge>
        <b-badge variant="warning" v-if="data.item.role_id == 2">Creator</b-badge>
        <b-badge variant="danger" v-if="data.item.is_existing_user">Member</b-badge>
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
          key: 'role_id',
          label: 'Role'
        },
        {
          key: 'first_name',
          label: 'First Name'
        },
        {
          key: 'last_name',
          label: 'Last Name'
        },
        {
          key: 'email',
          label: 'Email'
        },
        {
          key: 'standard_quota',
          label: 'Standard Bought (Used)'
        },
        {
          key: 'extended_quota',
          label: 'Extended Bought (Used)'
        },
        {
          key: 'simulator_quota',
          label: 'Simulator Bought (Used)'
        },
        {
          key: 'exclusive_quota',
          label: 'Exclusive Bought (Used)'
        },
      ],
      exportCol: ['id', 'role', 'first_name', 'last_name', 'email', 'standard_bought', 'standard_used', 'extended_bought', 'extended_used', 'simulator_bought', 'simulator_used', 'exclusive_bought', 'exclusive_used'],
      loading: false,
      searchTerm: {
        tmp: '',
        value: '',
        type: 0
      }
    }
  },
  methods: {
    load(page) {
      this.loading = true;
      this.$axios.$get(`/cms/users?page=${page}${this.searchTerm.value ? '&term='+this.searchTerm.value : ''}${this.searchTerm.type ? '&role_id='+this.searchTerm.type : ''}`)
        .then((response) => {
          this.items = response.data;
          for (const item of this.items) {
            item.standard_quota = this.getQuotaInfo('standard', item.payments, item.quota)
            item.extended_quota = this.getQuotaInfo('extended', item.payments, item.quota)
            item.exclusive_quota = this.getQuotaInfo('exclusive', item.payments, item.quota)
            item.simulator_quota = this.getQuotaInfo('simulator', item.payments, item.quota)
          }
          this.total = response.total;
          this.loading = false;

          let menuframe = document.querySelector('.menuframe');
          menuframe.scrollTop = 0;
        })
    },

    setSearchType(type) {
      if (type == this.searchTerm.type)
        type = 0;
      this.searchTerm.type = type;
    },

    search() {
      this.searchTerm.value = this.searchTerm.tmp
      this.currentPage = 1;
      this.load(this.currentPage);
      document.querySelector('.search-input').blur();
    },

    resetSearch() {
      this.searchTerm.type = 0;
      this.searchTerm.tmp = '';
      this.search();
    },

    select(item, index, event) {
      this.$router.push(`/cms/users?id=${item.id}`);
    },

    refresh() {
      this.load(this.currentPage);
    },

    getQuotaInfo(pkg, paymentsArr, quota, isExport = false) {
      let quotaBought = 0;
      for (const payment of paymentsArr) {
        if (payment.package === pkg)
          quotaBought += payment.quantity
      }
      let quotaUsed = quota ? quota[`${pkg}_used`] : 0;
      return !isExport ? `${quotaBought} (${quotaUsed})` : [quotaBought, quotaUsed];
    },

    exportCsv() {
      this.loading = true;
      this.$axios.$get(`/cms/users?export=true${this.searchTerm.value ? '&term='+this.searchTerm.value : ''}${this.searchTerm.type ? '&role_id='+this.searchTerm.type : ''}`)
        .then((response) => {
          for (const item of response) {
            item.role = item.role_id === 1 ? 'Admin' : (item.role_id === 2 ? 'Creator' : 'Member')
            item.standard_bought = this.getQuotaInfo('standard', item.payments, item.quota, true)[0]
            item.standard_used = this.getQuotaInfo('standard', item.payments, item.quota, true)[1]
            item.extended_bought = this.getQuotaInfo('extended', item.payments, item.quota, true)[0]
            item.extended_used = this.getQuotaInfo('extended', item.payments, item.quota, true)[1]
            item.exclusive_bought = this.getQuotaInfo('exclusive', item.payments, item.quota, true)[0]
            item.exclusive_used = this.getQuotaInfo('exclusive', item.payments, item.quota, true)[1]
            item.simulator_bought = this.getQuotaInfo('simulator', item.payments, item.quota, true)[0]
            item.simulator_used = this.getQuotaInfo('simulator', item.payments, item.quota, true)[1]
          }
          this.$exportCsv(response, `Users Report ${this.$moment().format('YYYY-MM-DD')}`, this.exportCol)
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
#cms-users-list {
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
