<template>
  <div class="cmscomponent item create coupon">
    <div class="title">
      <span><i class="fas fa-plus"></i>&nbsp;&nbsp;Add new coupon</span>
      <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
    </div>
    <hr>
    <form @submit.prevent="create">
			<div class="item-content">
				<div class="item-row">
					<div class="prop">Package</div>
					<div class="value">
						<b-form-select v-model="item.package" :options="packages" name="package" required></b-form-select>
					</div>
				</div>
        <div class="item-row">
					<div class="prop">Code</div>
					<div class="value">
						<b-input type="text" name="code" v-model="item.code" placeholder="Leave empty to auto generate"></b-input>
					</div>
				</div>
				<div class="item-row">
					<div class="prop">{{ item.package == 'discount' ? 'Amount' : 'Quantity' }}</div>
					<div class="value">
						<b-input-group :prepend="item.package == 'discount' ? '$' : ''">
							<b-input type="text" name="quantity" v-model="item.quantity" required></b-input>
						</b-input-group>
					</div>
				</div>
				<div class="item-row">
					<div class="prop">Multi Usage</div>
					<div class="value">
						<b-form-checkbox name="multi" v-model="item.multi"></b-form-checkbox>
					</div>
				</div>
				<div class="item-row" v-show="item.multi">
					<div class="prop">Start Date</div>
					<div class="value">
						<b-form-datepicker size="sm" placeholder="Start Date" v-model="item.start_date" ></b-form-datepicker>
					</div>
				</div>
				<div class="item-row" v-show="item.multi">
					<div class="prop">End Date</div>
					<div class="value">
						<b-form-datepicker size="sm" placeholder="End Date" v-model="item.end_date" ></b-form-datepicker>
					</div>
				</div>
			</div>
      <div class="item-actions">
        <b-button variant="primary" type="submit" :disabled="loading"><i class="fas fa-plus"></i>&nbsp;&nbsp;Create</b-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
			packages: [
        { value: 'standard', text: 'Standard' },
        { value: 'extended', text: 'Extended' },
        { value: 'simulator', text: 'Simulator' },
				{ value: 'exclusive', text: 'Exclusive' },
        { value: 'discount', text: 'Discount' }
      ],
      loading: false,
      item: {
        package: 'standard',
        code: '',
				quantity: '',
				multi: false,
				start_date: this.$moment().format('YYYY-MM-DD'),
				end_date: this.$moment().format('YYYY-MM-DD')
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('updated', {clearItemFrame: true});
    },

    create() {
      this.loading = true;
      this.$axios.$post('/cms/coupons', this.item)
        .then((response) => {
          this.loading = false;
          this.$toast.success('Coupon created successfully');
          this.cancel();
        }).catch((error) => {
          this.loading = false;
          this.$toast.error(error.response.data.error.message);
        });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>