<template>
  <div class="cmspage pricing">
    <div class="contentframe">
      <div class="menuframe" style="width: 100%">
        <div class="title">
          <span><i class="fas fa-money-check-alt"></i>&nbsp;&nbsp;Pricing</span>
        </div>
        <hr>
        <div class="itemframe" v-if="pricing" style="width: 100%; border-left: none;">
          <div class="cmscomponent item">
            <form @submit.prevent="update">
              <div class="item-content">
                <b-row class="item-row">
                  <b-col>
                    <div class="prop">Standard Min Count</div>
                    <div class="value">
                      <b-input type="text" v-model="pricing.standard_min_count" required></b-input>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="prop">Standard Min Price</div>
                    <div class="value price">
                      <b-input type="text" v-model="pricing.standard_min_price" required></b-input>
                      <i class="fas fa-dollar-sign"></i>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="prop">Standard Max Count</div>
                    <div class="value">
                      <b-input type="text" v-model="pricing.standard_max_count" required></b-input>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="prop">Standard Max Price</div>
                    <div class="value price">
                      <b-input type="text" v-model="pricing.standard_max_price" required></b-input>
                      <i class="fas fa-dollar-sign"></i>
                    </div>
                  </b-col>
                </b-row>
                <b-row class="item-row">
                  <b-col>
                    <div class="prop">Extended Min Count</div>
                    <div class="value">
                      <b-input type="text" v-model="pricing.extended_min_count" required></b-input>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="prop">Extended Min Price</div>
                    <div class="value price">
                      <b-input type="text" v-model="pricing.extended_min_price" required></b-input>
                      <i class="fas fa-dollar-sign"></i>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="prop">Extended Max Count</div>
                    <div class="value">
                      <b-input type="text" v-model="pricing.extended_max_count" required></b-input>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="prop">Extended Max Price</div>
                    <div class="value price">
                      <b-input type="text" v-model="pricing.extended_max_price" required></b-input>
                      <i class="fas fa-dollar-sign"></i>
                    </div>
                  </b-col>
                </b-row>
                <b-row class="item-row">
                  <b-col>
                    <div class="prop">Exclusive Min Count</div>
                    <div class="value">
                      <b-input type="text" v-model="pricing.exclusive_min_count" required></b-input>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="prop">Exclusive Min Price</div>
                    <div class="value price">
                      <b-input type="text" v-model="pricing.exclusive_min_price" required></b-input>
                      <i class="fas fa-dollar-sign"></i>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="prop">Exclusive Max Count</div>
                    <div class="value">
                      <b-input type="text" v-model="pricing.exclusive_max_count" required></b-input>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="prop">Exclusive Max Price</div>
                    <div class="value price">
                      <b-input type="text" v-model="pricing.exclusive_max_price" required></b-input>
                      <i class="fas fa-dollar-sign"></i>
                    </div>
                  </b-col>
                </b-row>
                <b-row class="item-row">
                  <b-col>
                    <div class="prop">Simulator Min Count</div>
                    <div class="value">
                      <b-input type="text" v-model="pricing.simulator_min_count" required></b-input>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="prop">Simulator Min Price</div>
                    <div class="value price">
                      <b-input type="text" v-model="pricing.simulator_min_price" required></b-input>
                      <i class="fas fa-dollar-sign"></i>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="prop">Simulator Max Count</div>
                    <div class="value">
                      <b-input type="text" v-model="pricing.simulator_max_count" required></b-input>
                    </div>
                  </b-col>
                  <b-col>
                    <div class="prop">Simulator Max Price</div>
                    <div class="value price">
                      <b-input type="text" v-model="pricing.simulator_max_price" required></b-input>
                      <i class="fas fa-dollar-sign"></i>
                    </div>
                  </b-col>
                </b-row>
              </div>
              <div class="item-actions">
                <b-button variant="primary" type="submit" :disabled="loading"><i class="far fa-edit"></i>&nbsp;&nbsp;Update</b-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'cmsuser',
  layout: 'cms',
  data() {
    return {
      pricing: null,
      loading: false
    }
  },
  methods: {
    load() {
      this.$axios.$get('/cms/pricing')
        .then((response) => {
          this.pricing = response;
        })
    },

    update() {
      this.loading = true;
      this.$axios.$patch('/cms/pricing', this.pricing)
        .then((response) => {
          this.loading = false;
          this.$toast.success('Pricing updated successfully');
        })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    });
  }
}
</script>

<style lang="scss" scoped>
.cmspage.pricing {
  .value.price {
    position: relative;
    
    .fa-dollar-sign {
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 14px;
      color: $black;
    }
  }
}
</style>