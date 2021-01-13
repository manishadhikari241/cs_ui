(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{1139:function(t,e,o){"use strict";o.r(e);o(8),o(59),o(9),o(52),o(55),o(22),o(33),o(34),o(6),o(130);function n(t,e){var o;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(o=function(t,e){if(!t)return;if("string"==typeof t)return r(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);"Object"===o&&t.constructor&&(o=t.constructor.name);if("Map"===o||"Set"===o)return Array.from(t);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return r(t,e)}(t))||e&&t&&"number"==typeof t.length){o&&(t=o);var i=0,n=function(){};return{s:n,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,l=!0,d=!1;return{s:function(){o=t[Symbol.iterator]()},n:function(){var t=o.next();return l=t.done,t},e:function(t){d=!0,c=t},f:function(){try{l||null==o.return||o.return()}finally{if(d)throw c}}}}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,o=new Array(e);i<e;i++)o[i]=t[i];return o}var c={data:function(){return{items:[],perPage:20,currentPage:1,total:0,fields:[{key:"id",label:"ID"},{key:"role_id",label:"Role"},{key:"first_name",label:"First Name"},{key:"last_name",label:"Last Name"},{key:"email",label:"Email"},{key:"standard_quota",label:"Standard Bought (Used)"},{key:"extended_quota",label:"Extended Bought (Used)"},{key:"simulator_quota",label:"Simulator Bought (Used)"},{key:"exclusive_quota",label:"Exclusive Bought (Used)"}],exportCol:["id","role","first_name","last_name","email","standard_bought","standard_used","extended_bought","extended_used","simulator_bought","simulator_used","exclusive_bought","exclusive_used"],loading:!1,searchTerm:{tmp:"",value:"",type:0}}},methods:{load:function(t){var e=this;this.loading=!0,this.$axios.$get("/cms/users?page=".concat(t).concat(this.searchTerm.value?"&term="+this.searchTerm.value:"").concat(this.searchTerm.type?"&role_id="+this.searchTerm.type:"")).then((function(t){e.items=t.data;var o,r=n(e.items);try{for(r.s();!(o=r.n()).done;){var c=o.value;c.standard_quota=e.getQuotaInfo("standard",c.payments,c.quota),c.extended_quota=e.getQuotaInfo("extended",c.payments,c.quota),c.exclusive_quota=e.getQuotaInfo("exclusive",c.payments,c.quota),c.simulator_quota=e.getQuotaInfo("simulator",c.payments,c.quota)}}catch(t){r.e(t)}finally{r.f()}e.total=t.total,e.loading=!1,document.querySelector(".menuframe").scrollTop=0}))},setSearchType:function(t){t==this.searchTerm.type&&(t=0),this.searchTerm.type=t},search:function(){this.searchTerm.value=this.searchTerm.tmp,this.currentPage=1,this.load(this.currentPage),document.querySelector(".search-input").blur()},resetSearch:function(){this.searchTerm.type=0,this.searchTerm.tmp="",this.search()},select:function(t,e,o){this.$router.push("/cms/users?id=".concat(t.id))},refresh:function(){this.load(this.currentPage)},getQuotaInfo:function(t,e,o){var r,c=arguments.length>3&&void 0!==arguments[3]&&arguments[3],l=0,d=n(e);try{for(d.s();!(r=d.n()).done;){var m=r.value;m.package===t&&(l+=m.quantity)}}catch(t){d.e(t)}finally{d.f()}var v=o?o["".concat(t,"_used")]:0;return c?[l,v]:"".concat(l," (").concat(v,")")},exportCsv:function(){var t=this;this.loading=!0,this.$axios.$get("/cms/users?export=true".concat(this.searchTerm.value?"&term="+this.searchTerm.value:"").concat(this.searchTerm.type?"&role_id="+this.searchTerm.type:"")).then((function(e){var o,r=n(e);try{for(r.s();!(o=r.n()).done;){var c=o.value;c.role=1===c.role_id?"Admin":2===c.role_id?"Creator":"Member",c.standard_bought=t.getQuotaInfo("standard",c.payments,c.quota,!0)[0],c.standard_used=t.getQuotaInfo("standard",c.payments,c.quota,!0)[1],c.extended_bought=t.getQuotaInfo("extended",c.payments,c.quota,!0)[0],c.extended_used=t.getQuotaInfo("extended",c.payments,c.quota,!0)[1],c.exclusive_bought=t.getQuotaInfo("exclusive",c.payments,c.quota,!0)[0],c.exclusive_used=t.getQuotaInfo("exclusive",c.payments,c.quota,!0)[1],c.simulator_bought=t.getQuotaInfo("simulator",c.payments,c.quota,!0)[0],c.simulator_used=t.getQuotaInfo("simulator",c.payments,c.quota,!0)[1]}}catch(t){r.e(t)}finally{r.f()}t.$exportCsv(e,"Users Report ".concat(t.$moment().format("YYYY-MM-DD")),t.exportCol),t.loading=!1}))}},mounted:function(){var t=this;this.$nextTick((function(){t.load(t.currentPage)}))}},l=(o(831),o(20)),d=Object(l.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"cmscomponent list"},[o("div",{staticClass:"actions-container"},[o("div",[o("form",{on:{submit:function(e){return e.preventDefault(),t.search(e)}}},[o("b-input-group",{attrs:{size:"sm"}},[o("b-form-input",{staticClass:"search-input",attrs:{placeholder:"Search by email"},model:{value:t.searchTerm.tmp,callback:function(e){t.$set(t.searchTerm,"tmp",e)},expression:"searchTerm.tmp"}}),t._v(" "),o("b-input-group-append",[o("b-button",{directives:[{name:"show",rawName:"v-show",value:t.searchTerm.value,expression:"searchTerm.value"}],attrs:{variant:"secondary",type:"button"},on:{click:t.resetSearch}},[t._v("Reset")]),t._v(" "),o("b-button",{attrs:{variant:"primary",type:"submit"}},[t._v("Search")])],1)],1)],1)]),t._v(" "),o("div",[o("b-pagination",{attrs:{"total-rows":t.total,"per-page":t.perPage,"aria-controls":"cms-users-list"},on:{change:t.load},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)]),t._v(" "),o("div",{staticClass:"additional-actions"},[o("div",[o("b-button-group",{staticClass:"filters",attrs:{size:"sm"}},[o("b-button",{class:{active:1==t.searchTerm.type},attrs:{variant:"info",disabled:t.loading},on:{click:function(e){t.setSearchType(1),t.search()}}},[t._v("Admin")]),t._v(" "),o("b-button",{class:{active:2==t.searchTerm.type},attrs:{variant:"warning",disabled:t.loading},on:{click:function(e){t.setSearchType(2),t.search()}}},[t._v("Creator")]),t._v(" "),o("b-button",{class:{active:999==t.searchTerm.type},attrs:{variant:"danger",disabled:t.loading},on:{click:function(e){t.setSearchType(999),t.search()}}},[t._v("Member")])],1)],1),t._v(" "),o("div",{staticClass:"total-count"},[t._v("\n      Total: "),o("strong",[t._v(t._s(t.total))]),t._v(" "),o("b-button",{attrs:{size:"sm",variant:"success",disabled:t.loading},on:{click:t.exportCsv}},[t._v("Export")])],1)]),t._v(" "),o("b-table",{attrs:{id:"cms-users-list",items:t.items,fields:t.fields,busy:t.loading,"select-mode":"single","sticky-header":"",small:"",selectable:"",striped:""},on:{"row-clicked":t.select},scopedSlots:t._u([{key:"cell(role_id)",fn:function(data){return[1==data.item.role_id?o("b-badge",{attrs:{variant:"info"}},[t._v("Admin")]):t._e(),t._v(" "),2==data.item.role_id?o("b-badge",{attrs:{variant:"warning"}},[t._v("Creator")]):t._e(),t._v(" "),data.item.is_existing_user?o("b-badge",{attrs:{variant:"danger"}},[t._v("Member")]):t._e()]}}])})],1)}),[],!1,null,null,null).exports,m=(o(43),o(19)),v={props:["itemId"],components:{CmsInvoice:o(575).a},data:function(){return{item:null,loading:!1,creatorPrivileges:{loading:!1},verify:{loading:!1},password:{value:"",loading:!1},quota:{item:null,loading:!1,tmpValues:{standard:0,extended:0,simulator:0,exclusive:0}},payments:{payments:[],fields:[{key:"package",label:"Package"},{key:"amount",label:"Price"},{key:"quantity",label:"Quantity"},{key:"actions",label:"Details"}],invoice:null},members:{reference:""}}},methods:{load:function(){var t=this;return Object(m.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.$axios.$get("/cms/users/".concat(t.itemId,"/quota")).then((function(e){t.quota.item=e})),e.next=3,t.$axios.$get("/cms/users/".concat(t.itemId));case 3:t.item=e.sent,t.$axios.$get("/cms/users/".concat(t.itemId,"/payments")).then((function(e){t.item.is_existing_user?(t.payments.payments=e.payments.concat(e.planPayments),t.payments.payments.sort((function(a,b){return a.created_at<b.created_at?1:a.created_at>b.created_at?-1:0}))):t.payments.payments=e.payments})),t.payments.invoice=null;case 6:case"end":return e.stop()}}),e)})))()},cancel:function(){this.$emit("updated",{clearItemFrame:!0})},toggleCreatorPrivileges:function(){var t=this;this.creatorPrivileges.loading=!0,this.$axios.$patch("/cms/users/".concat(this.itemId,"/toggleCreatorPrivileges")).then((function(e){t.creatorPrivileges.loading=!1,t.$toast.success("User updated successfully"),t.item=e})).catch((function(e){t.creatorPrivileges.loading=!1,t.$toast.error(e.response.data.error.message)}))},updatePassword:function(t){var e=this;this.password.loading=!0,this.$axios.$patch("/cms/users/".concat(this.itemId,"/updatePassword"),{new_password:t.target.password.value}).then((function(t){e.password.loading=!1,e.password.value="",e.$toast.success("Password updated successfully")})).catch((function(t){e.password.loading=!1,e.$toast.error(t.response.data.error.message)}))},updateQuota:function(t){var e=this;this.quota.loading=!0,this.$axios.$patch("/cms/users/".concat(this.itemId,"/updateQuota"),{pkg:t,quantity:this.quota.tmpValues[t]}).then((function(o){e.quota.loading=!1,e.quota.tmpValues[t]=0,e.$toast.success("Quota added successfully"),e.load()})).catch((function(t){e.quota.loading=!1,e.$toast.error(t.response.data.error.message)}))},showInvoice:function(t){this.payments.invoice=t},transferToExisting:function(){var t=this;return Object(m.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$post("/cms/users/existing/".concat(t.itemId,"/transferToExisting"));case 2:e.sent,window.location.reload();case 4:case"end":return e.stop()}}),e)})))()},extendMembership:function(){var t=this;this.$axios.$post("/cms/users/existing/".concat(this.itemId,"/extend"),{reference:this.members.reference}).then((function(e){t.$toast.success("Membership extended successfully"),window.location.reload()})).catch((function(e){t.$toast.error(e.response.data.error.message)}))},resetExistingAccount:function(){var t=this;this.$axios.$post("/cms/users/existing/".concat(this.itemId,"/reset")).then((function(e){t.$toast.success("Membership reset successfully"),window.location.reload()})).catch((function(e){t.$toast.error(e.response.data.error.message)}))}},watch:{itemId:function(){this.item=null,this.load()}},mounted:function(){var t=this;this.$nextTick((function(){t.load()}))}},f=(o(833),{data:function(){return{loading:!1,item:{first_name:"",last_name:"",email:"",password:""}}},methods:{cancel:function(){this.$emit("updated",{clearItemFrame:!0})},create:function(){var t=this;this.loading=!0,this.$axios.$post("/cms/users",this.item).then((function(e){t.loading=!1,t.$toast.success("New user added successfully"),t.cancel()})).catch((function(e){t.loading=!1,t.$toast.error(e.response.data.error.message)}))}}}),_={middleware:"cmsuser",layout:"cms",components:{UserList:d,UserItem:Object(l.a)(v,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"cmscomponent item user"},[t.item?t._e():o("div",{staticStyle:{"text-align":"center"}},[o("b-spinner",{attrs:{type:"grow",label:"Loading..."}})],1),t._v(" "),t.item?o("div",[o("div",{staticClass:"title ignorePrint"},[o("span",[o("i",{staticClass:"far fa-edit"}),t._v("  ID: "+t._s(t.item.id))]),t._v(" "),o("div",[o("b-button",{attrs:{variant:"outline-secondary",size:"sm"},on:{click:t.cancel}},[t._v("Cancel")])],1)]),t._v(" "),o("hr",{staticClass:"ignorePrint"}),t._v(" "),o("div",[o("b-card",{attrs:{"no-body":""}},[o("b-tabs",{attrs:{card:""}},[o("b-tab",{attrs:{title:"General",active:""}},[o("b-card-text",[o("div",{staticClass:"general"},[o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("First Name")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.first_name))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Last Name")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.last_name))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Email")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.email))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Email Verified")]),t._v(" "),o("div",{staticClass:"value"},[t.item.email_verified_at?o("b-badge",{attrs:{variant:"success"}},[t._v("Verified")]):o("b-badge",{attrs:{variant:"danger"}},[t._v("Not Verified")])],1)]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Mobile")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.mobile))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Joined")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.$moment(t.item.created_at).format("DD/MM/YYYY")))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Language Preference")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.lang_pref))])]),t._v(" "),o("div",{staticClass:"info-row",staticStyle:{"border-bottom":"none"}},[o("div",{staticClass:"prop"},[t._v("Role")]),t._v(" "),o("div",{staticClass:"value"},[1==t.item.role_id?o("b-badge",{attrs:{variant:"info"}},[t._v("Admin")]):2==t.item.role_id?o("b-badge",{attrs:{variant:"warning"}},[t._v("Creator")]):o("b-badge",[t._v("Regular")]),t._v(" "),0==t.item.role_id?o("b-button",{attrs:{size:"sm",variant:"success",disabled:t.creatorPrivileges.loading},on:{click:t.toggleCreatorPrivileges}},[t._v("Give creator privileges")]):t._e(),t._v(" "),2==t.item.role_id?o("b-button",{attrs:{size:"sm",variant:"danger",disabled:t.creatorPrivileges.loading},on:{click:t.toggleCreatorPrivileges}},[t._v("Remove creator privileges")]):t._e()],1)])])])],1),t._v(" "),o("b-tab",{attrs:{title:"Password"}},[o("b-card-text",[o("form",{on:{submit:function(e){return e.preventDefault(),t.updatePassword(e)}}},[o("b-input",{attrs:{name:"password",type:"password",placeholder:"New Password"},model:{value:t.password.value,callback:function(e){t.$set(t.password,"value",e)},expression:"password.value"}}),t._v(" "),o("br"),t._v(" "),o("div",{staticStyle:{"text-align":"right"}},[o("b-button",{attrs:{type:"submit",variant:"primary",disabled:t.password.loading}},[o("i",{staticClass:"fas fa-edit"}),t._v("  Update")])],1)],1)])],1),t._v(" "),o("b-tab",{attrs:{title:"Quota"}},[o("b-card-text",[t.quota.item?o("div",{staticClass:"quota"},[o("div",{staticClass:"input-row"},[o("div",{staticClass:"prop"},[t._v("Standard:")]),t._v(" "),o("div",{staticClass:"value"},[o("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"space-between"}},[o("span",[t._v(t._s(t.quota.item.standard))]),t._v(" "),o("b-input-group",{staticStyle:{"margin-left":"20px"},attrs:{size:"sm"}},[o("b-form-input",{attrs:{type:"number"},model:{value:t.quota.tmpValues.standard,callback:function(e){t.$set(t.quota.tmpValues,"standard",e)},expression:"quota.tmpValues.standard"}}),t._v(" "),o("b-input-group-append",[o("b-button",{attrs:{variant:"primary",disabled:t.quota.loading||t.quota.tmpValues.standard<=0},on:{click:function(e){return t.updateQuota("standard")}}},[t._v("Add")])],1)],1),t._v(" "),t.quota.item.standard?o("span",{staticStyle:{"margin-left":"20px"}},[t._v(t._s(t.$moment(t.quota.item.standard_expiry).format("DD/MM/YYYY")))]):t._e()],1)])]),t._v(" "),o("div",{staticClass:"input-row"},[o("div",{staticClass:"prop"},[t._v("Extended:")]),t._v(" "),o("div",{staticClass:"value"},[o("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"space-between"}},[o("span",[t._v(t._s(t.quota.item.extended))]),t._v(" "),o("b-input-group",{staticStyle:{"margin-left":"20px"},attrs:{size:"sm"}},[o("b-form-input",{attrs:{type:"number"},model:{value:t.quota.tmpValues.extended,callback:function(e){t.$set(t.quota.tmpValues,"extended",e)},expression:"quota.tmpValues.extended"}}),t._v(" "),o("b-input-group-append",[o("b-button",{attrs:{variant:"primary",disabled:t.quota.loading||t.quota.tmpValues.extended<=0},on:{click:function(e){return t.updateQuota("extended")}}},[t._v("Add")])],1)],1),t._v(" "),t.quota.item.extended?o("span",{staticStyle:{"margin-left":"20px"}},[t._v(t._s(t.$moment(t.quota.item.extended_expiry).format("DD/MM/YYYY")))]):t._e()],1)])]),t._v(" "),o("div",{staticClass:"input-row"},[o("div",{staticClass:"prop"},[t._v("Simulator:")]),t._v(" "),o("div",{staticClass:"value"},[o("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"space-between"}},[o("span",[t._v(t._s(t.quota.item.simulator))]),t._v(" "),o("b-input-group",{staticStyle:{"margin-left":"20px"},attrs:{size:"sm"}},[o("b-form-input",{attrs:{type:"number"},model:{value:t.quota.tmpValues.simulator,callback:function(e){t.$set(t.quota.tmpValues,"simulator",e)},expression:"quota.tmpValues.simulator"}}),t._v(" "),o("b-input-group-append",[o("b-button",{attrs:{variant:"primary",disabled:t.quota.loading||t.quota.tmpValues.simulator<=0},on:{click:function(e){return t.updateQuota("simulator")}}},[t._v("Add")])],1)],1),t._v(" "),t.quota.item.simulator?o("span",{staticStyle:{"margin-left":"20px"}},[t._v(t._s(t.$moment(t.quota.item.simulator_expiry).format("DD/MM/YYYY")))]):t._e()],1)])]),t._v(" "),o("div",{staticClass:"input-row"},[o("div",{staticClass:"prop"},[t._v("Exclusive:")]),t._v(" "),o("div",{staticClass:"value"},[o("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"space-between"}},[o("span",[t._v(t._s(t.quota.item.exclusive))]),t._v(" "),o("b-input-group",{staticStyle:{"margin-left":"20px"},attrs:{size:"sm"}},[o("b-form-input",{attrs:{type:"number"},model:{value:t.quota.tmpValues.exclusive,callback:function(e){t.$set(t.quota.tmpValues,"exclusive",e)},expression:"quota.tmpValues.exclusive"}}),t._v(" "),o("b-input-group-append",[o("b-button",{attrs:{variant:"primary",disabled:t.quota.loading||t.quota.tmpValues.exclusive<=0},on:{click:function(e){return t.updateQuota("exclusive")}}},[t._v("Add")])],1)],1),t._v(" "),t.quota.item.exclusive?o("span",{staticStyle:{"margin-left":"20px"}},[t._v(t._s(t.$moment(t.quota.item.exclusive_expiry).format("DD/MM/YYYY")))]):t._e()],1)])])]):t._e()])],1),t._v(" "),o("b-tab",{attrs:{title:"Payments"}},[o("b-card-text",[o("div",{directives:[{name:"show",rawName:"v-show",value:!t.payments.invoice,expression:"!payments.invoice"}],staticClass:"payments-container"},[o("b-table",{attrs:{items:t.payments.payments,fields:t.payments.fields,striped:""},scopedSlots:t._u([{key:"cell(package)",fn:function(data){return[data.item.lib_plan_user?o("span",{staticClass:"capitalize"},[t._v(t._s(data.item.lib_plan_user.lib_plan.key.replaceAll("_"," ")))]):o("span",{staticClass:"capitalize"},[t._v(t._s(t.$t(data.item.package)))])]}},{key:"cell(amount)",fn:function(data){return["coupon"!=data.item.channel?o("span",[t._v(t._s(data.item.amount)+" USD")]):t._e(),t._v(" "),"coupon"==data.item.channel?o("b-badge",{attrs:{variant:"primary"}},[t._v("Coupon")]):t._e()]}},{key:"cell(quantity)",fn:function(data){return[data.item.lib_plan_user?[t._v("\n                      "+t._s(data.item.lib_plan_user.lib_plan.quota)+" designs\n                    ")]:[t._v("\n                      "+t._s(data.item.quantity)+"\n                      "),o("span",[t._v(t._s("standard"==data.item.package||"extended"==data.item.package?"designs":"requests"))])]]}},{key:"cell(actions)",fn:function(data){return[o("b-button",{on:{click:function(e){return t.showInvoice(data.item)}}},[t._v("View")])]}}],null,!1,902285886)})],1),t._v(" "),t.payments.invoice?o("div",{staticClass:"invoice-container"},[t.payments.invoice.lib_plan_user?[o("div",[t._v("---INVOICE FOR EXISTING USERS")])]:[o("CmsInvoice",{attrs:{payment:t.payments.invoice}})]],2):t._e()])],1),t._v(" "),t.item.is_existing_user?o("b-tab",{attrs:{title:"Member"}},[o("b-card-text",[o("div",{staticClass:"general"},[o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Plan")]),t._v(" "),o("div",{staticClass:"value",staticStyle:{"text-transform":"capitalize"}},[t._v(t._s(t.item.plan.lib_plan.key.replaceAll("_"," ")))])]),t._v(" "),o("div",{staticClass:"info-row"},[t._v("\n                  "+t._s(t.item.plan)+"\n                  "),o("div",{staticClass:"prop"},[t._v("Payment Method")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.item.plan.subscription_id?" (Auto)":"Manual"))])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Amount")]),t._v(" "),o("div",{staticClass:"value"},[t._v("$"+t._s(t.item.plan.lib_plan.price))])]),t._v(" "),12==t.item.plan.lib_plan.month_cycle?o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Expiry Date")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.$moment(t.item.plan.next_billing_at).format("DD/MM/YYYY")))])]):t._e(),t._v(" "),12!=t.item.plan.lib_plan.month_cycle||t.item.plan.subscription_id?t._e():o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Extend Membership")]),t._v(" "),o("div",{staticClass:"value"},[o("form",{on:{submit:function(e){return e.preventDefault(),t.extendMembership(e)}}},[o("b-input-group",[o("b-form-input",{attrs:{placeholder:"Reference number"},model:{value:t.members.reference,callback:function(e){t.$set(t.members,"reference",e)},expression:"members.reference"}}),t._v(" "),o("b-input-group-append",[o("b-button",{attrs:{variant:"outline-success",disabled:!t.members.reference.length,type:"submit"}},[t._v("Renew")])],1)],1)],1)])]),t._v(" "),o("div",{staticClass:"info-row"},[o("div",{staticClass:"prop"},[t._v("Reset Account")]),t._v(" "),o("div",{staticClass:"value"},[o("b-button",{attrs:{variant:"danger"},on:{click:t.resetExistingAccount}},[t._v("Reset")])],1)])])])],1):t._e()],1)],1)],1)]):t._e()])}),[],!1,null,null,null).exports,CreateForm:Object(l.a)(f,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"cmscomponent item country create"},[o("div",{staticClass:"title"},[t._m(0),t._v(" "),o("b-button",{attrs:{variant:"outline-secondary",size:"sm"},on:{click:t.cancel}},[t._v("Cancel")])],1),t._v(" "),o("hr"),t._v(" "),o("form",{on:{submit:function(e){return e.preventDefault(),t.create(e)}}},[o("div",{staticClass:"item-content"},[o("div",{staticClass:"item-row"},[o("div",{staticClass:"prop"},[t._v("First Name")]),t._v(" "),o("div",{staticClass:"value"},[o("b-input",{attrs:{type:"text",name:"first_name",required:""},model:{value:t.item.first_name,callback:function(e){t.$set(t.item,"first_name",e)},expression:"item.first_name"}})],1)]),t._v(" "),o("div",{staticClass:"item-row"},[o("div",{staticClass:"prop"},[t._v("Last Name")]),t._v(" "),o("div",{staticClass:"value"},[o("b-input",{attrs:{type:"text",name:"last_name",required:""},model:{value:t.item.last_name,callback:function(e){t.$set(t.item,"last_name",e)},expression:"item.last_name"}})],1)]),t._v(" "),o("div",{staticClass:"item-row"},[o("div",{staticClass:"prop"},[t._v("Email")]),t._v(" "),o("div",{staticClass:"value"},[o("b-input",{attrs:{type:"email",name:"email",required:""},model:{value:t.item.email,callback:function(e){t.$set(t.item,"email",e)},expression:"item.email"}})],1)]),t._v(" "),o("div",{staticClass:"item-row"},[o("div",{staticClass:"prop"},[t._v("Password")]),t._v(" "),o("div",{staticClass:"value"},[o("b-input",{attrs:{type:"password",name:"password",required:""},model:{value:t.item.password,callback:function(e){t.$set(t.item,"password",e)},expression:"item.password"}})],1)])]),t._v(" "),o("div",{staticClass:"item-actions"},[o("b-button",{attrs:{variant:"primary",type:"submit",disabled:t.loading}},[o("i",{staticClass:"fas fa-plus"}),t._v("  Create")])],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("i",{staticClass:"fas fa-plus"}),this._v("  ID: Add new User")])}],!1,null,"1e4f53af",null).exports},data:function(){return{itemId:null}},methods:{openCreateForm:function(){this.$router.push("/cms/users?id=-1")},updated:function(t){var e=t.refresh,o=t.clearItemFrame;!0===e&&this.$refs.list.refresh(),!0===o&&(this.itemId=null,this.$router.push("/cms/users"),this.$refs.list.refresh())},onRouteUpdate:function(){this.itemId=this.$route.query.id}},watch:{$route:function(){this.onRouteUpdate()}},mounted:function(){var t=this;this.$nextTick((function(){t.onRouteUpdate()}))}},x=Object(l.a)(_,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"cmspage users"},[o("div",{staticClass:"contentframe"},[o("div",{staticClass:"menuframe ignorePrint"},[o("div",{staticClass:"title"},[t._m(0),t._v(" "),o("b-button",{attrs:{variant:"outline-success",size:"sm"},on:{click:t.openCreateForm}},[o("i",{staticClass:"fas fa-plus"}),t._v("  Add new user")])],1),t._v(" "),o("hr"),t._v(" "),o("UserList",{ref:"list"})],1),t._v(" "),o("div",{staticClass:"itemframe"},[-1==t.itemId?o("CreateForm",{on:{updated:t.updated}}):t.itemId?o("UserItem",{attrs:{itemId:t.itemId},on:{updated:t.updated}}):t._e()],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("i",{staticClass:"fas fa-users"}),this._v("  Users")])}],!1,null,"47d0d87b",null);e.default=x.exports},520:function(t,e,o){var content=o(546);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(25).default)("2c41cbb3",content,!0,{sourceMap:!1})},545:function(t,e,o){"use strict";o(520)},546:function(t,e,o){(e=o(24)(!1)).push([t.i,".modal-dialog .confirm-box-body[data-v-6a5e891b]{text-align:center}.modal-dialog .confirm-box-header-confirm[data-v-6a5e891b]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm[data-v-6a5e891b]{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm[data-v-6a5e891b]{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-6a5e891b]{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-6a5e891b]{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-6a5e891b]{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-6a5e891b]{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer[data-v-6a5e891b]{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button[data-v-6a5e891b]{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary[data-v-6a5e891b]{opacity:.5}.modal-content[data-v-6a5e891b]{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header[data-v-6a5e891b]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button[data-v-6a5e891b]{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button[data-v-6a5e891b],.modal-content .white-button[data-v-6a5e891b]{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button[data-v-6a5e891b]{color:#fff;background-color:#363636}.title[data-v-6a5e891b]{font-size:25px}.back[data-v-6a5e891b],.title[data-v-6a5e891b]{font-weight:700;color:#363636}.back[data-v-6a5e891b]{font-size:14px;border:1px solid #363636;border-radius:30px;padding:5px 20px;background-color:#fff;right:175px;position:absolute}.btn-print[data-v-6a5e891b]{background:#363636}.invoice-header[data-v-6a5e891b]{padding-top:15px;text-align:center}.invoice-header .logo[data-v-6a5e891b]{margin-bottom:10px}.invoice-header .logo img[data-v-6a5e891b]{height:70px}.invoice-header .text[data-v-6a5e891b]{color:#4a4a4a;font-size:14px}.invoice-details[data-v-6a5e891b]{font-size:14px}.invoice-details .prop[data-v-6a5e891b]{font-weight:700;padding:10px}.invoice-details .value[data-v-6a5e891b]{padding:10px}.invoice-details .value p[data-v-6a5e891b]{margin:0;padding:0}.invoice-details .value .capitalize[data-v-6a5e891b]{text-transform:capitalize}",""]),t.exports=e},575:function(t,e,o){"use strict";var n=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"invoice-header"},[e("div",{staticClass:"logo"},[e("img",{attrs:{alt:"logo",src:o(279)}})]),this._v(" "),e("div",{staticClass:"text"},[this._v("Unit 611, Kinetic Industrial Center, No.7 Wang Kwong Road, Kowloon Bay, Hong Kong")]),this._v(" "),e("div",{staticClass:"text"},[this._v("www.collectionstock.com")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"value"},[e("p",[this._v("* Payment are made in USD")]),this._v(" "),e("p",[this._v("* No VAT applies - For EU customers Reverse Charge applies (VAT 0%).")]),this._v(" "),e("p",[this._v("* On all designs you download and use on Collectionstock the Extended License Terms will apply.")])])}],r={name:"cmsinvoice",props:["payment"],methods:{print:function(){window.print()}}},c=(o(545),o(20)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"title"},[o("span",[t._v("Invoice # "+t._s(t.payment.id))]),t._v(" "),o("b-button",{staticClass:"btn-print ignorePrint",attrs:{size:"sm"},on:{click:t.print}},[t._v("Print Invoice   "),o("i",{staticClass:"fas fa-print"})])],1),t._v(" "),t._m(0),t._v(" "),o("br"),o("hr",{staticClass:"ignorePrint"}),t._v(" "),o("div",{staticClass:"invoice-details"},[o("div",{staticClass:"prop"},[t._v("Invoice Date")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.$moment(t.payment.created_at).format("DD/MM/YYYY")))]),t._v(" "),o("div",{staticClass:"prop"},[t._v("Payment Method")]),t._v(" "),o("div",{staticClass:"value"},["coupon"!=t.payment.channel?o("span",[t._v("Credit Card")]):t._e(),t._v(" "),"coupon"==t.payment.channel?o("span",[t._v("Coupon")]):t._e()]),t._v(" "),o("div",{staticClass:"prop"},[t._v(t._s(t.$t("billing_details")))]),t._v(" "),t.payment.billing_details?o("div",{staticClass:"value"},[t._v(t._s(t.payment.billing_details))]):t._e(),t._v(" "),"coupon"!=t.payment.channel?o("div",{staticClass:"prop"},[t._v("Transaction ID")]):t._e(),t._v(" "),"coupon"!=t.payment.channel?o("div",{staticClass:"value"},[t._v(t._s(t.payment.transaction_id))]):t._e(),t._v(" "),o("div",{staticClass:"prop"},[t._v("Package")]),t._v(" "),o("div",{staticClass:"value"},["standard"==t.payment.package||"extended"==t.payment.package?o("div",[o("p",[o("span",{staticClass:"capitalize"},[t._v(t._s(t.$t(t.payment.package)))]),t._v(" "+t._s("standard"==t.payment.package||"extended"==t.payment.package?"License":"Requests")+" - $"+t._s(t.payment.amount)+" for "+t._s(t.payment.quantity)+" "+t._s("standard"==t.payment.package||"extended"==t.payment.package?"designs":"requests"))]),t._v(" "),"standard"==t.payment.package?o("p",[t._v(t._s(t.$t("jpg_only")))]):t._e(),t._v(" "),"extended"==t.payment.package?o("p",[t._v(t._s(t.$t("jpg_pdf_ai_eps")))]):t._e(),t._v(" "),"standard"==t.payment.package?o("p",[t._v(t._s(t.$t("for_print_advertising_design")))]):t._e(),t._v(" "),"extended"==t.payment.package?o("p",[t._v(t._s(t.$t("for_resale_items_or_reproduction")))]):t._e()]):"simulator"==t.payment.package?o("div",[o("p",[t._v("PRODUCT SIMULATOR - $"+t._s(t.payment.amount)+" for "+t._s(t.payment.quantity)+" products")]),t._v(" "),o("p",[t._v("Add your own products into the simulator")])]):o("div",[o("p",[t._v("Exclusive Designs - $"+t._s(t.payment.amount)+" for "+t._s(t.payment.quantity)+" designs")]),t._v(" "),o("p",[t._v("JPG, PDF, AI, EPS")]),t._v(" "),o("p",[t._v("Ownership Certificate")]),t._v(" "),o("p",[t._v("Tailor-made on request")])]),t._v(" "),o("p",[t._v(t._s(t.$t("to_be_used_within")))])]),t._v(" "),o("div",{staticClass:"prop"},[t._v("Period")]),t._v(" "),o("div",{staticClass:"value"},[t._v("1 year : "+t._s(t.$moment(t.payment.created_at).format("DD/MM/YYYY"))+" - "+t._s(t.$moment(t.payment.created_at).add("years",1).format("DD/MM/YYYY")))]),t._v(" "),o("div",{staticClass:"prop"},[t._v("Contract Start Date")]),t._v(" "),o("div",{staticClass:"value"},[t._v(t._s(t.$moment(t.payment.created_at).format("DD/MM/YYYY")))]),t._v(" "),o("div",{staticClass:"prop"},[t._v("Total")]),t._v(" "),o("div",{staticClass:"value"},[t._v("US$ "+t._s(t.payment.amount))]),t._v(" "),o("div",{staticClass:"prop"},[t._v("IMPORTANT")]),t._v(" "),t._m(1),t._v(" "),o("br")])])}),n,!1,null,"6a5e891b",null);e.a=component.exports},636:function(t,e,o){var content=o(832);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(25).default)("2207091e",content,!0,{sourceMap:!1})},637:function(t,e,o){var content=o(834);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(25).default)("62553570",content,!0,{sourceMap:!1})},831:function(t,e,o){"use strict";o(636)},832:function(t,e,o){(e=o(24)(!1)).push([t.i,'.modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-header-confirm{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button,.modal-content .white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button{color:#fff;background-color:#363636}#cms-users-list th{font-size:13px}#cms-users-list td{font-size:12px}.cmscomponent.list .actions-container{display:flex;justify-content:space-between;align-items:middle;background:#ddd;padding:10px;border-radius:5px}.cmscomponent.list .actions-container .form-control{height:38px}.cmscomponent.list .actions-container .pagination{margin:0}.cmscomponent.list .filters button.active:after{content:"(X)";padding-left:5px}',""]),t.exports=e},833:function(t,e,o){"use strict";o(637)},834:function(t,e,o){(e=o(24)(!1)).push([t.i,".modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-header-confirm{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button,.modal-content .white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button{color:#fff;background-color:#363636}.cmscomponent.item.user .general .info-row{display:flex;padding:10px 0;margin-bottom:10px;border-bottom:1px dashed #ccc;font-size:14px}.cmscomponent.item.user .general .info-row .prop{width:200px;font-weight:600}.cmscomponent.item.user .quota .input-row{display:flex;padding:10px 0;margin-bottom:10px;border-bottom:1px dashed #ccc;align-items:center}.cmscomponent.item.user .quota .input-row .prop{width:200px;font-weight:600}.cmscomponent.item.user .payments-container .title{font-size:25px;font-weight:700;color:#363636}.cmscomponent.item.user .payments-container .capitalize{text-transform:capitalize}.cmscomponent.item.user .payments-container button{font-size:14px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 20px;background-color:#fff;font-weight:700}@media print{.cmscomponent.item.user .card-header-tabs{display:none}.cmspage .contentframe .itemframe{border-left:none!important}.cmscomponent.item.user *{border:none!important}.cmspage .contentframe .itemframe{width:100%!important}}",""]),t.exports=e}}]);