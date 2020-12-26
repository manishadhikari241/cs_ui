<template>
  <div class="page lists">
    <PageInfo :slug="'lists'" :button="$t('create_new_list')" :buttonId="'create-list-btn'" />
    <br>
    <b-table :items="init.lists" :fields="fields" :responsive="'md'" striped hover :busy="init.lists === undefined" @row-clicked="onRowClick" show-empty>
      <template v-slot:table-busy>
        <div class="text-center">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </template>
      <template v-slot:empty="scope">
        <div class="text-center">{{$t('empty_table')}}</div>
      </template>

      <template v-slot:cell(name)="data">
        <div :class="`list-preview${data.item.products.length >= 3 ? ' pieces-3' : (data.item.products.length >= 2 ? ' pieces-2' : ' pieces-1')}`">
          <img v-for="design in getRandomDesigns(data.item)" :key="design.id" :src="`${serverURL}/api/v1/image/thumbnail/design/${design.code}/tiny`">
        </div>
        <span class="md-hide">{{ data.item.name }}</span>
      </template>
      <template v-slot:cell(nitems)="data">
        <div class="md-hide">{{ data.item.products.length }}</div>
        <div class="md-show">
          <p>{{ data.item.name }}</p>
          <p>ITEMS: {{ data.item.products.length }}</p>
          <p>{{ $moment(data.item.created_at).format('DD/MM/YYYY') }}</p>
        </div>
      </template>
      <template v-slot:cell(created)="data">
        {{ $moment(data.item.created_at).format('DD/MM/YYYY') }}
      </template>
      <template v-slot:cell(actions)="data">
        <nuxt-link :to="localePath(`/lists/${data.item.id}`)" class="btn-view">{{ $t('view') }}</nuxt-link>
        <b-button class="btn-delete" @click="confirmDelete(data.item.id)">
          <b-icon-x v-show="!deleting"></b-icon-x>
          <b-spinner small type="grow" v-show="deleting && selectedList == data.item.id"></b-spinner>
        </b-button>
      </template>
    </b-table>

    <b-popover
      ref="createListPopover"
      :target="'create-list-btn'"
      triggers="click blur"
      placement="auto"
      custom-class="create-list-popover"
      >
      <div>
        <form @submit.prevent="createList">
          <b-input-group size="sm">
            <b-form-input spellcheck="false" autocomplete="off" v-model="newListName"></b-form-input>
            <b-input-group-append>
              <b-button type="submit" size="sm" variant="secondary" class="create-btn">{{ $t('create') }}</b-button>
            </b-input-group-append>
          </b-input-group>
        </form>
      </div>
    </b-popover>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PageInfo from "~/components/pageinfo";
import { BIconX } from "bootstrap-vue";

export default {
  middleware: "auth",
  components: {
    PageInfo,
    BIconX
  },
  asyncData(context) {
    return context.$axios.get("/pages/lists").then(res => {
      return { pageData: res.data };
    });
  },
  head() {
    return {
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.pageData.translations[this.$i18n.locale]
            .meta_description
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.pageData.translations[this.$i18n.locale].meta_keywords
        }
      ]
    };
  },
  computed: {
    ...mapState("app", ["init"])
  },
  data() {
    return {
      serverURL: process.env.NUXT_ENV_SERVER,
      fields: [
        {
          key: "name",
          label: this.$t("name_of_lists")
        },
        {
          key: "nitems",
          label: this.$t("items")
        },
        {
          key: "created",
          label: this.$t("created")
        },
        {
          key: "actions",
          label: ""
        }
      ],
      selectedList: null,
      deleting: false,
      newListName: "",
      creating: false
    };
  },
  methods: {
    getRandomDesigns(list) {
      if (!list.products.length) return [];
      let max = 1;
      if (list.products.length >= 3) max = 3;
      else if (list.products.length >= 2) max = 2;
      let designs = [];
      for (let i = 0; i < max; i++) designs.push(list.products[i]);
      return designs;
    },

    onRowClick(item) {
      this.$router.push(`/lists/${item.id}`);
    },

    selectList(id) {
      this.selectedList = id;
    },

    confirmDelete(id) {
      this.selectList(id);
      this.$bvModal
        .msgBoxConfirm(this.$t("are_you_sure"), {
          centered: true,
          bodyClass: "confirm-box-body-confirm",
          footerClass: "confirm-box-footer-confirm",
          okTitle: this.$t('btn_yes'),
          cancelTitle: this.$t('btn_no')
        })
        .then(value => {
          if (value) this.deleteList();
        });
    },

    deleteList() {
      this.deleting = true;
      this.$axios.$delete(`/list/${this.selectedList}`).then(response => {
        for (let i = 0; i < this.init.lists.length; i++) {
          if (this.init.lists[i].id == this.selectedList)
            this.$store.commit("app/deleteList", { index: i });
        }
        this.deleting = false;
        this.selectList(null);
      });
    },

    createList() {
      this.creating = true;
      this.$axios.$post("/list", { name: this.newListName }).then(response => {
        this.creating = false;
        this.newListName = "";
        let exists = false;
        this.init.lists.forEach(list => {
          if (list.id == response.id) exists = true;
        });
        if (!exists) this.$store.commit("app/addList", response);
        this.$refs.createListPopover.$emit("close");
      });
    }
  }
};
</script>

<style lang="scss">
.page.lists {
  tr {
    cursor: pointer;
    outline: none;
  }

  .list-preview {
    width: 100px;
    height: 100px;
    display: inline-block;
    overflow: hidden;
    background: #444 url("~@/assets/placeholder.jpg") no-repeat center;
    vertical-align: middle;
    margin-right: 10px;

    &.pieces-1 {
      img {
        width: 100%;
        height: 100%;
      }
    }

    &.pieces-2 {
      img {
        float: left;

        &:first-child {
          width: 100%;
          height: 100%;
          margin-left: -50%;
        }

        &:nth-child(2) {
          width: 100%;
          height: 100%;
          margin-right: -50%;
        }
      }
    }

    &.pieces-3 {
      img {
        float: left;

        &:first-child {
          width: 100%;
          height: 100%;
          margin-left: -50%;
        }

        &:nth-child(2) {
          width: 50%;
          height: 50%;
        }

        &:nth-child(3) {
          width: 50%;
          height: 50%;
        }
      }
    }
  }

  .table th,
  .table td {
    vertical-align: middle;
  }

  .btn-view {
    display: inline-block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    background-color: $black;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
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

@media screen and (max-width: 767px) {
  .page.lists {
    th[aria-colindex="3"],
    td[aria-colindex="3"],
    .btn-view {
      display: none;
    }
  }
}

.create-list-popover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);

  form {
    input {
      outline: none !important;
      box-shadow: none !important;
    }
  }

  .create-btn {
    background-color: $black;
  }
}
</style>