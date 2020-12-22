<template>
  <div class="component listPopover">
    <div class="list-popover" v-if="$auth.loggedIn">
      <b-popover
        :target="target"
        triggers="click blur"
        placement="auto"
        custom-class="design-list-popover"
      >
        <template v-slot:title>
          <b-button class="close" aria-label="Close">
            <span class="d-inline-block" aria-hidden="true">&times;</span>
          </b-button>
          {{ $t('add_to_list') }}
        </template>

        <div>
          <div class="list-row">
            <div class="destination">
              <form @submit.prevent="createList">
                <b-input :placeholder="$t('name_a_new_list')" autocomplete="off" v-model="newListName" :disabled="creatingList" required></b-input>
              </form>
            </div>
            <div class="action">
              <div @click="createList" :disabled="!newListName" v-show="!creatingList"><b-icon-plus></b-icon-plus></div>
              <b-spinner small label="Small Spinner" v-show="creatingList"></b-spinner>
            </div>
          </div>
          <div :class="`list-row existing${listHasDesign(list) ? ' hasDesign' : ''}`" v-for="list in init.lists" :key="list.id" @click="toggleDesign(list)">
            <div class="destination">
              <span>{{ list.name }}</span>
            </div>
            <div class="action">
              <div v-show="addingToList != list.id && !listHasDesign(list)"><b-icon-check></b-icon-check></div>
              <div v-show="addingToList != list.id && listHasDesign(list)"><strong><b-icon-check-circle></b-icon-check-circle></strong></div>
              <b-spinner small label="Small Spinner" v-show="addingToList == list.id"></b-spinner>
            </div>
          </div>
        </div>
      </b-popover>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BIconCheck, BIconDownload, BIconPlus, BIconCheckCircle } from 'bootstrap-vue';

export default {
  props: [
    'design',
    'target'
  ],
  components: {
    BIconCheck,
    BIconDownload,
    BIconPlus,
    BIconCheckCircle
  },
  computed: {
    ...mapState('app', ['init'])
  },
  data() {
    return {
      newListName: '',
      creatingList: false,
      addingToList: -1,
    }
  },
  methods: {
    createList() {

      this.$axios.$post('/list', { name: this.newListName })
        .then((response) => {
          this.creatingList = false;
          this.newListName = '';

          let exists = false;
          this.init.lists.forEach(list => {
            if (list.id == response.id)
              exists = true;
          });

          if (!exists) {
            this.$store.commit('app/addList', response);
            this.addToList(response.id);
          }
        }).catch((error) => {
          this.creatingList = false;
          this.$toast.error(error.response.data.error.message);
        });
    },

    addToList(listId) {
      if (this.addingToList == -1) {
        this.addingToList = listId;
        this.$axios.$post(`/list/${listId}`, { design_id: this.design.id })
          .then((response) => {
            this.addingToList = -1;

            for (let i = 0; i < this.init.lists.length; i++) {
              if (this.init.lists[i].id == response.id)
              this.$store.commit('app/replaceList', { index: i, list: response });
            }
          })
      }
    },

    listHasDesign(list) {
      let exists = false;
      list.products.forEach(product => {
        if (product.id == this.design.id)
          exists = true;
      });
      return exists;
    },

    removeFromList(listId) {
      if (this.addingToList == -1) {
        this.addingToList = listId;
        this.$axios.$delete(`/list/${listId}/design/${this.design.id}`)
          .then((response) => {
            this.addingToList = -1;

            for (let i = 0; i < this.init.lists.length; i++) {
              if (this.init.lists[i].id == response.id)
              this.$store.commit('app/replaceList', { index: i, list: response });
            }
          })
      }
    },

    toggleDesign(list) {
      if (this.listHasDesign(list))
        this.removeFromList(list.id);
      else
        this.addToList(list.id);
    }
  }
}
</script>

<style lang="scss">
.design-list-popover {
  max-width: 500px !important;
  width: 400px;
  border: 1px solid #000;
  box-shadow: 0 0 15px rgba(0, 0, 0, .7);

  .popover-header {
    padding-top: 15px;
    padding-left: 25px;
    background: #fff;
    border-bottom: none;
    color: #000;
    font-weight: 600;
    font-size: 20px;

    .close {
      display: none;
    }
  }

  .popover-body {
    .list-row {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      cursor: pointer;
      
      .destination {
        flex-grow: 1;
        padding-right: 10px;

        input {
          outline: none;
          box-shadow: none;
        }

        span {
          padding-left: 15px;
          font-size: 18px;
          color: #000;
        }
      }

      .action {
        & > div, & > button {
          border: none;
          background: transparent;
          padding: 0;
          font-size: 25px;
          color: rgba(0, 0, 0, .5);
          transition: color .2s;

          &:hover {
            color: rgba(0, 0, 0, 1);
          }
        }
      }

      &.existing:hover, &.hasDesign {
        span {
          font-weight: 600;
        }

        .action {
          button {
            color: rgba(0, 0, 0, 1);
          }

          strong {
            color: rgba(0, 0, 0, 1);
          }
        }
      }
    }
  }
}
</style>