(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{512:function(t,e,n){var content=n(631);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(30).default)("a3ef590e",content,!0,{sourceMap:!1})},630:function(t,e,n){"use strict";n(512)},631:function(t,e,n){(e=n(29)(!1)).push([t.i,'.modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:120px;padding-bottom:50px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;color:#363636;background-color:#fff}.modal-dialog .confirm-box-footer-confirm .btn-primary,.modal-dialog .confirm-box-footer-confirm .btn-secondary{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;font-weight:700;margin-right:-163px}.modal-dialog .confirm-box-footer-confirm .btn-primary{color:#fff;background-color:#363636}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content .modal-header{margin-left:-1px;margin-top:-1px;background-color:#363636;color:#fff}.white-button{background-color:#363636;color:#363636;background-color:#fff}.black-button,.white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.black-button{color:#fff;background-color:#363636}#cms-coupons-list th{font-size:13px}#cms-coupons-list td{font-size:12px}.cmscomponent.list .actions-container{display:flex;justify-content:space-between;align-items:middle;background:#ddd;padding:10px;border-radius:5px}.cmscomponent.list .actions-container .pagination{margin:0}.cmscomponent.list .actions-container .filters button.active:after{content:"(X)";padding-left:5px}',""]),t.exports=e},719:function(t,e,n){"use strict";n.r(e);n(130);var o={data:function(){return{items:[],perPage:20,currentPage:1,total:0,fields:[{key:"id",label:"ID"},{key:"code",label:"Code"},{key:"package",label:"Package"},{key:"quantity",label:"Quantity"},{key:"user_id",label:"User"}],loading:!1,searchTerm:{tmp:"",value:""}}},methods:{load:function(t){var e=this;this.loading=!0,this.$axios.$get("/cms/coupons?page=".concat(t).concat(this.searchTerm.value?"&term="+this.searchTerm.value:"")).then((function(t){e.items=t.data,e.total=t.total,e.loading=!1,document.querySelector(".menuframe").scrollTop=0}))},search:function(t){this.searchTerm.value==t?this.resetSearch():(this.searchTerm.value=t,this.currentPage=1,this.load(this.currentPage))},resetSearch:function(){this.searchTerm.value="",this.search()},select:function(t,e,n){this.$router.push("/cms/coupons?id=".concat(t.id))},refresh:function(){this.load(this.currentPage)}},mounted:function(){var t=this;this.$nextTick((function(){t.load(t.currentPage)}))}},r=(n(630),n(21)),c={props:["itemId"],data:function(){return{item:null,loading:!1,packages:[{value:"standard",text:"Standard"},{value:"extended",text:"Extended"},{value:"simulator",text:"Simulator"},{value:"exclusive",text:"Exclusive"}]}},methods:{load:function(){var t=this;this.$axios.$get("/cms/coupons/".concat(this.itemId)).then((function(e){t.item=e}))},cancel:function(){this.$emit("updated",{clearItemFrame:!0})},update:function(t){var e=this;this.loading=!0,this.$axios.$patch("/cms/coupons/".concat(this.itemId),{code:t.target.elements.code.value,pkg:t.target.elements.package.value,quantity:t.target.elements.quantity.value}).then((function(t){e.loading=!1,e.$toast.success("Coupon updated successfully"),e.$emit("updated",{refresh:!0})})).catch((function(t){e.loading=!1,e.$toast.error(t.response.data.error.message)}))},deleteItem:function(){var t=this;this.$bvModal.msgBoxConfirm("Are you sure?",{centered:!0,bodyClass:"confirm-box-body",footerClass:"confirm-box-footer"}).then((function(e){if(e){var n=t.itemId;t.$axios.$delete("/cms/coupons/".concat(n)).then((function(e){t.$toast.success("Coupon deleted successfully"),t.cancel()})).catch((function(e){t.$toast.error(e.response.data.error.message)}))}}))}},watch:{itemId:function(){this.item=null,this.load()}},mounted:function(){var t=this;this.$nextTick((function(){t.load()}))}},l={middleware:"cmsuser",layout:"cms",components:{CouponList:Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cmscomponent list"},[n("div",{staticClass:"actions-container"},[n("div",[n("b-button-group",{staticClass:"filters",attrs:{size:"sm"}},[n("b-button",{class:{active:"standard"==t.searchTerm.value},attrs:{variant:"outline-primary",disabled:t.loading},on:{click:function(e){return t.search("standard")}}},[t._v("Standard")]),t._v(" "),n("b-button",{class:{active:"extended"==t.searchTerm.value},attrs:{variant:"outline-success",disabled:t.loading},on:{click:function(e){return t.search("extended")}}},[t._v("Extended")]),t._v(" "),n("b-button",{class:{active:"simulator"==t.searchTerm.value},attrs:{variant:"outline-info",disabled:t.loading},on:{click:function(e){return t.search("simulator")}}},[t._v("Simulator")]),t._v(" "),n("b-button",{class:{active:"exclusive"==t.searchTerm.value},attrs:{variant:"outline-danger",disabled:t.loading},on:{click:function(e){return t.search("exclusive")}}},[t._v("Exclusive")])],1)],1),t._v(" "),n("div",[n("b-pagination",{attrs:{"total-rows":t.total,"per-page":t.perPage,"aria-controls":"cms-coupons-list"},on:{change:t.load},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)]),t._v(" "),n("div",{staticClass:"additional-actions"},[n("div",[t._v(" ")]),t._v(" "),n("div",{staticClass:"total-count"},[t._v("\n      Total: "),n("strong",[t._v(t._s(t.total))])])]),t._v(" "),n("b-table",{attrs:{id:"cms-coupons-list",items:t.items,fields:t.fields,busy:t.loading,"select-mode":"single","sticky-header":"",small:"",selectable:"",striped:""},on:{"row-clicked":t.select},scopedSlots:t._u([{key:"cell(package)",fn:function(data){return["standard"==data.item.package?n("b-badge",{attrs:{variant:"primary"}},[t._v(t._s(data.item.package))]):t._e(),t._v(" "),"extended"==data.item.package?n("b-badge",{attrs:{variant:"success"}},[t._v(t._s(data.item.package))]):t._e(),t._v(" "),"simulator"==data.item.package?n("b-badge",{attrs:{variant:"info"}},[t._v(t._s(data.item.package))]):t._e(),t._v(" "),"exclusive"==data.item.package?n("b-badge",{attrs:{variant:"danger"}},[t._v(t._s(data.item.package))]):t._e()]}},{key:"cell(user_id)",fn:function(data){return[n("nuxt-link",{attrs:{to:"/cms/users?id="+data.item.user_id}},[t._v(t._s(data.item.user_id))])]}}])})],1)}),[],!1,null,null,null).exports,CouponItem:Object(r.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cmscomponent item coupon"},[t.item?t._e():n("div",{staticStyle:{"text-align":"center"}},[n("b-spinner",{attrs:{type:"grow",label:"Loading..."}})],1),t._v(" "),t.item?n("div",[n("div",{staticClass:"title"},[n("span",[n("i",{staticClass:"far fa-edit"}),t._v("  ID: "+t._s(t.item.id))]),t._v(" "),n("div",[n("b-button",{attrs:{variant:"outline-danger",size:"sm",disabled:t.item.user_id},on:{click:t.deleteItem}},[n("i",{staticClass:"fas fa-trash"}),t._v("  Delete")]),t._v(" "),n("b-button",{attrs:{variant:"outline-secondary",size:"sm"},on:{click:t.cancel}},[t._v("Cancel")])],1)]),t._v(" "),n("hr"),t._v(" "),n("form",{on:{submit:function(e){return e.preventDefault(),t.update(e)}}},[n("div",{staticClass:"item-content"},[n("div",{staticClass:"item-row"},[n("div",{staticClass:"prop"},[t._v("Code")]),t._v(" "),n("div",{staticClass:"value"},[n("b-input",{attrs:{type:"text",name:"code",value:t.item.code,disabled:t.item.user_id,required:""}})],1)]),t._v(" "),n("div",{staticClass:"item-row"},[n("div",{staticClass:"prop"},[t._v("Package")]),t._v(" "),n("div",{staticClass:"value"},[n("b-form-select",{attrs:{options:t.packages,name:"package",disabled:t.item.user_id,required:""},model:{value:t.item.package,callback:function(e){t.$set(t.item,"package",e)},expression:"item.package"}})],1)]),t._v(" "),n("div",{staticClass:"item-row"},[n("div",{staticClass:"prop"},[t._v("Quantity")]),t._v(" "),n("div",{staticClass:"value"},[n("b-input",{attrs:{type:"text",name:"quantity",value:t.item.quantity,disabled:t.item.user_id,required:""}})],1)])]),t._v(" "),n("div",{staticClass:"item-actions"},[n("div",{staticStyle:{"text-align":"center"}},[t.item.user_id?n("b-alert",{attrs:{show:"",variant:"danger"}},[t._v("Used coupons cannot be updated or deleted")]):t._e()],1),t._v(" "),n("b-button",{attrs:{variant:"primary",type:"submit",disabled:t.loading||t.item.user_id}},[n("i",{staticClass:"far fa-edit"}),t._v("  Update")])],1)])]):t._e()])}),[],!1,null,"736f98e2",null).exports},data:function(){return{itemId:null,loading:!1}},methods:{updated:function(t){var e=t.refresh,n=t.clearItemFrame;!0===e&&this.$refs.list.refresh(),!0===n&&(this.itemId=null,this.$router.push("/cms/coupons"),this.$refs.list.refresh())},onRouteUpdate:function(){this.itemId=this.$route.query.id},create:function(t){var e=this;this.loading=!0,this.$axios.$post("/cms/coupons",{pkg:t}).then((function(t){e.loading=!1,e.$toast.success("Coupons created successfully"),e.updated({refresh:!0})})).catch((function(t){e.loading=!1,e.$toast.error(t.response.data.error.message)}))}},watch:{$route:function(){this.onRouteUpdate()}},mounted:function(){var t=this;this.$nextTick((function(){t.onRouteUpdate()}))}},d=Object(r.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cmspage coupons"},[n("div",{staticClass:"contentframe"},[n("div",{staticClass:"menuframe"},[n("div",{staticClass:"title"},[t._m(0),t._v(" "),n("b-button-group",{attrs:{size:"sm"}},[n("b-button",{attrs:{variant:"outline-primary",disabled:t.loading},on:{click:function(e){return t.create("standard")}}},[t._v("+10 Standard")]),t._v(" "),n("b-button",{attrs:{variant:"outline-success",disabled:t.loading},on:{click:function(e){return t.create("extended")}}},[t._v("+10 Extended")]),t._v(" "),n("b-button",{attrs:{variant:"outline-info",disabled:t.loading},on:{click:function(e){return t.create("simulator")}}},[t._v("+10 Simulator")]),t._v(" "),n("b-button",{attrs:{variant:"outline-danger",disabled:t.loading},on:{click:function(e){return t.create("exclusive")}}},[t._v("+10 Exclusive")])],1)],1),t._v(" "),n("hr"),t._v(" "),n("CouponList",{ref:"list"})],1),t._v(" "),n("div",{staticClass:"itemframe"},[t.itemId?n("CouponItem",{attrs:{itemId:t.itemId},on:{updated:t.updated}}):t._e()],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("i",{staticClass:"fas fa-hand-holding-usd"}),this._v("  Coupons")])}],!1,null,"11c80f29",null);e.default=d.exports}}]);