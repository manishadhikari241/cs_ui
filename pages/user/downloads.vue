<template>
  <div class="page downloads">
    <b-container>
      <div class="component pageinfo">
        <div class="pageinfo-head">
          <h1 class="pageinfo-title">{{ $t('downloads') }}</h1>
        </div>
        <p class="pageinfo-description">{{ $t('all_designs_you_downloaded') }}</p>
      </div>
    </b-container>
    <b-container class="downloads-header">
      <!-- <div class="actions">
        <b-button :class="{'active': mode === 'grid'}" @click="changeMode('grid')">
          <b-icon-grid-fill></b-icon-grid-fill>
        </b-button>
        <b-button :class="{'active': mode === 'table'}" @click="changeMode('table')">
          <b-icon-list-task></b-icon-list-task>
        </b-button>
      </div> -->
      <div class="actions">
        <div class="types">
          <b-button :class="{'active': type === 'all'}" @click="changeType('all')">{{ $t('all') }}</b-button>
          <span class="separator">|</span>
          <b-button :class="{'active': type === 'standard'}" @click="changeType('standard')">{{ $t('standard') }}</b-button>
          <span class="separator">|</span>
          <b-button :class="{'active': type === 'extended'}" @click="changeType('extended')">{{ $t('extended') }}</b-button>
          <span class="separator">|</span>
          <b-button :class="{'active': type === 'exclusive'}" @click="changeType('exclusive')">{{ $t('exclusive') }}</b-button>
        </div>
      </div>
    </b-container>
    <b-container class="designs">
      <client-only>
        <DesignList :designs="designs" v-if="mode == 'grid'" />
        <b-table :items="designs" :fields="fields" :responsive="'md'" striped v-if="mode == 'table'">
          <template v-slot:cell(design)="data">
            <img class="design-preview" :src="`https://dev.collectionstock.com/api/v1/image/thumbnail/design/${data.item.code}/tiny`">
          </template>
        </b-table>
        <infinite-loading @infinite="loadMore" ref="infload"></infinite-loading>
      </client-only>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PageInfo from '~/components/pageinfo'
import DesignList from '~/components/designlist';
import { BIconGridFill, BIconListTask, BIconX, BIconChevronDown, BIconChevronUp, BIconEyeFill, BIconClipboard } from 'bootstrap-vue';

export default {
  middleware: 'auth',
  components: {
    PageInfo,
    DesignList,
    BIconGridFill,
    BIconListTask,
    BIconX,
    BIconChevronDown,
    BIconChevronUp,
    BIconEyeFill,
    BIconClipboard
  },
  computed: {
    ...mapState('app', ['init'])
  },
  data() {
    return {
      list: null,
      mode: 'grid',
      type: 'all',
      fields: [
        {
          key: 'design',
          label: 'ITEMS'
        },
        {
          key: 'code',
          label: 'CS CODE'
        },
        {
          key: 'designer_id',
          label: 'CREATOR'
        },
        {
          key: 'actions',
          label: ''
        },
      ],
      itemsPerPage: 20,
      page: 0,
      maxPage: 100,
      total: 0,
      data: [],
      designs: []
    }
  },
  methods: {
    loadMore() {
      this.$axios.$get(`/downloads?scope[]=designer.profile&scope[]=studio&recent=1&is_active=1&take=${this.itemsPerPage}&page=${this.page+1}&package=${this.type}`)
        .then((response) => {
          this.page = response.current_page;
          this.maxPage = response.last_page;
          this.total = response.total;
          this.data.push(...response.data);

          let designs = [];
          response.data.forEach(element => {
            designs.push(element.design);
          });
          this.designs.push(...designs);

          this.$refs.infload.stateChanger.loaded();
          if (this.page >= this.maxPage)
            this.$refs.infload.stateChanger.complete();
        })
    },

    changeMode(mode) {
      this.mode = mode;
    },

    changeType(type) {
      if (type !== this.type) {
        this.type = type;
        this.page = 0;
        this.data = [];
        this.designs = [];
        this.$refs.infload.stateChanger.reset();
      }
    }
  }
}
</script>

<style lang="scss">
.page.downloads {
  .container {
    max-width: 100% !important;
  }

  .downloads-header {
    margin: 10px 0;
    .actions {
      text-align: right;

      button {
        outline: none;
        box-shadow: none;
        border: none;
        background: none;
        color: $black;
        padding: 0;
        font-size: 20px;
        margin-left: 5px;
        border-radius: 0;

        &:focus {
          outline: none;
          box-shadow: none;
          border: none;
        }

        &.active {
          font-weight: 700;
          border-bottom: 1px solid $black;
        }
      }
    }
  }

  .designs {
    .table th, .table td {
      vertical-align: middle;
    }

    table {
      .design-preview {
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>