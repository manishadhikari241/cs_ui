<template>
  <div class="component wechat">
    <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${source.wechat.qr_code_url}`" v-if="source">
  </div>
</template>

<script>
export default {
    props: ['info'],
    components: {
        
    },
    data() {
        return {
            source: null
        }
    },
    methods: {
        prepare() {
            this.$stripe.createSource({
                type: 'wechat',
                amount: this.info.price,
                currency: 'usd',
                statement_descriptor: this.info.pkg,
                owner: {
                    name: 'Collectionstock',
                }
            }).then((result) => {
                this.source = result.source;
                this.save();
            });
        },

        save() {
            this.$axios.$post('/payments/wechat/token', {
                amount: this.info.price,
                package: this.info.pkg,
                package_type: this.info.package_type,
                billing_details: this.info.billingDetails,
                vat_number: this.info.vatNumber,
                source_id: this.source.id
            }).then((response) => {
                console.log(response);
            });
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.prepare();
        });
    }
}
</script>

<style lang="scss">
.component.wechat {
    margin-top: 30px;
}
</style>