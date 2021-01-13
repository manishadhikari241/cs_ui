(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{1171:function(t,e,n){"use strict";n.r(e);var o=n(0),r={middleware:"auth",components:{UserMenu:n(496).a,BIconChevronLeft:o.gh},data:function(){return{payments:[],fields:[{key:"package",label:this.$t("package"),tdClass:"show-data",thClass:"show-head"},{key:"amount",label:this.$t("price"),tdClass:"hidden-xs",thClass:"hidden-xs"},{key:"quantity",label:this.$t("quota"),tdClass:"hidden-xs",thClass:"hidden-xs"},{key:"actions",label:this.$t("details"),tdClass:"show-data",thClass:"show-head"}],invoice:null}},methods:{load:function(){var t=this;this.$axios.$get("/users/".concat(this.$auth.user.id,"/payments")).then((function(e){t.$auth.user.is_existing_user?(t.payments=e.payments.concat(e.planPayments),t.payments.sort((function(a,b){return a.created_at<b.created_at?1:a.created_at>b.created_at?-1:0}))):t.payments=e.payments}))},showInvoice:function(t){this.invoice=t},print:function(){window.print()}},mounted:function(){var t=this;this.$nextTick((function(){t.load()}))}},c=(n(859),n(20)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"page user"},[o("b-container",[o("b-row",[o("b-col",{staticClass:"ignorePrint",attrs:{md:"3"}},[o("UserMenu")],1),t._v(" "),o("b-col",{attrs:{md:"9"}},[o("div",{staticClass:"content"},[o("div",{directives:[{name:"show",rawName:"v-show",value:!t.invoice,expression:"!invoice"}],staticClass:"payments-container"},[o("div",{staticClass:"title"},[t._v(t._s(t.$t("payment_history")))]),t._v(" "),o("br"),t._v(" "),o("b-table",{staticClass:"payment-history",attrs:{items:t.payments,fields:t.fields,responsive:"md",striped:""},scopedSlots:t._u([{key:"cell(package)",fn:function(data){return[data.item.lib_plan_user?o("span",{staticClass:"capitalize"},[t._v(t._s(data.item.lib_plan_user.lib_plan.key.replaceAll("_"," ")))]):o("span",{staticClass:"capitalize"},[t._v(t._s(t.$t(data.item.package)))])]}},{key:"cell(amount)",fn:function(data){return["coupon"!=data.item.channel?o("span",[t._v(t._s(data.item.amount)+" USD")]):t._e(),t._v(" "),"coupon"==data.item.channel?o("b-badge",{attrs:{variant:"primary"}},[t._v(t._s(t.$t("coupon"))+"\n                                ")]):t._e()]}},{key:"cell(quantity)",fn:function(data){return[data.item.lib_plan_user?[t._v("\n                                    "+t._s(data.item.lib_plan_user.lib_plan.quota)+" designs\n                                ")]:[t._v("\n                                    "+t._s(data.item.quantity)+"\n                                    "),o("span",{staticClass:"lowercase"},[t._v("\n                                    "+t._s("standard"==data.item.package||"extended"==data.item.package?1==data.item.quantity?t.$t("download"):t.$t("downloads"):"exclusive"==data.item.package?1==data.item.quantity?t.$t("design_quantifier"):t.$t("designs_quantifier"):1==data.item.quantity?t.$t("product"):t.$t("products"))+"\n                                    ")])]]}},{key:"cell(actions)",fn:function(data){return[o("b-button",{staticStyle:{"text-transform":"capitalize"},on:{click:function(e){return t.showInvoice(data.item)}}},[t._v(t._s(t.$t("view"))+"\n                                ")])]}}])})],1),t._v(" "),t.invoice?o("div",{staticClass:"invoice-container"},[t.invoice.lib_plan_user?[o("div",{staticClass:"title"},[o("span",[t._v(t._s(t.$t("invoice"))+" # "+t._s(t.invoice.id))]),t._v(" "),o("div",{staticClass:"row buttons d-flex"},[o("button",{staticClass:"btn-back ignorePrint",on:{click:function(e){return t.showInvoice(null)}}},[o("i",{staticClass:"fa fa-arrow-left",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$t("back"))+"\n                                    ")]),t._v(" "),o("button",{staticClass:"btn-print ignorePrint",attrs:{size:"sm"},on:{click:t.print}},[t._v(t._s(t.$t("print_invoice"))+"\n                                        "),o("img",{staticStyle:{height:"auto",width:"20px"},attrs:{src:n(505)}})])])]),t._v(" "),o("div",{staticClass:"invoice-header"},[o("div",{staticClass:"logo"},[o("img",{attrs:{alt:"logo",src:n(279)}})]),t._v(" "),o("div",{staticClass:"text"},[t._v(t._s(t.$t("invoice_address")))]),t._v(" "),o("div",{staticClass:"text"},[t._v("www.collectionstock.com")])]),t._v(" "),o("br"),t._v(" "),o("hr"),t._v(" "),o("div",{staticClass:"invoice-details"},[o("div",{staticClass:"prop"},[t._v(t._s(t.$t("invoice_date")))]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.$moment(t.invoice.created_at).format("DD/MM/YYYY")))]),t._v(" "),o("div",{staticClass:"prop"},[t._v(t._s(t.$t("payment_method")))]),t._v(" "),o("div",{staticClass:"value"},["coupon"!=t.invoice.channel?o("span",[t._v(t._s(t.$t("credit_card")))]):t._e(),t._v(" "),"coupon"==t.invoice.channel?o("span",[t._v(t._s(t.$t("coupon")))]):t._e()]),t._v(" "),o("div",{staticClass:"prop"},[t._v(t._s(t.$t("billing_details")))]),t._v(" "),t.invoice.billing_details?o("div",{staticClass:"value"},[t._v(t._s(t.invoice.billing_details))]):o("div",{staticClass:"value"},[t._v(t._s(this.$auth.user.first_name)+" "+t._s(this.$auth.user.last_name))]),t._v(" "),t.invoice.vat_number?o("div",{staticClass:"prop"},[t._v(t._s(t.$t("vat_number")))]):t._e(),t._v(" "),t.invoice.vat_number?o("div",{staticClass:"value"},[t._v(t._s(t.invoice.vat_number))]):t._e(),t._v(" "),"coupon"!=t.invoice.channel?o("div",{staticClass:"prop"},[t._v(t._s(t.$t("transaction_id")))]):t._e(),t._v(" "),"coupon"!=t.invoice.channel?o("div",{staticClass:"value"},[t._v(t._s(t.invoice.transaction_id))]):t._e(),t._v(" "),o("div",{staticClass:"prop"},[t._v(t._s(t.$t("plan")))]),t._v(" "),o("div",{staticClass:"value"},["starter"==t.invoice.lib_plan_user.lib_plan.key?o("div",[o("p",[t._v(t._s(t.$t("monthly_membership"))+" - US$ "+t._s(t.invoice.amount)+"/"+t._s(t.$t("month"))+" "+t._s(t.$t("for"))+" "+t._s(t.invoice.lib_plan_user.lib_plan.quota)+" "+t._s(t.$t("design_invoice"))+"   "+t._s(t.$t("with_extended_license"))+" ")])]):t._e(),t._v(" "),"starter_yearly"==t.invoice.lib_plan_user.lib_plan.key?o("div",[o("p",[t._v(t._s(t.$t("starter_plan_yearly"))+" - US$ "+t._s(t.invoice.amount)+"  "+t._s(t.$t("for"))+" "+t._s(t.invoice.lib_plan_user.lib_plan.quota)+" "+t._s(t.$t("design_invoice"))+" "+t._s(t.$t("with_extended_license"))+" ")])]):t._e(),t._v(" "),"pro_yearly"==t.invoice.lib_plan_user.lib_plan.key?o("div",[o("p",[t._v(t._s(t.$t("pro_plan_yearly"))+" - US$ "+t._s(t.invoice.amount)+" "+t._s(t.$t("for"))+" "+t._s(t.invoice.lib_plan_user.lib_plan.quota)+" "+t._s(t.$t("design_invoice"))+" "+t._s(t.$t("with_extended_license"))+" ")])]):t._e()]),t._v(" "),o("div",{staticClass:"prop"},[t._v(t._s(t.$t("period")))]),t._v(" "),"12"==t.invoice.lib_plan_user.lib_plan.month_cycle?o("div",{staticClass:"value"},[t._v(t._s(t.$t("one_year"))+" : "+t._s(t.$moment(t.invoice.created_at).format("DD/MM/YYYY"))+" - "+t._s(t.$moment(t.invoice.created_at).add("years",1).format("DD/MM/YYYY"))+"\n                                ")]):t._e(),t._v(" "),"1"==t.invoice.lib_plan_user.lib_plan.month_cycle?o("div",{staticClass:"value"},[t._v(t._s(t.$t("one_month"))+" : "+t._s(t.$moment(t.invoice.created_at).format("DD/MM/YYYY"))+" - "+t._s(t.$moment(t.invoice.created_at).add("months",1).format("DD/MM/YYYY"))+"\n                                ")]):t._e(),t._v(" "),o("div",{staticClass:"prop"},[t._v(t._s(t.$t("total")))]),t._v(" "),o("div",{staticClass:"value"},[t._v("US$ "+t._s(t.invoice.amount))]),t._v(" "),o("div",{staticClass:"prop"},[t._v(t._s(t.$t("important")))]),t._v(" "),o("div",{staticClass:"value"},[o("p",[t._v("* "+t._s(t.$t("payments_made_in")))]),t._v(" "),o("p",[t._v("* "+t._s(t.$t("no_vat_applies")))]),t._v(" "),o("p",[t._v("* "+t._s(t.$t("extended_license_terms_will_apply")))]),t._v(" "),"starter"==t.invoice.lib_plan_user.lib_plan.key?o("p",[t._v("* "+t._s(t.$t("your_monthly_membership")))]):t._e(),t._v(" "),null!=t.invoice.lib_plan_user.subscription_id&&"starter_yearly"==t.invoice.lib_plan_user.lib_plan.key||"pro_yearly"==t.invoice.lib_plan_user.lib_plan.key?o("p",[t._v("* "+t._s(t.$t("your_starter_yearly_membership")))]):t._e()]),t._v(" "),o("br")])]:[o("div",{staticClass:"title"},[o("span",[t._v(t._s(t.$t("invoice"))+" # "+t._s(t.invoice.id))]),t._v(" "),o("div",{staticClass:"row buttons d-flex"},[o("button",{staticClass:"btn-back ignorePrint",on:{click:function(e){return t.showInvoice(null)}}},[o("i",{staticClass:"fa fa-arrow-left",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(t.$t("back"))+"\n                                    ")]),t._v(" "),o("button",{staticClass:"btn-print ignorePrint",attrs:{size:"sm"},on:{click:t.print}},[t._v(t._s(t.$t("print_invoice"))+"\n                                        "),o("img",{staticStyle:{height:"auto",width:"20px"},attrs:{src:n(505)}})])])]),t._v(" "),o("div",{staticClass:"invoice-header"},[o("div",{staticClass:"logo"},[o("img",{attrs:{alt:"logo",src:n(279)}})]),t._v(" "),o("div",{staticClass:"text"},[t._v(t._s(t.$t("invoice_address")))]),t._v(" "),o("div",{staticClass:"text"},[t._v("www.collectionstock.com")])]),t._v(" "),o("br"),t._v(" "),o("hr"),t._v(" "),o("div",{staticClass:"invoice-details"},[o("div",{staticClass:"prop"},[t._v(t._s(t.$t("invoice_date")))]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.$moment(t.invoice.created_at).format("DD/MM/YYYY")))]),t._v(" "),o("div",{staticClass:"prop"},[t._v(t._s(t.$t("payment_method")))]),t._v(" "),o("div",{staticClass:"value"},["coupon"!=t.invoice.channel?o("span",[t._v(t._s(t.$t("credit_card")))]):t._e(),t._v(" "),"coupon"==t.invoice.channel?o("span",[t._v(t._s(t.$t("coupon")))]):t._e()]),t._v(" "),o("div",{staticClass:"prop"},[t._v(t._s(t.$t("billing_details")))]),t._v(" "),t.invoice.billing_details?o("div",{staticClass:"value"},[t._v(t._s(t.invoice.billing_details))]):o("div",{staticClass:"value"},[t._v(t._s(this.$auth.user.first_name)+" "+t._s(this.$auth.user.last_name))]),t._v(" "),t.invoice.vat_number?o("div",{staticClass:"prop"},[t._v(t._s(t.$t("vat_number")))]):t._e(),t._v(" "),t.invoice.vat_number?o("div",{staticClass:"value"},[t._v(t._s(t.invoice.vat_number))]):t._e(),t._v(" "),"coupon"!=t.invoice.channel?o("div",{staticClass:"prop"},[t._v(t._s(t.$t("transaction_id")))]):t._e(),t._v(" "),"coupon"!=t.invoice.channel?o("div",{staticClass:"value"},[t._v(t._s(t.invoice.transaction_id))]):t._e(),t._v(" "),o("div",{staticClass:"prop"},[t._v(t._s(t.$t("package")))]),t._v(" "),o("div",{staticClass:"value"},["standard"==t.invoice.package||"extended"==t.invoice.package?o("div",[o("p",[o("span",{staticClass:"capitalize"},[t._v(t._s(t.$t(t.invoice.package)))]),t._v(t._s("standard"==t.invoice.package||"extended"==t.invoice.package?t.$t("license"):"Requests")+" -\n                                            $"+t._s(t.invoice.amount)+" "+t._s(t.$t("for"))+" "+t._s(t.invoice.quantity)+" "+t._s("standard"==t.invoice.package||"extended"==t.invoice.package?t.invoice.quantity>1&&"en"==t.$i18n.locale?t.$t("download")+"s":t.$t("download"):"requests"))]),t._v(" "),"standard"==t.invoice.package?o("p",[t._v(t._s(t.$t("jpg_only")))]):t._e(),t._v(" "),"extended"==t.invoice.package?o("p",[t._v(t._s(t.$t("jpg_pdf_ai_eps")))]):t._e(),t._v(" "),"standard"==t.invoice.package?o("p",[t._v(t._s(t.$t("for_editorial_avertising_web")))]):t._e(),t._v(" "),"extended"==t.invoice.package?o("p",[t._v(t._s(t.$t("for_resale_items_can_edit_modify")))]):t._e()]):"simulator"==t.invoice.package?o("div",[o("p",[t._v(t._s(t.$t("product_simulator"))+" - $"+t._s(t.invoice.amount)+" "+t._s(t.$t("for"))+" "+t._s(t.invoice.quantity)+"\n                                            "+t._s(t.$t("product"))+t._s("en"==t.$i18n.locale?"s":"")+" ")]),t._v(" "),o("p",[t._v(t._s(t.$t("add_your_own_product_into")))])]):o("div",[o("p",[t._v(t._s(t.$t("exclusive_design_invoice"))+" - $"+t._s(t.invoice.amount)+t._s(t.$t("for"))+" "+t._s(t.invoice.quantity)+"\n                                            "+t._s(t.$t("design_single"))+t._s(t.invoice.quantity>1&&"en"==t.$i18n.locale?"s":""))]),t._v(" "),o("p",[t._v(t._s(t.$t("jpg_pdf_ai_eps")))]),t._v(" "),o("p",[t._v(t._s(t.$t("ownership_certificate")))]),t._v(" "),o("p",[t._v(t._s(t.$t("tailor_made_on_request")))])]),t._v(" "),o("p",[t._v(t._s(t.$t("to_be_used_within")))])]),t._v(" "),o("div",{staticClass:"prop"},[t._v(t._s(t.$t("total")))]),t._v(" "),o("div",{staticClass:"value"},[t._v("US$ "+t._s(t.invoice.amount))]),t._v(" "),o("div",{staticClass:"prop"},[t._v(t._s(t.$t("important")))]),t._v(" "),o("div",{staticClass:"value"},[o("p",[t._v("* "+t._s(t.$t("payments_made_in")))]),t._v(" "),o("p",[t._v("* "+t._s(t.$t("no_vat_applies")))])]),t._v(" "),o("br")])]],2):t._e()])])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports},480:function(t,e,n){var content=n(489);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(25).default)("7687f06a",content,!0,{sourceMap:!1})},488:function(t,e,n){"use strict";n(480)},489:function(t,e,n){(e=n(24)(!1)).push([t.i,".modal-dialog .confirm-box-body[data-v-1876a282]{text-align:center}.modal-dialog .confirm-box-header-confirm[data-v-1876a282]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm[data-v-1876a282]{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm[data-v-1876a282]{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-1876a282]{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-1876a282]{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-1876a282]{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-1876a282]{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer[data-v-1876a282]{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button[data-v-1876a282]{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary[data-v-1876a282]{opacity:.5}.modal-content[data-v-1876a282]{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header[data-v-1876a282]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button[data-v-1876a282]{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button[data-v-1876a282],.modal-content .white-button[data-v-1876a282]{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button[data-v-1876a282]{color:#fff;background-color:#363636}.component.user-menu[data-v-1876a282]{background:#363636;padding:10px 0;border-radius:4px}.component.user-menu section.header[data-v-1876a282]{display:flex;align-items:center;justify-content:space-between;padding:10px 20px;color:#fff;font-size:16px;font-weight:700}@media screen and (max-width:768px){.component.user-menu section.header[data-v-1876a282]{font-size:14px}}.component.user-menu a[data-v-1876a282]{display:block;padding:10px 20px;color:#fff;font-size:16px;text-decoration:none}@media screen and (max-width:768px){.component.user-menu a[data-v-1876a282]{font-size:14px}}.component.user-menu a.nuxt-link-active[data-v-1876a282]{color:#363636;background-color:#fff}",""]),t.exports=e},496:function(t,e,n){"use strict";var o={components:{BIconChevronDown:n(0).eh}},r=(n(488),n(20)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"component user-menu"},[n("section",{staticClass:"header"},[n("span",[t._v(t._s(t.$t("user_account")))]),t._v(" "),n("b-icon-chevron-down")],1),t._v(" "),n("nuxt-link",{attrs:{to:t.localePath("/user/quota")}},[t._v(t._s(t.$t("your_quota")))]),t._v(" "),n("nuxt-link",{attrs:{to:t.localePath("/user/payment-history")}},[t._v(t._s(t.$t("payment_history")))]),t._v(" "),n("nuxt-link",{attrs:{to:t.localePath("/user/profile")}},[t._v(t._s(t.$t("user_information")))]),t._v(" "),n("nuxt-link",{attrs:{to:t.localePath("/user/password")}},[t._v(t._s(t.$t("password")))]),t._v(" "),n("nuxt-link",{attrs:{to:"/user/address"}},[t._v(t._s(t.$t("address_book")))])],1),t._v(" "),n("br"),n("br")])}),[],!1,null,"1876a282",null);e.a=component.exports},505:function(t,e,n){t.exports=n.p+"img/print_black.af18791.png"},650:function(t,e,n){var content=n(860);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(25).default)("692779fa",content,!0,{sourceMap:!1})},859:function(t,e,n){"use strict";n(650)},860:function(t,e,n){(e=n(24)(!1)).push([t.i,".modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-header-confirm{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button,.modal-content .white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button{color:#fff;background-color:#363636}.page.user .payments-container .title{font-size:25px;font-weight:700;color:#363636}@media screen and (max-width:768px){.page.user .payments-container .title{font-size:20px}}@media screen and (max-width:550px){.page.user .payments-container .title{margin-top:-20px}}@media screen and (max-width:768px){.page.user .payments-container .payment-history .hidden-xs{font-size:12px}}@media screen and (max-width:768px){.page.user .payments-container .payment-history .show-head{font-size:14px}}@media screen and (max-width:768px){.page.user .payments-container .payment-history .show-data{font-size:12px}}.page.user .payments-container .capitalize{text-transform:capitalize}.page.user .payments-container .lowercase{text-transform:lowercase}.page.user .payments-container button{font-size:16px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 20px;background-color:#fff;font-weight:700}@media screen and (max-width:768px){.page.user .payments-container button{font-size:12px}}.page.user .invoice-container .title{font-size:25px;font-weight:700;color:#363636;display:flex;justify-content:space-between;align-items:center}.page.user .invoice-container .btn-print{background-color:#fff;color:#363636;font-size:16px;opacity:1;border:1px solid #363636;border-radius:30px;padding:2px 15px;font-weight:700;text-transform:uppercase;outline:none}.page.user .invoice-container .invoice-header{padding-top:15px;text-align:center}.page.user .invoice-container .invoice-header .logo{margin-bottom:10px}.page.user .invoice-container .invoice-header .logo img{height:70px}.page.user .invoice-container .invoice-header .text{color:#4a4a4a;font-size:14px}.page.user .invoice-container .invoice-details{font-size:14px}.page.user .invoice-container .invoice-details .prop{font-weight:700;padding:10px}.page.user .invoice-container .invoice-details .value{padding:10px;margin-top:-18px}@media screen and (max-width:768px){.page.user .invoice-container .invoice-details .value{font-size:12px}}.page.user .invoice-container .invoice-details .value p{margin:0;padding:0}.page.user .invoice-container .invoice-details .value .capitalize{text-transform:capitalize}.page.user .invoice-container .btn-back{font-size:16px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 19px;background-color:#fff;font-weight:700;margin-right:20px;outline:none}@media screen and (max-width:500px){.page.user .invoice-container .buttons .btn-back{margin-bottom:10px}}@media screen and (max-width:768px){.page.user .invoice-container .btn-back{padding:5px 11px;margin-right:20px}.page.user .invoice-container .btn-back,.page.user .invoice-container .btn-print{font-size:14px;color:#363636;border:1px solid #363636;border-radius:30px;background-color:#fff;font-weight:700;outline:none}.page.user .invoice-container .btn-print{opacity:1;padding:2px 8px;text-transform:uppercase}.page.user .invoice-container .buttons{margin-top:auto;justify-content:flex-end}}@media screen and (max-width:500px){.hidden-xs{display:none}}",""]),t.exports=e}}]);