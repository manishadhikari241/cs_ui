(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{1168:function(o,n,t){"use strict";t.r(n);var e=t(495),r=t(496),d={components:{LegalMenu:e.a,Legal:r.a},asyncData:function(o){return o.$axios.get("/pages/design-request-terms-and-conditions").then((function(o){return{pageData:o.data}}))},head:function(){return{meta:[{hid:"description",name:"description",content:this.pageData.translations[this.$i18n.locale].meta_description},{hid:"keywords",name:"keywords",content:this.pageData.translations[this.$i18n.locale].meta_keywords}]}}},c=(t(844),t(20)),component=Object(c.a)(d,(function(){var o=this.$createElement,n=this._self._c||o;return n("div",{staticClass:"page legal design-request-terms-and-conditions"},[n("b-container",[n("b-row",[n("b-col",{attrs:{md:"4"}},[n("LegalMenu")],1),this._v(" "),n("b-col",{attrs:{md:"8"}},[n("Legal",{attrs:{slug:"design-request-terms-and-conditions"}})],1)],1)],1)],1)}),[],!1,null,null,null);n.default=component.exports},480:function(o,n,t){var content=t(490);"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,t(25).default)("98cab030",content,!0,{sourceMap:!1})},489:function(o,n,t){"use strict";t(480)},490:function(o,n,t){(n=t(24)(!1)).push([o.i,".nav-tabs .nav-link[data-v-7b64ddac]{color:#495057;outline:none;border:none;padding:6px 0 0;font-size:25px;margin-right:16px}@media screen and (max-width:768px){.nav-tabs .nav-link[data-v-7b64ddac]{font-size:14px}}.nav-tabs[data-v-7b64ddac]{border:none}.nav-tabs .nav-item.show .nav-link[data-v-7b64ddac],.nav-tabs .nav-link.active[data-v-7b64ddac]{color:#000;outline:none;font-weight:600;background-color:#fff;border-color:#dee2e6 #dee2e6 #fff;font-size:25px;padding:6px 0 0;margin-right:20px}@media screen and (max-width:768px){.nav-tabs .nav-item.show .nav-link[data-v-7b64ddac],.nav-tabs .nav-link.active[data-v-7b64ddac]{font-size:14px}}.modal-dialog .confirm-box-body[data-v-7b64ddac]{text-align:center}.modal-dialog .confirm-box-header-confirm[data-v-7b64ddac]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm[data-v-7b64ddac]{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm[data-v-7b64ddac]{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-7b64ddac]{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-7b64ddac]{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-7b64ddac]{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-7b64ddac]{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer[data-v-7b64ddac]{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button[data-v-7b64ddac]{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary[data-v-7b64ddac]{opacity:.5}.modal-content[data-v-7b64ddac]{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header[data-v-7b64ddac]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button[data-v-7b64ddac]{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button[data-v-7b64ddac],.modal-content .white-button[data-v-7b64ddac]{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button[data-v-7b64ddac]{color:#fff;background-color:#363636}.component.legal-menu[data-v-7b64ddac]{background:#363636;padding:10px 0;border-radius:4px}.component.legal-menu section.header[data-v-7b64ddac]{display:flex;align-items:center;justify-content:space-between;padding:10px 20px;color:#fff;font-size:16px;font-weight:700}.component.legal-menu a[data-v-7b64ddac]{display:block;padding:10px 20px;color:#fff;font-size:16px;text-decoration:none}.component.legal-menu a.nuxt-link-active[data-v-7b64ddac]{color:#363636;background-color:#fff}",""]),o.exports=n},495:function(o,n,t){"use strict";var e={components:{BIconChevronDown:t(0).eh}},r=(t(489),t(20)),component=Object(r.a)(e,(function(){var o=this,n=o.$createElement,t=o._self._c||n;return t("div",[t("div",{staticClass:"component legal-menu"},[t("section",{staticClass:"header"},[t("span",[o._v(o._s(o.$t("legal")))]),o._v(" "),t("b-icon-chevron-down")],1),o._v(" "),t("nuxt-link",{staticClass:"active",attrs:{to:o.localePath("/legal/terms-of-use")}},[o._v(o._s(o.$t("terms_of_use")))]),o._v(" "),t("nuxt-link",{attrs:{to:o.localePath("/legal/users-terms-and-conditions")}},[o._v(o._s(o.$t("users_terms_and_conditions")))]),o._v(" "),t("nuxt-link",{attrs:{to:o.localePath("/legal/studio-terms-and-conditions")}},[o._v(o._s(o.$t("studio_terms_and_conditions")))]),o._v(" "),t("nuxt-link",{attrs:{to:o.localePath("/legal/design-request-terms-and-conditions")}},[o._v(o._s(o.$t("design_request_terms_and_conditions")))]),o._v(" "),t("nuxt-link",{attrs:{to:o.localePath("/legal/privacy-policy")}},[o._v(o._s(o.$t("privacy_policy")))])],1),o._v(" "),t("br"),t("br")])}),[],!1,null,"7b64ddac",null);n.a=component.exports},496:function(o,n,t){"use strict";var e={props:["slug"],data:function(){return{pageInfo:null}},methods:{load:function(){var o=this;this.$axios.$get("/pages/".concat(this.slug)).then((function(n){o.pageInfo=n}))}},mounted:function(){var o=this;this.$nextTick((function(){o.load()}))}},r=t(20),component=Object(r.a)(e,(function(){var o=this.$createElement,n=this._self._c||o;return n("div",[this.pageInfo?n("div",{domProps:{innerHTML:this._s(this.pageInfo.translations[this.$i18n.locale].body)}}):n("div",{staticStyle:{"text-align":"center"}},[n("b-spinner",{attrs:{type:"grow",label:"Loading..."}})],1)])}),[],!1,null,"07e6dc20",null);n.a=component.exports},641:function(o,n,t){var content=t(845);"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,t(25).default)("c787acd6",content,!0,{sourceMap:!1})},844:function(o,n,t){"use strict";t(641)},845:function(o,n,t){(n=t(24)(!1)).push([o.i,'.nav-tabs .nav-link{color:#495057;outline:none;border:none;padding:6px 0 0;font-size:25px;margin-right:16px}@media screen and (max-width:768px){.nav-tabs .nav-link{font-size:14px}}.nav-tabs{border:none}.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{color:#000;outline:none;font-weight:600;background-color:#fff;border-color:#dee2e6 #dee2e6 #fff;font-size:25px;padding:6px 0 0;margin-right:20px}@media screen and (max-width:768px){.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{font-size:14px}}.modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-header-confirm{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button,.modal-content .white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button{color:#fff;background-color:#363636}.page.legal .content{font-size:14px}.page.legal .content a{color:#0e8dde!important}.page.legal .content h1{font-size:30px;font-weight:700}.page.legal .content .tnc ol li:before{content:counters(item,".") " ";counter-increment:item;width:25px;margin-left:-20px;display:inline-block}',""]),o.exports=n}}]);