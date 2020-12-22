<template>
  <div class="page shared-list">
    <div style="text-align: center" v-if="!list">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
    <div v-if="list">
      <b-container class="list-header">
        <h3>{{ list.name }} ({{ length }})</h3>
        <!-- <div class="actions">
          <b-button :class="{'active': mode === 'grid'}" @click="changeMode('grid')">
            <b-icon-grid-fill></b-icon-grid-fill>
          </b-button>
          <b-button :class="{'active': mode === 'table'}" @click="changeMode('table')">
            <b-icon-list-task></b-icon-list-task>
          </b-button>
        </div> -->
      </b-container>

      <hr>

      <b-container class="designs">
        <div v-if="mode == 'grid'">
          <DesignList :designs="list.products"/>
        </div>

        <!-- <div v-if="mode == 'table'">
          <b-table :items="list.products" :fields="fields" :responsive="'md'" striped>
            <template v-slot:cell(design)="data">
              <img class="design-preview"
                   :src="`https://dev.collectionstock.com/api/v1/image/thumbnail/design/${data.item.code}/tiny`">
            </template>
          </b-table>
        </div> -->
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DesignTile from '~/components/designtile'
import DesignList from '~/components/designlist'
import {
  BIconGridFill,
  BIconListTask,
  BIconX,
  BIconChevronDown,
  BIconChevronUp,
  BIconEyeFill,
  BIconClipboard
} from 'bootstrap-vue'

export default {
  middleware: 'auth',
  components: {
    DesignTile,
    DesignList,
    BIconGridFill,
    BIconListTask,
    BIconX,
    BIconChevronDown,
    BIconChevronUp,
    BIconEyeFill,
    BIconClipboard
  },
  asyncData (context) {
    return context.$axios.get('/pages/lists')
      .then((res) => {
        return { pageData: res.data }
      })
  },
  head () {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageData.translations[this.$i18n.locale].meta_description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.pageData.translations[this.$i18n.locale].meta_keywords
        },
      ]
    }
  },
  data () {
    return {
      list: null,
      length:'',
      mode: 'grid',
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
        }
      ]
    }
  },
  methods: {
    load () {
      this.$axios.$get(`/list/view/${this.$route.params.id}?scope[]=products.designer.profile&scope[]=user`)
        .then((response) => {
          console.log(response)
      
          this.list = response;
          this.length= response.products.length;
        })
    },

    changeMode (mode) {
      this.mode = mode
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.load()
    })
  }
}
</script>

<style lang="scss">
.page.shared-list {
  .container {
    max-width: 100% !important;
  }

  .list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .actions {
      button {
        outline: none;
        box-shadow: none;
        border: none;
        background: none;
        color: $black;
        padding: 0;
        font-size: 20px;
        margin-left: 5px;
        opacity: 0.5;

        &.active {
          opacity: 1;
        }
      }
    }
  }

  .designs {
    .table th,
    .table td {
      vertical-align: middle;
    }

    table {
      .design-preview {
        width: 100px;
        height: 100px;
      }

      .btn-delete {
        width: 30px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        background-color: $black;
        border-radius: 50%;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        padding: 0;
      }
    }
  }
}
</style>
