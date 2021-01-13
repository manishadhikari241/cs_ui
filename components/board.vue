<template>
    <div class="component board">
        <div ref="boardContainer" class="board-container">
            <div class="header">
                <div class="editable">
                    <div ref="headerTitle" class="title" :contenteditable="true">{{$t('my_board')}}</div>
                    <button @click="focusHeaderTitle"><i class="fas fa-pencil-alt"></i></button>
                </div>
            </div>
            <div class="items">
                <b-row cols="1" cols-sm="3">
                    <b-col v-for="(data, $index) in items" :key="`board_item_${$index}`">
                        <div class="item">
                            <div class="image-container">
                                <img :src="data.url">
                                <div class="actions">
                                    <button @click="focusItemTitle($index)"><i class="fas fa-pencil-alt"></i></button>
                                    <button @click="removeItem($index)"><i class="fas fa-times-circle"></i></button>
                                </div>
                            </div>
                            <b-input :ref="`itemTitle${$index}`" class="title" v-model="data.title"></b-input>
                        </div>
                    </b-col>
                </b-row>
            </div>
            <div class="footer">
                <img :src="logo">
            </div>
        </div>

        <div class="board-actions">
            <div class="board">
                <b-col class="button-col">
                    <b-button @click="saveBoard" class="btn-save-board" :disabled="!items.length">
                        <i class="far fa-save"></i>&nbsp;&nbsp;{{$t('save_board')}}
                    </b-button>
                </b-col>
                <b-col class="button-col">
                    <b-button @click="resetBoard" class="btn-reset-board" :disabled="!items.length">
                        <i class="far fa-save"></i>&nbsp;&nbsp;{{$t('reset_board')}}
                    </b-button>
                </b-col>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      boardTitle: "",
      logo: require("~/assets/logo.png")
    };
  },
  methods: {
    focusHeaderTitle() {
      setTimeout(() => {
        this.$refs.headerTitle.focus();
      }, 0);
    },

    focusItemTitle(index) {
      setTimeout(() => {
        var ref = `itemTitle${index}`;
        this.$refs[ref][0].focus();
      }, 0);
    },

    onTitleInput($event, data) {
      data.title = $event.target.innerText;
    },

    removeItem(index) {
      this.items.splice(index, 1);
    },

    async addItem(container) {
      this.$nextTick(async () => {
        if (!container) return false;
        const options = {
          type: "dataURL",
          windowWidth: 1200,
          windowHeight: 900
        };
        let data = {title: ''};
        data.url = await this.$html2canvas(container, options);
        this.items.push(data);
      });
    },

    async saveBoard() {
      const el = this.$refs.boardContainer;
      const options = {
        type: "dataURL",
        windowWidth: 1200,
        windowHeight: 900
      };
      let data = await this.$html2canvas(el, options);

      var a = document.createElement("a");
      a.href = data;
      a.download = "Collectionstock_SimulationBoard.png";
      a.click();
    },

    resetBoard() {
      this.items = [];
      this.$refs.headerTitle.textContent = "My Board";
    }
  }
};
</script>

<style lang="scss" scoped>
.component.board {
  .board-container {
    // min-height: 400px;
    border: 5px solid $black;
    border-radius: 10px;
    padding: 20px;

    .footer {
      text-align: right;

      img {
        height: 70px;
        @media screen and (max-width: 768px) {
          height: 55px;
        }
      }
    }

    .editable {
      display: flex;
      align-items: center;
      justify-content: center;

      div {
        font-size: 25px;
        font-weight: 700;
        height: 35px;
        min-width: 50px;
        @media screen and (max-width: 768px) {
          font-size: 20px;
        }
      }

      span:focus {
        outline: 1px solid $brand;
      }

      button {
        background: none;
        border: none;
        padding: 0;
        margin-left: 10px;
        outline: none;
        font-size: 25px;
        font-weight: 700;
        @media screen and (max-width: 768px) {
          font-size: 20px;
        }
      }
    }

    .items {
      margin-top: 30px;

      .item {
        margin-bottom: 20px;

        &:hover {
          .image-container .actions {
            display: block;
          }
        }

        .image-container {
          margin-bottom: 10px;

          img {
            width: 100%;
          }

          .actions {
            position: absolute;
            top: -40px;
            right: 0;
            display: flex;
            margin-right: 20px;
            margin-top: 5px;
            display: none;

            button {
              background: none;
              border: none;
              padding: 0;
              margin-left: 10px;
              outline: none;
              font-size: 25px;
            }
          }
        }

        .title {
          font-size: 20px;
          font-weight: 600;
          height: 30px;
          text-align: center;
          border: none;
          background: transparent;
          box-shadow: none;
          outline: none;
        }
      }
    }
  }

  .board-actions {
    .board {
        display: flex;
        justify-content: center;
        align-items: center;
      @media screen and (max-width: 767px) {
        display: block !important;
        button{
                    margin-bottom: 10px;
        }
      }
    }
    margin-top: 30px;

    .button-col {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    button {
      border: 1px solid $black;
      border-radius: 30px;
      font-size: 16px;
      font-weight: 700;
      padding: 8px 20px;
      text-transform: uppercase;
      transition: all 0.2s;
      @media screen and (max-width: 768px) {
        font-size: 14px;
      }

      &:active {
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
      }

      &.btn-save-board {
        background: $brand;
        color: #fff;
        border: none;
        outline: none;
      }

      &.btn-reset-board {
        background: $black;
        color: #fff;
        border: none;
        outline: none;
      }
    }
  }
}
</style>