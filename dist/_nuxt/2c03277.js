(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{1181:function(e,t,n){"use strict";n.r(t);n(12),n(9),n(8),n(6),n(10);var o=n(3),r=n(32);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var c={middleware:"auth",components:{UserMenu:n(486).a},computed:l(l({},Object(r.b)("app",["init"])),Object(r.b)("pricing",["packages"])),data:function(){return{plans:[{title:"standard_license",item:"design",package:"standard"},{title:"extended_license",item:"design",package:"extended"},{title:"exclusive_design",item:"request",package:"exclusive"},{title:"product_simulator",item:"request",package:"simulator"}],nOfDownloads:0}},methods:{getNumberOfDownloads:function(){var e=this;this.$axios.$get("/downloads/numberOfDownloads").then((function(t){e.nOfDownloads=t.count}))},buy:function(e){this.$bvModal.show("modal-payments"),this.$store.commit("payments/setPackage",{key:e,index:1})}},mounted:function(){var e=this;this.$nextTick((function(){e.getNumberOfDownloads()}))}},m=(n(870),n(20)),component=Object(m.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page user"},[n("b-container",[n("b-row",[n("b-col",{attrs:{md:"3"}},[n("UserMenu")],1),e._v(" "),n("b-col",{attrs:{md:"9"}},[n("div",{staticClass:"content"},[n("b-row",[n("b-col",{attrs:{md:"7"}},[n("div",{staticClass:"quota-container"},[n("div",{staticClass:"title"},[e._v(e._s(e.$t("your_quota")))]),e._v(" "),e.init.quota?n("div",{staticClass:"packages"},[n("b-row",e._l(e.plans,(function(t,o){return n("b-col",{key:"updated_quota_package_"+o,attrs:{sm:"6"}},["extended"==t.package&&e.$auth.user.is_existing_user?n("div",{staticClass:"package"},[n("div",{staticClass:"package-title"},[e._v(e._s(e.$t(t.title)))]),e._v(" "),n("div",{staticClass:"package-price"},[e._v(e._s(e.init.plan_quota))]),e._v(" "),n("div",{staticClass:"existing-plan-description"},[n("p",[e._v("OUT OF "+e._s(e.init.plan.lib_plan.quota))]),e._v(" "),n("p",[e._v("PER MONTH")])])]):n("div",{staticClass:"package"},[n("div",{staticClass:"package-title"},[e._v(e._s(e.$t(t.title)))]),e._v(" "),n("div",{staticClass:"package-price"},[e._v(e._s(e.init.quota[t.package]))]),e._v(" "),e.init.quota[t.package]>0?n("div",{staticClass:"package-expiry"},[n("strong",[e._v(e._s(e.$t("expires")))]),e._v(": "+e._s(e.$moment(e.init.quota[t.package+"_expiry"]).format("DD/MM/YY"))+"\n                                                ")]):n("div",{staticClass:"package-expiry"},[e._v(" ")]),e._v(" "),n("b-button",{staticClass:"get-more",on:{click:function(n){return e.buy(t.package)}}},[e._v(e._s(e.$t("get_more"))+"\n                                                ")])],1)])})),1)],1):e._e()])]),e._v(" "),n("b-col",{staticClass:"your-downloads",attrs:{md:"5"}},[n("div",{staticClass:"downloads"},[n("div",{staticClass:"title"},[e._v(e._s(e.$t("your_downloads")))]),e._v(" "),n("div",{staticClass:"number"},[e._v(e._s(e.nOfDownloads))]),e._v(" "),n("nuxt-link",{staticClass:"browse",attrs:{to:"/user/downloads"}},[e._v(e._s(e.$t("browse")))])],1)])],1),e._v(" "),n("br",{staticClass:"quota-break"}),e._v(" "),n("br",{staticClass:"quota-break"}),e._v(" "),n("div",{staticClass:"important-quota-message"},[n("p",{staticClass:"important-title"},[e._v(e._s(e.$t("important_message")))]),e._v(" "),e.$auth.user.is_existing_user?[e.init.quota?["starter"==e.init.plan.lib_plan.key?n("p",{staticClass:"important-description"},[e._v("\n                                    Your Monthly Membership (Extended license – US$"+e._s(e.init.plan.lib_plan.price)+"/month) will be charged automatically."),n("br"),e._v("\n                                    Designs downloaded with a monthly membership can only be used during your active membership period.\n                                ")]):e._e(),e._v(" "),"pro"==e.init.plan.lib_plan.key?n("p",{staticClass:"important-description"},[e._v("\n                                    Your Monthly Membership (Extended license – US$"+e._s(e.init.plan.lib_plan.price)+"/month) will be charged automatically."),n("br"),e._v("\n                                    Designs downloaded with a monthly membership can only be used during your active membership period.\n                                ")]):"starter_yearly"==e.init.plan.lib_plan.key&&e.init.plan.subscription_id?n("p",{staticClass:"important-description"},[e._v("\n                                    Your Starter Plan Yearly Membership (Extended license – US$"+e._s(e.init.plan.lib_plan.price)+"/year) will expire on "+e._s(e.$moment(e.init.plan.next_billing_at).format("DD/MM/YYYY"))+" and will be auto renewed for another year. To cancel your membership, please contact us minimum 10 days before the expiry date. Once your Membership is auto renewed, refund will not be accepted. Designs downloaded with a yearly membership can only be used during your active Yearly membership period.\n                                ")]):"starter_yearly"!=e.init.plan.lib_plan.key||e.init.plan.subscription_id?"pro_yearly"==e.init.plan.lib_plan.key&&e.init.plan.subscription_id?n("p",{staticClass:"important-description"},[e._v("\n                                    Your Pro Plan Yearly Membership (Extended license – US$"+e._s(e.init.plan.lib_plan.price)+"/year) will expire on "+e._s(e.$moment(e.init.plan.next_billing_at).format("DD/MM/YYYY"))+" and will be auto renewed for another year. To cancel your membership, please contact us minimum 10 days before the expiry date. Once your Membership is auto renewed, refund will not be accepted. Designs downloaded with a yearly membership can only be used during your active Yearly membership period.\n                                ")]):"pro_yearly"!=e.init.plan.lib_plan.key||e.init.plan.subscription_id?e._e():n("p",{staticClass:"important-description"},[e._v("\n                                    Your Pro Plan Yearly Membership (Extended license – US$"+e._s(e.init.plan.lib_plan.price)+"/year) will expire on "+e._s(e.$moment(e.init.plan.next_billing_at).format("DD/MM/YYYY"))+"."),n("br"),e._v("\n                                    To renew your membership, please contact us directly. Designs downloaded with a yearly membership can only be used during your active Yearly membership period.\n                                ")]):n("p",{staticClass:"important-description"},[e._v("\n                                    Your Starter Plan Yearly Membership (Extended license – US$"+e._s(e.init.plan.lib_plan.price)+"/year) will expire on "+e._s(e.$moment(e.init.plan.next_billing_at).format("DD/MM/YYYY"))+"."),n("br"),e._v("\n                                    To renew your membership, please contact us directly. Designs downloaded with a yearly membership can only be used during your active Yearly membership period.\n                                ")])]:e._e()]:n("p",{staticClass:"important-description"},[e._v(e._s(e.$t("quota_expiration_notice")))]),e._v(" "),n("p",{staticClass:"important-terms",domProps:{innerHTML:e._s(e.$t("for_more_info_terms"))}})],2)],1)])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports},475:function(e,t,n){var content=n(483);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(25).default)("498b65d6",content,!0,{sourceMap:!1})},482:function(e,t,n){"use strict";n(475)},483:function(e,t,n){(t=n(24)(!1)).push([e.i,".nav-tabs .nav-link[data-v-eae6d300]{color:#495057;outline:none;border:none;padding:6px 0 0;font-size:25px;margin-right:16px}@media screen and (max-width:768px){.nav-tabs .nav-link[data-v-eae6d300]{font-size:14px}}.nav-tabs[data-v-eae6d300]{border:none}.nav-tabs .nav-item.show .nav-link[data-v-eae6d300],.nav-tabs .nav-link.active[data-v-eae6d300]{color:#000;outline:none;font-weight:600;background-color:#fff;border-color:#dee2e6 #dee2e6 #fff;font-size:25px;padding:6px 0 0;margin-right:20px}@media screen and (max-width:768px){.nav-tabs .nav-item.show .nav-link[data-v-eae6d300],.nav-tabs .nav-link.active[data-v-eae6d300]{font-size:14px}}.modal-dialog .confirm-box-body[data-v-eae6d300]{text-align:center}.modal-dialog .confirm-box-header-confirm[data-v-eae6d300]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm[data-v-eae6d300]{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm[data-v-eae6d300]{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-eae6d300]{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-eae6d300]{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-eae6d300]{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-eae6d300]{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer[data-v-eae6d300]{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button[data-v-eae6d300]{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary[data-v-eae6d300]{opacity:.5}.modal-content[data-v-eae6d300]{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header[data-v-eae6d300]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button[data-v-eae6d300]{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button[data-v-eae6d300],.modal-content .white-button[data-v-eae6d300]{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button[data-v-eae6d300]{color:#fff;background-color:#363636}.component.user-menu[data-v-eae6d300]{background:#363636;padding:10px 0;border-radius:4px}.component.user-menu section.header[data-v-eae6d300]{display:flex;align-items:center;justify-content:space-between;padding:10px 20px;color:#fff;font-size:16px;font-weight:700}@media screen and (max-width:768px){.component.user-menu section.header[data-v-eae6d300]{font-size:14px}}.component.user-menu a[data-v-eae6d300]{display:block;padding:10px 20px;color:#fff;font-size:16px;text-decoration:none}@media screen and (max-width:768px){.component.user-menu a[data-v-eae6d300]{font-size:14px}}.component.user-menu a.nuxt-link-active[data-v-eae6d300]{color:#363636;background-color:#fff}",""]),e.exports=t},486:function(e,t,n){"use strict";var o={components:{BIconChevronDown:n(0).eh}},r=(n(482),n(20)),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"component user-menu"},[n("section",{staticClass:"header"},[n("span",[e._v(e._s(e.$t("user_account")))]),e._v(" "),n("b-icon-chevron-down")],1),e._v(" "),n("nuxt-link",{attrs:{to:e.localePath("/user/quota")}},[e._v(e._s(e.$t("your_quota")))]),e._v(" "),n("nuxt-link",{attrs:{to:e.localePath("/user/payment-history")}},[e._v(e._s(e.$t("payment_history")))]),e._v(" "),n("nuxt-link",{attrs:{to:e.localePath("/user/profile")}},[e._v(e._s(e.$t("user_information")))]),e._v(" "),n("nuxt-link",{attrs:{to:e.localePath("/user/password")}},[e._v(e._s(e.$t("password")))]),e._v(" "),n("nuxt-link",{attrs:{to:e.localePath("/user/address")}},[e._v(e._s(e.$t("address_book")))]),e._v(" "),n("nuxt-link",{attrs:{to:e.localePath("/user/newsletter")}},[e._v(e._s(e.$t("news_letter_menu")))])],1),e._v(" "),n("br"),n("br")])}),[],!1,null,"eae6d300",null);t.a=component.exports},654:function(e,t,n){var content=n(871);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(25).default)("156773ba",content,!0,{sourceMap:!1})},870:function(e,t,n){"use strict";n(654)},871:function(e,t,n){(t=n(24)(!1)).push([e.i,".nav-tabs .nav-link{color:#495057;outline:none;border:none;padding:6px 0 0;font-size:25px;margin-right:16px}@media screen and (max-width:768px){.nav-tabs .nav-link{font-size:14px}}.nav-tabs{border:none}.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{color:#000;outline:none;font-weight:600;background-color:#fff;border-color:#dee2e6 #dee2e6 #fff;font-size:25px;padding:6px 0 0;margin-right:20px}@media screen and (max-width:768px){.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{font-size:14px}}.modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-header-confirm{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button,.modal-content .white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button{color:#fff;background-color:#363636}@media screen and (max-width:768px){.quota-break{display:none}}.page.user .content{padding-left:20px}@media screen and (max-width:500px){.page.user .content .your-downloads{display:flex;justify-content:center;margin-bottom:19px}}.page.user .quota-container .title{font-size:25px;font-weight:700;color:#363636}@media screen and (max-width:768px){.page.user .quota-container .title{font-size:20px}}@media screen and (max-width:550px){.page.user .quota-container .title{margin-top:-20px}}.page.user .quota-container .package{margin:20px 0;text-align:center;color:#363636}.page.user .quota-container .package .package-title{font-size:16px;font-weight:600;text-transform:uppercase}@media screen and (max-width:768px){.page.user .quota-container .package .package-title{font-size:12px}}.page.user .quota-container .package .package-price{font-size:40px;font-weight:700}.page.user .quota-container .package .package-expiry{font-size:14px;margin-bottom:3px}.page.user .quota-container .package .get-more{display:inline-block;width:100%;padding:7px 0;color:#fff;background:#0e8dde;font-size:16px;font-weight:700;border-radius:30px;outline:none;border:none;box-shadow:none;text-transform:uppercase}@media screen and (max-width:768px){.page.user .quota-container .package .get-more{font-size:14px}}.page.user .quota-container .package .existing-plan-description{font-size:16px;color:#999;margin-top:10px}.page.user .quota-container .package .existing-plan-description p{margin:0;font-weight:600}.page.user .downloads{float:right;border:1px solid #363636;text-align:center;padding:50px 40px;border-radius:4px}@media screen and (max-width:768px) and (min-width:550px){.page.user .downloads{padding:50px 17px;margin-top:16px}}@media screen and (max-width:550px){.page.user .downloads{padding:50px 55px}}.page.user .downloads .title{font-size:22px;font-weight:600;color:#363636}@media screen and (max-width:768px){.page.user .downloads .title{font-size:12px}}.page.user .downloads .number{font-size:50px;font-weight:700}@media screen and (max-width:768px){.page.user .downloads .number{font-size:40px}}.page.user .downloads .browse{display:inline-block;padding:5px 40px;border:1px solid #363636;color:#363636;border-radius:30px;font-weight:700;font-size:20px;text-decoration:none;text-transform:uppercase}@media screen and (max-width:768px){.page.user .downloads .browse{font-size:12px}}.page.user .important-quota-message{padding:15px 20px;border:1px solid #363636;border-radius:4px;color:#363636;font-size:14px;font-weight:600}.page.user .important-quota-message .important-title{font-weight:700}.page.user .important-quota-message .important-terms a{color:inherit;text-decoration:none;border-bottom:1px solid #363636}@media screen and (max-width:767px){.page.user .content{padding-left:0}}",""]),e.exports=t}}]);