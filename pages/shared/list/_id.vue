<template>
  <div class="page shared-list">
    <div style="text-align: center" v-if="!list">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
    <div v-if="list">
      <b-container class="list-header">
        <h3>{{ list.name }} ({{ length }})</h3>
        <div class="actions">
          <b-button size="sm" @click="saveList.visible = true" class="btn-save ignorePrint" v-if="!saveList.visible">
            {{ $t('save_to_my_list') }} <i class="far fa-copy"></i>
          </b-button>
          <div v-else>
            <form @submit.prevent="copyList">
              <div class="saveListForm">
                <!-- <label>{{ $t('name_a_new_list') }}</label> -->
                <b-input-group class="mt-3">
                  <b-form-input required :placeholder="$t('name_a_new_list')" v-model="saveList.name"></b-form-input>
                  <b-input-group-append>
                    <b-button class="btn-submit" type="submit" :disabled="saveList.loading">{{$t('submit')}}</b-button>
                    <!-- <b-button class="btn-cancel" type="button" @click="saveList.visible = false" :disabled="saveList.loading">Cancel</b-button> -->
                  </b-input-group-append>
                </b-input-group>
              </div>
            </form>
          </div>

          <b-button size="sm" @click="print" class="btn-print ignorePrint"  v-if="!saveList.visible">
            {{ $t('print') }} <img src="~/assets/icons/print_black.png" style="height:auto; width:20px"/>
          </b-button>
        </div>
      </b-container>

      <hr>

      <b-container class="designs">
        <div>
          <DesignList :designs="list.products"/>
        </div>
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
      length: '',
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
      ],
      saveList: {
        visible: false,
        name: '',
        loading: false
      }
    }
  },
  methods: {
    load () {
      this.$axios.$get(`/list/view/${this.$route.params.id}?scope[]=products.designer.profile&scope[]=user`)
        .then((response) => {
          this.list = response;
          this.length = response.products.length;
          // this.saveList.name = this.list.name;
        })
    },

    print() {
      if (process.client) {
          window.print();
      }
    },

    copyList() {
      this.saveList.loading = true;
      this.$axios.$post(`/list/${this.list.id}/copy`, { name: this.saveList.name })
        .then((response) => {
          this.saveList.loading = false;
          this.$toast.success(this.$t('new_list_saved'));
          this.$store.commit('app/addList', response);
          this.$router.push(this.localePath(`/lists/${response.id}`));
        }).catch(error => {
          this.saveList.loading = false;
          if (error.response.data.error.code==4003) {
this.$toast.error('required');
          }
          else this.$toast.error(this.$t('list_name_already'));

        });
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
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        &.btn-print, &.btn-save {
          outline: none;
          box-shadow: none;
          border: none;
          background: none;
          color: $black;
          padding: 0;
          font-size: 20px;
          margin-left: 5px;
          opacity: 0.5;
          font-size: 16px;
          opacity: 1;
          border: 1px solid $black;
          border-radius: 30px;
          padding: 2px 15px;
          font-weight: 700;
          @media screen and (max-width: 768px) {
              font-size: 14px;

          }
        }
      }

      .saveListForm {
        display: flex;
        align-items: center;
        justify-content: center;

        label {
          font-size: 14px;
          color: $black;
          margin-right: 10px;
          white-space: nowrap;
          position: relative;
          bottom: -10px;
        }

        input {
          width: 200px;
          font-size: 16px;
        }

        .btn-submit {
          background: $black;
          color: #fff;
        }

        .btn-cancel {
          background: #fff;
          color: $black;
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
