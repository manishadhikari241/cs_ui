(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{1184:function(o,t,n){"use strict";n.r(t);var e=n(709),d=n(538),r={components:{Design:e.a,Simulator:d.a},asyncData:function(o){return o.$axios.get("/pages/designs").then((function(o){return{pageData:o.data}}))},head:function(){return{meta:[{hid:"description",name:"description",content:this.pageData.translations[this.$i18n.locale].meta_description},{hid:"keywords",name:"keywords",content:this.pageData.translations[this.$i18n.locale].meta_keywords}]}},data:function(){return{design:null}},methods:{load:function(){var o=this;this.$axios.$get("/design/".concat(this.$route.params.id,"?scope[]=designer.profile&scope[]=keywords&scope[]=studio&scope[]=freeDesign")).then((function(t){o.design=t})).catch((function(t){o.$toast.error(t.response.data.error.message),setTimeout((function(){o.$router.push(o.localePath("/designs"))}),1e3)}))}},mounted:function(){var o=this;this.$nextTick((function(){o.load()}))}},f=(n(876),n(20)),component=Object(f.a)(r,(function(){var o=this,t=o.$createElement,n=o._self._c||t;return n("div",{staticClass:"page designs"},[o.design?o._e():n("div",{staticStyle:{"text-align":"center"}},[n("b-spinner",{attrs:{type:"grow",label:"Spinning"}})],1),o._v(" "),n("client-only",[o.design?n("div",{staticClass:"design-container"},[n("Design",{attrs:{design:o.design}}),o._v(" "),n("div",{staticClass:"design-simulator-separator"},[n("div",{staticClass:"line d-none d-sm-none d-md-block"}),o._v(" "),n("div",{staticClass:"text"},[o._v(o._s(o.$t("try_design_on_product")))])]),o._v(" "),n("Simulator",{attrs:{design:o.design}})],1):o._e()])],1)}),[],!1,null,"d814f584",null);t.default=component.exports},657:function(o,t,n){var content=n(877);"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,n(25).default)("18cfcef0",content,!0,{sourceMap:!1})},876:function(o,t,n){"use strict";n(657)},877:function(o,t,n){(t=n(24)(!1)).push([o.i,".nav-tabs .nav-link[data-v-d814f584]{color:#495057;outline:none;border:none;padding:6px 0 0;font-size:25px;margin-right:16px}@media screen and (max-width:768px){.nav-tabs .nav-link[data-v-d814f584]{font-size:14px}}.nav-tabs[data-v-d814f584]{border:none}.nav-tabs .nav-item.show .nav-link[data-v-d814f584],.nav-tabs .nav-link.active[data-v-d814f584]{color:#000;outline:none;font-weight:600;background-color:#fff;border-color:#dee2e6 #dee2e6 #fff;font-size:25px;padding:6px 0 0;margin-right:20px}@media screen and (max-width:768px){.nav-tabs .nav-item.show .nav-link[data-v-d814f584],.nav-tabs .nav-link.active[data-v-d814f584]{font-size:14px}}.modal-dialog .confirm-box-body[data-v-d814f584]{text-align:center}.modal-dialog .confirm-box-header-confirm[data-v-d814f584]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm[data-v-d814f584]{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm[data-v-d814f584]{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-d814f584]{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-d814f584]{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-d814f584]{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-d814f584]{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer[data-v-d814f584]{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button[data-v-d814f584]{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary[data-v-d814f584]{opacity:.5}.modal-content[data-v-d814f584]{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header[data-v-d814f584]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button[data-v-d814f584]{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button[data-v-d814f584],.modal-content .white-button[data-v-d814f584]{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button[data-v-d814f584]{color:#fff;background-color:#363636}.page[data-v-d814f584]{margin:25px auto 0}.page.designs .design-simulator-separator[data-v-d814f584]{height:100px;font-size:25px;font-weight:600;display:flex;align-items:center;justify-content:center;position:relative}@media screen and (max-width:767px){.page.designs .design-simulator-separator[data-v-d814f584]{justify-content:flex-start}}.page.designs .design-simulator-separator .text[data-v-d814f584]{background:#fff;padding:10px 20px;position:relative}.page.designs .design-simulator-separator .line[data-v-d814f584]{width:100%;border-top:1px solid #ccc;position:absolute;top:50%;left:0}@media screen and (max-width:767px){.page.designs .design-simulator-separator[data-v-d814f584]{font-size:20px}}",""]),o.exports=t}}]);